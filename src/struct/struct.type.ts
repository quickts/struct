/**
 * 规则一：结构体中元素按照定义顺序依次置于内存中，但并不是紧密排列。
 * 从结构体首地址开始依次将元素放入内存时，元素会被放置在其自身对齐大小的整数倍地址上。
 * 这里说的地址是元素在结构体中的偏移量，结构体首地址偏移量为0。
 */
/**
 * 规则二：如果结构体大小不是所有元素中最大对齐大小的整数倍，
 * 则结构体对齐到最大元素对齐大小的整数倍，填充空间放置到结构体末尾。
 */
/**
 * 规则三：基本数据类型的对齐大小为其自身的大小，
 * 结构体数据类型的对齐大小为其元素中最大对齐大小元素的对齐大小。
 */
import { TypeBase } from "../base/type.base";
import { CHAR } from "../types";

export class TypeStruct extends TypeBase {
    private fields: { name: string; type: TypeBase; count: number; isArray: boolean; encoding?: BufferEncoding }[] = [];
    private hasZeroArray: boolean = false;
    private structSize: number = 0;
    private alignSize: number = 1;
    private name: string;
    constructor(name: string, fieldDesArray: [TypeBase, string, number?, string?][]) {
        super();
        this.name = name;
        for (const [type, name, count, encoding] of fieldDesArray) {
            if (this.hasZeroArray) {
                throw Error("Zero Array must be placed last!");
            }

            if (type instanceof TypeStruct && type.hasZeroArray) {
                this.hasZeroArray = true;
            }

            if (count === 0) {
                this.hasZeroArray = true;
                const preFiled = this.fields[this.fields.length - 1];
                if (!preFiled || !preFiled.type.isBaseType()) {
                    throw Error("Must have a size des field before zero array");
                }
            }
            const field = {
                name: name,
                type: type,
                count: count == undefined ? 1 : count,
                isArray: count != undefined,
                encoding: encoding
            };

            this.fields.push(field);

            const alignSize = type.getAlignSize();
            // 规则三计算
            if (alignSize > this.alignSize) {
                this.alignSize = alignSize;
            }

            // 规则一计算
            // 对齐
            const leftNum = this.structSize % alignSize;
            if (leftNum !== 0) {
                this.structSize = this.structSize + alignSize - leftNum;
            }
            const size = type.getTypeSize();
            this.structSize += size * field.count;
        }

        // 规则二计算
        const leftNum = this.structSize % this.alignSize;
        if (leftNum != 0) {
            this.structSize = this.structSize + this.alignSize - leftNum;
        }

        // 空结构体大小为一
        if (this.structSize === 0) {
            this.structSize = 1;
        }
    }
    getTypeName() {
        return this.name;
    }
    getDes() {
        const desArray: (number | string)[] = [];
        desArray.push("struct ", this.name, " {\n");
        for (let index = 0; index < this.fields.length; ++index) {
            const field = this.fields[index];
            if (field.type.isBaseType()) {
                desArray.push("  ");
            } else {
                desArray.push("  struct ");
            }
            desArray.push(field.type.getTypeName(), " ", field.name);
            if (field.isArray) {
                desArray.push("[", field.count, "]");
            }
            desArray.push(";\n");
        }
        desArray.push("};");
        return desArray.join("");
    }

    isBaseType() {
        return false;
    }

    getRealSize(data: { [key: string]: any }) {
        if (this.hasZeroArray) {
            let zeroArrayField = this.fields[this.fields.length - 1];
            let lenField = this.fields[this.fields.length - 2];
            let arrayData = data;
            while (zeroArrayField.count !== 0) {
                const temp: TypeStruct = zeroArrayField.type as any;
                zeroArrayField = temp.fields[temp.fields.length - 1];
                lenField = temp.fields[temp.fields.length - 2];
                arrayData = arrayData[zeroArrayField.name];
            }
            let realSize = this.structSize; // 基本大小
            let len = arrayData[lenField.name];
            let size = zeroArrayField.type.getTypeSize();
            realSize += len * size; // 动态大小
            return realSize;
        }
        return this.structSize;
    }

    getTypeSize() {
        return this.structSize;
    }

    getAlignSize() {
        return this.alignSize;
    }

    serialize(data: { [key: string]: any }) {
        const size = this.getRealSize(data);
        const buf = Buffer.allocUnsafe(size);
        this.encode(buf, 0, data);
        return buf;
    }

    unserialize(buf: Buffer) {
        return this.decode(buf, 0);
    }

    decode(buf: Buffer, offset: number) {
        const obj: { [key: string]: any } = {};
        for (let index = 0; index < this.fields.length; ++index) {
            const field = this.fields[index];
            const alignSize = field.type.getAlignSize();
            // 对齐
            const leftNum = offset % alignSize;
            if (leftNum !== 0) {
                offset = offset + alignSize - leftNum;
            }
            // 数组
            if (field.isArray) {
                const len = field.count === 0 ? obj[this.fields[index - 1].name] : field.count;

                if (field.type === CHAR) {
                    // string
                    const endPos = offset + len;
                    const zeroPos = buf.indexOf(0, offset);
                    obj[field.name] = buf.toString(field.encoding, offset, zeroPos >= 0 && zeroPos < endPos ? zeroPos : endPos);
                    offset = endPos;
                } else {
                    // 普通数组
                    const arr: any[] = [];
                    for (let i = 0; i < len; i++) {
                        arr.push(field.type.decode(buf, offset));
                        offset = offset + field.type.getTypeSize();
                    }
                    obj[field.name] = arr;
                }
            } else {
                obj[field.name] = field.type.decode(buf, offset);
                offset = offset + field.type.getTypeSize();
            }
        }
        return obj;
    }

    encode(buf: Buffer, offset: number, obj: any): void {
        for (let index = 0; index < this.fields.length; ++index) {
            const field = this.fields[index];
            const alignSize = field.type.getAlignSize();
            // 对齐
            const leftNum = offset % alignSize;
            if (leftNum !== 0) {
                offset = offset + alignSize - leftNum;
            }

            const value: any = obj[field.name];
            // 数组
            if (field.isArray) {
                let len: number = value.length;
                if (len > field.count) {
                    len = field.count;
                }
                if (field.count === 0) {
                    const preField = this.fields[index - 1];
                    len = obj[preField.name];
                }
                if (field.type === CHAR) {
                    buf.write(value, offset, len, field.encoding);
                    buf.fill(0, offset + len, offset + field.count); // 后续数据归0
                    offset = offset + field.count;
                } else {
                    // 普通数组
                    const sz = field.type.getTypeSize();
                    for (let i = 0; i < len; i++) {
                        field.type.encode(buf, offset + i * sz, value[i]);
                    }
                    buf.fill(0, offset + len * sz, offset + field.count * sz); // 后续数据归0
                    offset = offset + sz * field.count;
                }
            } else {
                field.type.encode(buf, offset, value);
                offset = offset + field.type.getTypeSize();
            }
        }
    }
}

import { setInt64, getInt64, setUint64, getUint64 } from "@chengaoyuan/int64";
/**
 *  是否是小端
 * */
const littleEndian: boolean = true;
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

interface IType {
    /**
     * 获得类型大小,相当于sizeof
     */
    getTypeSize(): number;
    /**
     * 获得对齐大小
     */
    getAlignSize(): number;
    /**
     * 反序列化
     * @param dataView 存放数据的缓冲区
     * @param offset 偏移多少位置进行读取
     * @return 返回解析得到的值
     */
    decode(dataView: DataView, offset: number): any;
    /**
     * 序列化
     * @param dataView 存放数据的缓冲区
     * @param offset 偏移多少位置进行写入
     * @param value 需要写入的值
     */
    encode(dataView: DataView, offset: number, value: any): void;
}

class TYPE_UINT8 implements IType {
    getTypeSize() {
        return 1;
    }
    getAlignSize() {
        return 1;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getUint8(offset);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setUint8(offset, value);
    }
}

class TYPE_UINT16 implements IType {
    getTypeSize() {
        return 2;
    }
    getAlignSize() {
        return 2;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getUint16(offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setUint16(offset, value, littleEndian);
    }
}

class TYPE_UINT32 implements IType {
    getTypeSize() {
        return 4;
    }
    getAlignSize() {
        return 4;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getUint32(offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setUint32(offset, value, littleEndian);
    }
}

class TYPE_UINT64 implements IType {
    getTypeSize() {
        return 8;
    }
    getAlignSize() {
        return 8;
    }
    decode(dataView: DataView, offset: number) {
        return getUint64(dataView, offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        setUint64(dataView, offset, value, littleEndian);
    }
}

class TYPE_INT8 implements IType {
    getTypeSize() {
        return 1;
    }
    getAlignSize() {
        return 1;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getInt8(offset);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setInt8(offset, value);
    }
}

class TYPE_INT16 implements IType {
    getTypeSize() {
        return 2;
    }
    getAlignSize() {
        return 2;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getInt16(offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setInt16(offset, value, littleEndian);
    }
}

class TYPE_INT32 implements IType {
    getTypeSize() {
        return 4;
    }
    getAlignSize() {
        return 4;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getInt32(offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setInt32(offset, value, littleEndian);
    }
}

class TYPE_INT64 implements IType {
    getTypeSize() {
        return 8;
    }
    getAlignSize() {
        return 8;
    }

    decode(dataView: DataView, offset: number) {
        return getInt64(dataView, offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        setInt64(dataView, offset, value, littleEndian);
    }
}

class TYPE_FLOAT implements IType {
    getTypeSize() {
        return 4;
    }
    getAlignSize() {
        return 4;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getFloat32(offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setFloat32(offset, value, littleEndian);
    }
}

class TYPE_DOUBLE implements IType {
    getTypeSize() {
        return 8;
    }
    getAlignSize() {
        return 8;
    }
    decode(dataView: DataView, offset: number) {
        return dataView.getFloat64(offset, littleEndian);
    }
    encode(dataView: DataView, offset: number, value: any) {
        dataView.setFloat64(offset, value, littleEndian);
    }
}

export const BaseTypes = {
    BYTE: new TYPE_UINT8(), //一字节无符号的整型数据
    WORD: new TYPE_UINT16(), //二字节无符号的整型数据
    DWORD: new TYPE_UINT32(), //四字节无符号的整型数据
    CHAR: new TYPE_INT8(), //一字节有符号的整型数据 特殊用法: 当CHAR使用在数组中时, 其代表为字符串
    INT8: new TYPE_INT8(), //一字节有符号的整型数据
    INT16: new TYPE_INT16(), //二字节有符号的整型数据
    INT32: new TYPE_INT32(), //四字节有符号的整型数据
    INT64: new TYPE_INT64(), // 八字节有符号整数数据, 有效位只有53位
    UINT8: new TYPE_UINT8(), //一字节无符号的整型数据
    UINT16: new TYPE_UINT16(), //二字节无符号的整型数据
    UINT32: new TYPE_UINT32(), //四字节无符号的整型数据
    UINT64: new TYPE_UINT64(), // 八字节无符号整数数据, 有效位只有53位
    FLOAT: new TYPE_FLOAT(), //四字节浮点数
    DOUBLE: new TYPE_DOUBLE() //八字节浮点数
};

function isBaseType(iType: IType) {
    for (let index in BaseTypes) {
        if ((BaseTypes as any)[index] === iType) {
            return true;
        }
    }
    return false;
}

class Field {
    type: IType;
    name: string;
    count: number;
    isArray: boolean;
    isZeroArray: boolean;
    constructor(name: string, type: IType, count?: number) {
        this.name = name;
        this.type = type;
        if (count !== undefined) {
            this.count = count;
            this.isArray = true;
            this.isZeroArray = count === 0;
        } else {
            this.count = 1;
            this.isArray = false;
            this.isZeroArray = false;
        }
    }
}

export type BaseTypeName =
    | "BYTE"
    | "WORD"
    | "DWORD"
    | "CHAR"
    | "INT8"
    | "INT16"
    | "INT32"
    | "INT64"
    | "UINT8"
    | "UINT16"
    | "UINT32"
    | "UINT64"
    | "FLOAT"
    | "DOUBLE";

export type FiledType = BaseTypeName | IType;
export type FieldArrayType = [FiledType, string, number?][];

export default class Struct implements IType {
    private fields: Field[] = [];
    private hasZeroArray: boolean = false;
    private structSize: number | undefined = undefined;
    private alignSize: number | undefined = undefined;

    constructor(fieldDesArray?: FieldArrayType) {
        if (fieldDesArray) {
            fieldDesArray.forEach(fieldDes => {
                this.addField(fieldDes[0], fieldDes[1], fieldDes[2]);
            });
        }
    }

    addField(type: IType | BaseTypeName, name: string, count?: number) {
        if (this.hasZeroArray) {
            throw Error("Zero Array must be placed last!");
        }

        const filedType = typeof type === "string" ? BaseTypes[type] : type;

        if (filedType instanceof Struct && filedType.hasZeroArray) {
            this.hasZeroArray = true;
        }

        const filed = new Field(name, filedType, count);
        if (filed.isZeroArray) {
            this.hasZeroArray = true;
            const preFiled = this.fields[this.fields.length - 1];
            if (!preFiled || !isBaseType(preFiled.type)) {
                throw Error("Must have a size des field before zero array");
            }
        }

        this.fields.push(filed);
        return this;
    }

    serialize(data: { [key: string]: any }) {
        const size = this.getRealSize(data);
        const buf = new ArrayBuffer(size);
        const bufView = new DataView(buf);
        this.encode(bufView, 0, data);
        return buf;
    }

    unserialize(buf: ArrayBuffer) {
        const bufView = new DataView(buf);
        return this.decode(bufView, 0);
    }

    getRealSize(data: { [key: string]: any }) {
        if (this.hasZeroArray) {
            let zeroArrayField = this.fields[this.fields.length - 1];
            let lenField = this.fields[this.fields.length - 2];
            let arrayData = data;
            while (!zeroArrayField.isZeroArray) {
                const temp = zeroArrayField.type as Struct;
                zeroArrayField = temp.fields[temp.fields.length - 1];
                lenField = temp.fields[temp.fields.length - 2];
                arrayData = arrayData[zeroArrayField.name];
            }
            let realSize = this.getTypeSize();
            let len = arrayData[lenField.name];
            let size = zeroArrayField.type.getTypeSize();
            realSize += len * size;
            return realSize;
        }
        return this.getTypeSize();
    }

    getTypeSize() {
        if (this.structSize !== undefined) {
            return this.structSize;
        }
        let structSize = 0;
        let maxAlignSize = 1;
        // 规则一计算
        this.fields.forEach(field => {
            const type = field.type;

            const alignSize = type.getAlignSize();
            if (alignSize > maxAlignSize) {
                maxAlignSize = alignSize;
            }
            // 对齐
            const leftNum = structSize % alignSize;
            if (leftNum !== 0) {
                structSize = structSize + alignSize - leftNum;
            }
            const count = field.count;
            const size = type.getTypeSize();
            structSize += size * count;
        });

        // 规则二计算
        const leftNum = structSize % maxAlignSize;
        if (leftNum != 0) {
            structSize = structSize + maxAlignSize - leftNum;
        }

        if (structSize === 0) {
            structSize = 1;
        }

        this.structSize = structSize;

        return structSize;
    }

    getAlignSize() {
        if (this.alignSize !== undefined) {
            return this.alignSize;
        }
        // 规则三计算
        let maxAlignSize = 1;
        this.fields.forEach(field => {
            const type = field.type;
            const alignSize = type.getAlignSize();
            if (alignSize > maxAlignSize) {
                maxAlignSize = alignSize;
            }
        });

        this.alignSize = maxAlignSize;
        return maxAlignSize;
    }

    decode(dataView: DataView, offset: number) {
        const obj: { [key: string]: any } = {};

        this.fields.forEach((field: Field, index: number) => {
            const type = field.type;
            const alignSize = type.getAlignSize();
            // 对齐
            const leftNum = offset % alignSize;
            if (leftNum !== 0) {
                offset = offset + alignSize - leftNum;
            }
            const name = field.name;
            // 数组
            if (field.isArray) {
                const len = field.isZeroArray ? obj[this.fields[index - 1].name] : field.count;
                if (type === BaseTypes.CHAR) {
                    // string
                    let pos = 0;
                    const codeArr: number[] = [];
                    for (; pos < len; pos++) {
                        const code = dataView.getUint8(offset + pos);
                        if (code) {
                            codeArr.push(code);
                        } else {
                            break;
                        }
                    }
                    // const buf = dataView.buffer.slice(offset, offset + len);
                    // const bufView = new Uint8Array(buf);
                    obj[name] = String.fromCharCode.apply(null, codeArr);
                    offset = offset + len;
                } else {
                    // 普通数组
                    const arr: any[] = [];
                    for (let i = 0; i < len; i++) {
                        arr.push(type.decode(dataView, offset));
                        offset = offset + type.getTypeSize();
                    }
                    obj[name] = arr;
                }
            } else {
                obj[name] = type.decode(dataView, offset);
                offset = offset + type.getTypeSize();
            }
        });

        return obj;
    }
    encode(dataView: DataView, offset: number, obj: any): void {
        this.fields.forEach((field, index) => {
            const type = field.type;
            const alignSize = type.getAlignSize();
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
                if (field.isZeroArray) {
                    const preField = this.fields[index - 1];
                    len = obj[preField.name];
                }
                if (type === BaseTypes.CHAR) {
                    for (let i = 0; i < len; i++) {
                        const ch = value.charCodeAt(i);
                        dataView.setUint8(offset + i, ch);
                    }
                    // 后续数据归0
                    for (let i = len; i < field.count; i++) {
                        dataView.setUint8(offset + i, 0);
                    }
                    offset = offset + field.count;
                } else {
                    // 普通数组
                    const sz = type.getTypeSize();
                    for (let i = 0; i < len; i++) {
                        type.encode(dataView, offset + i * sz, value[i]);
                    }
                    // 后续数据归0
                    for (let i = len * sz, end = field.count * sz; i < end; i++) {
                        dataView.setUint8(offset + i, 0);
                    }
                    offset = offset + sz * field.count;
                }
            } else {
                type.encode(dataView, offset, value);
                offset = offset + type.getTypeSize();
            }
        });
    }
}

import { TypeBase } from "../base/type.base";

export class TypeUInt16 extends TypeBase {
    getTypeName() {
        return "uint16";
    }
    isBaseType() {
        return true;
    }
    getTypeSize() {
        return 2;
    }
    getAlignSize() {
        return 2;
    }
    decode(buf: Buffer, offset: number) {
        return buf.readUInt16LE(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeUInt16LE(value, offset);
    }
}

export const UINT16 = new TypeUInt16();
export const WORD = UINT16;

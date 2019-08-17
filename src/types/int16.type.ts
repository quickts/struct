import { TypeBase } from "../base/type.base";

export class TypeInt16 extends TypeBase {
    getTypeName() {
        return "16";
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
        return buf.readInt16LE(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeInt16LE(value, offset);
    }
}

export const INT16 = new TypeInt16();

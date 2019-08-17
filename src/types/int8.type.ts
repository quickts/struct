import { TypeBase } from "../base/type.base";

export class TypeInt8 extends TypeBase {
    getTypeName() {
        return "int8";
    }
    isBaseType() {
        return true;
    }
    getTypeSize() {
        return 1;
    }
    getAlignSize() {
        return 1;
    }
    decode(buf: Buffer, offset: number) {
        return buf.readInt8(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeInt8(value, offset);
    }
}

export const INT8 = new TypeInt8();

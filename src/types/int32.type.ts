import { TypeBase } from "../base/type.base";

export class TypeInt32 extends TypeBase {
    getTypeName() {
        return "int32";
    }
    isBaseType() {
        return true;
    }
    getTypeSize() {
        return 4;
    }
    getAlignSize() {
        return 4;
    }
    decode(buf: Buffer, offset: number) {
        return buf.readInt32LE(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeInt32LE(value, offset);
    }
}

export const INT32 = new TypeInt32();

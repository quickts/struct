import { TypeBase } from "../base/type.base";

export class TypeFloat extends TypeBase {
    getTypeName() {
        return "float";
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
        return buf.readFloatLE(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeFloatLE(value, offset);
    }
}

export const FLOAT = new TypeFloat();

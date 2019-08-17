import { TypeBase } from "../base/type.base";

export class TypeDouble extends TypeBase {
    getTypeName() {
        return "double";
    }
    isBaseType() {
        return true;
    }
    getTypeSize() {
        return 8;
    }
    getAlignSize() {
        return 8;
    }
    decode(buf: Buffer, offset: number) {
        return buf.readDoubleLE(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeDoubleLE(value, offset);
    }
}

export const DOUBLE = new TypeDouble();

import { TypeBase } from "../base/type.base";

export class TypeUInt8 extends TypeBase {
    getTypeName() {
        return "uint8";
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
        return buf.readUInt8(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeUInt8(value, offset);
    }
}

export const UINT8 = new TypeUInt8();
export const BYTE = UINT8;

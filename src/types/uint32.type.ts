import { TypeBase } from "../base/type.base";

export class TypeUInt32 extends TypeBase {
    getTypeName() {
        return "uint32";
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
        return buf.readUInt32LE(offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        buf.writeUInt32LE(value, offset);
    }
}

export const UINT32 = new TypeUInt32();
export const DWORD = UINT32;

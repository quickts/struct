import { TypeBase } from "../base/type.base";
const { readUInt64LE, writeUInt64LE } = require("int53");

export class TypeUInt64 extends TypeBase {
    getTypeName() {
        return "uint64";
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
        return readUInt64LE(buf, offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        writeUInt64LE(value, buf, offset);
    }
}

export const UINT64 = new TypeUInt64();

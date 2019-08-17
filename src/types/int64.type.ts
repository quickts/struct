import { TypeBase } from "../base/type.base";
const { readInt64LE, writeInt64LE } = require("int53");

export class TypeInt64 extends TypeBase {
    getTypeName() {
        return "64";
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
        return readInt64LE(buf, offset);
    }
    encode(buf: Buffer, offset: number, value: any) {
        writeInt64LE(value, buf, offset);
    }
}

export const INT64 = new TypeInt64();

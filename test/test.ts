import * as assert from "assert";
import { TypeStruct, INT8, INT16, INT32, INT64, UINT16, UINT32, UINT64, UINT8, CHAR, FLOAT, DOUBLE, WORD, DWORD } from "./../src";
function assertFloatEqual(actual: number, expected: number) {
    const delta = Math.abs(actual - expected);
    assert(
        delta < 0.00001,
        `
    delta ${delta}
    actual ${actual}
    expected ${expected}`
    );
}

describe("#index.ts", () => {
    describe("#Struct", () => {
        it("integer", () => {
            const struct = new TypeStruct("TestStruct", [
                [INT8, "int8"], //
                [INT16, "int16"],
                [INT32, "int32"],
                [INT64, "int64"],
                [UINT8, "uint8"],
                [UINT16, "uint16"],
                [UINT32, "uint32"],
                [UINT64, "uint64"]
            ]);
            const oldObj = {
                int8: -128,
                int16: 32767,
                int32: -112353233,
                int64: Number.MIN_SAFE_INTEGER,
                uint8: 255,
                uint16: 65535,
                uint32: 222222222,
                uint64: Number.MAX_SAFE_INTEGER
            };
            const ab = struct.serialize(oldObj);
            const newObj = struct.unserialize(ab);
            assert.deepEqual(newObj, oldObj);
        });

        it("float", () => {
            const struct = new TypeStruct("TestStruct", [
                [FLOAT, "float"], //
                [DOUBLE, "double"]
            ]);
            const oldObj = {
                float: 123.456,
                double: 1.23456789
            };
            const ab = struct.serialize(oldObj);
            const newObj = struct.unserialize(ab);

            assertFloatEqual(newObj.float, oldObj.float);
            assertFloatEqual(newObj.double, oldObj.double);
        });

        it("array", () => {
            const struct = new TypeStruct("TestStruct", [
                [INT8, "int8arr", 10], //
                [CHAR, "str", 10],
                [CHAR, "str2", 5]
            ]);
            const oldObj = {
                int8arr: [1, 2, 3, 4, 5, 6, 7],
                str: "abcdefg",
                str2: "abcdefg"
            };
            const ab = struct.serialize(oldObj);
            const newObj = struct.unserialize(ab);

            assert.deepEqual(newObj.int8arr, [1, 2, 3, 4, 5, 6, 7, 0, 0, 0]);
            assert.equal(newObj.str, oldObj.str);
            assert.equal(newObj.str2, "abcde");
        });

        it("zero array", () => {
            const struct = new TypeStruct("TestStruct", [
                [DWORD, "len"], //
                [UINT8, "data", 0]
            ]);

            const arr = [1, 2, 2, 2, 3, 3, 4, 2, 3, 34, 5, 42, 2, 21, 87, 4, 3, 2];
            const oldObj = {
                len: arr.length,
                data: arr
            };
            const ab = struct.serialize(oldObj);
            const newObj = struct.unserialize(ab);

            assert.deepEqual(newObj, oldObj);
        });
    });
});

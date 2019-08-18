import * as assert from "assert";
import {
    TypeStruct,
    INT8,
    INT16,
    INT32,
    INT64,
    UINT16,
    UINT32,
    UINT64,
    UINT8,
    CHAR,
    FLOAT,
    DOUBLE,
    WORD,
    DWORD,
    Struct,
    Field,
    getStruct
} from "./../src";
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

@Struct()
class TestStruct {
    @Field(INT8)
    int8: number;

    @Field(INT16)
    int16: number;

    @Field(INT32)
    int32: number;

    @Field(INT64)
    int64: number;
}
describe("#index.ts", () => {
    describe("#Struct", () => {
        it("integer2", () => {
            const struct = getStruct(TestStruct);
            const oldObj = {
                int8: -128,
                int16: 32767,
                int32: -112353233,
                int64: Number.MIN_SAFE_INTEGER
            };
            const ab = struct.serialize(oldObj);
            const newObj = struct.unserialize(ab);
            assert.deepEqual(newObj, oldObj);
        });
    });
});

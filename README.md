# struct

[![npm version](https://badge.fury.io/js/%40chengaoyuan%2Fstruct.svg)](https://badge.fury.io/js/%40chengaoyuan%2Fstruct)
[![install size](https://packagephobia.now.sh/badge?p=@chengaoyuan/struct)](https://packagephobia.now.sh/result?p=@chengaoyuan/struct)
[![NPM Downloads](https://img.shields.io/npm/dm/@chengaoyuan/struct.svg?style=flat)](https://npmcharts.com/compare/@chengaoyuan/struct?minimal=true)
[![Build Status](https://travis-ci.org/GithubCGY/struct.svg?branch=master)](https://travis-ci.org/GithubCGY/struct)
[![Coverage Status](https://coveralls.io/repos/github/GithubCGY/struct/badge.svg?branch=master)](https://coveralls.io/github/GithubCGY/struct?branch=master)

## Installation

    $ npm install @chengaoyuan/struct

## Usage

```ts
import * as assert from "assert";
import Struct from "@chengaoyuan/struct";
const struct = new Struct([
    ["DWORD", "len"],
    ["UINT8", "data", 0]
]);

const arr = [1, 2, 2, 2, 3, 3, 4, 2, 3, 34, 5, 42, 2, 21, 87, 4, 3, 2];
const oldObj = {
    len: arr.length,
    data: arr
};

{
    const ab = struct.serialize(oldObj);
    const newObj = struct.unserialize(ab);
    assert.deepEqual(newObj, oldObj);
}

{
    const size = struct.getRealSize(oldObj);
    const buf = new ArrayBuffer(size);
    const bufView = new DataView(buf);
    struct.encode(bufView, 0, data);
    const newObj = struct.decode(bufView, 0);
    assert.deepEqual(newObj, oldObj);
}
```

## Testing

    $ npm test

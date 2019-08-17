import "reflect-metadata";

import { TypeBase } from "../base/type.base";
import { TypeChar, INT8 } from "../types";
import { TypeStruct } from "./struct.type";
import { STRUCT_FIELD_METADATA, STRUCT_METADATA } from "./struct.constants";

export function Field(type: TypeBase, len?: number): (target: any, propertyKey: string) => void;
export function Field(type: TypeChar, len?: number, encoding?: string): (target: any, propertyKey: string) => void;
export function Field<TFunction extends Function>(type: TFunction, len?: number, encoding?: string): (target: any, propertyKey: string) => void;

export function Field(type: TypeBase | Function, len?: number, encoding?: string) {
    return (target: any, propertyKey: string) => {
        const structFieldMetadata: [TypeBase, string, number?, string?][] = Reflect.getMetadata(STRUCT_FIELD_METADATA, target) || [];
        if (type instanceof TypeBase) {
            structFieldMetadata.push([type, propertyKey, len, encoding]);
        } else {
            const structMetadata: TypeStruct = Reflect.getMetadata(STRUCT_METADATA, type);
            if (structMetadata) {
                structFieldMetadata.push([structMetadata, propertyKey, len, encoding]);
            } else {
                throw new Error(`'class ${type.name}' is not a struct! Please add '@Struct()' 'class ${type.name}'`);
            }
        }
        Reflect.defineMetadata(STRUCT_FIELD_METADATA, structFieldMetadata, target);
    };
}

export function Struct<TFunction extends Function>(print?: Function) {
    return (target: TFunction) => {
        const structFieldMetadata: [TypeBase, string, number?, string?][] = Reflect.getMetadata(STRUCT_FIELD_METADATA, target.prototype) || [];
        const structMetadata = new TypeStruct(target.name, structFieldMetadata);
        Reflect.defineMetadata(STRUCT_METADATA, structMetadata, target);
        if (print) {
            print(structMetadata.getDes());
        }
    };
}

export function isStruct<TFunction extends Function>(target: TFunction) {
    const structMetadata: TypeStruct = Reflect.getMetadata(STRUCT_METADATA, target);
    return !!structMetadata;
}

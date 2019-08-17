export abstract class TypeBase {
    /**
     * 类型名
     */
    abstract getTypeName(): string;
    /**
     * 是否为基本类型
     */
    abstract isBaseType(): boolean;
    /**
     * 获得类型大小,相当于sizeof
     */
    abstract getTypeSize(): number;
    /**
     * 获得对齐大小
     */
    abstract getAlignSize(): number;
    /**
     * 反序列化
     * @param dataView 存放数据的缓冲区
     * @param offset 偏移多少位置进行读取
     * @return 返回解析得到的值
     */
    abstract decode(buf: Buffer, offset: number): any;
    /**
     * 序列化
     * @param dataView 存放数据的缓冲区
     * @param offset 偏移多少位置进行写入
     * @param value 需要写入的值
     */
    abstract encode(buf: Buffer, offset: number, value: any): void;
}

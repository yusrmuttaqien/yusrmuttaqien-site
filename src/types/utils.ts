export type EnumFromObjectKeys<T extends object> = { [K in keyof T]: K };

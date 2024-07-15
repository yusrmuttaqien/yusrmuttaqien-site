export default function enumFromObjectKeys<T extends object>(obj: T): { [K in keyof T]: K } {
  const keys = Object.keys(obj) as Array<keyof T>;
  const enumObj = {} as { [K in keyof T]: K };

  keys.forEach((key) => {
    enumObj[key] = key;
  });

  return enumObj;
}

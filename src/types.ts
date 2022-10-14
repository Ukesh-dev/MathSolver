export type RegExpGroups<T extends string[]> =
  | (RegExpMatchArray & {
      groups?:
        | {
            [name in T[number]]: string;
          }
        | {
            [key: string]: string;
          };
    })
  | null;

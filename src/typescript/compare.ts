type SmallerThan<A extends number, B extends number, C extends any[] = []> = C['length'] extends B
  ? false
  : C['length'] extends A
  ? true
  : SmallerThan<A, B, [...C, any]>;

type TrueS1 = SmallerThan<0, 1>;
type TrueS2 = SmallerThan<1, 2>;
type FalseS1 = SmallerThan<2, 2>;
type FalseS2 = SmallerThan<3, 2>;

type LargerThan<A extends number, B extends number, C extends any[] = []> = C['length'] extends A
  ? false
  : C['length'] extends B
  ? true
  : LargerThan<A, B, [...C, any]>;

type TrueL1 = LargerThan<1, 0>;
type TrueL2 = LargerThan<3, 2>;
type FalseL1 = LargerThan<1, 2>;
type FalseL2 = LargerThan<2, 2>;

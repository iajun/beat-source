import { AnyFunc } from './types';

interface Compose {
  <
    F0 extends AnyFunc,
    F1 extends (...args: Parameters<F0>) => any,
    F2 extends (...args: Parameters<F1>) => any
  >(
    f0: F0,
    f1: F1,
    f2: F2
  ): void;
}

export const compose: Compose = (f0, ...fns) =>
  fns.reduce((a: any, b) => (...args: any[]) => b(a(...args)), f0);

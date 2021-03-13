export type AnyAction = { type: string };
export type AnyFunc = (...args: any[]) => any;
export type Reducer<S, A extends AnyAction> = (state: S, action: A) => S;
export type Dispatch<A extends AnyAction> = (action: A) => void;

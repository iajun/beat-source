import { AnyAction, AnyFunc, Reducer } from './types';

function createStore<S, A extends AnyAction>(reducer: Reducer<S, A>) {
  let state: S;
  let listeners: AnyFunc[] = [];

  const callEffects = () => listeners.forEach((l) => l());

  const getState = () => state;

  const dispatch = (action: A) => {
    state = reducer(state, action);
    callEffects();
  };

  const subscribe = <F extends AnyFunc>(fn: F) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  };

  dispatch({
    type: 'init',
  } as any);

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export interface CreateStore<S, A extends AnyAction> {
  (reducer: Reducer<S, A>): {
    getState: () => S;
    dispatch: (action: A) => void;
    subscribe: <F extends AnyFunc>(fn: F) => () => void;
  };
}

export default createStore;

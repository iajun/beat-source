import { AnyAction, Dispatch } from './types';
import { CreateStore } from './redux';
import { compose } from './compose';

export type Middleware<S, A extends AnyAction> = (
  args: Pick<ReturnType<CreateStore<S, A>>, 'getState' | 'dispatch'>
) => (next: Dispatch<A>) => (action: A) => void;

function applyMiddleware<S, A extends AnyAction>(...middlewares: Middleware<S, A>[]) {
  return (createStore: CreateStore<S, A>) => (...args: Parameters<CreateStore<S, A>>) => {
    let store = createStore(...args);
    let dispatch: typeof store.dispatch;
    let middlewareArgs = {
      getState: store.getState,
      dispatch: (action: A) => dispatch(action),
    };
    let chained = middlewares.map((fn) => fn(middlewareArgs));
    dispatch = (compose as any)(...chained)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

export default applyMiddleware;

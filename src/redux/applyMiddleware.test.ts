import { Dispatch } from './types';
import applyMiddleware, { Middleware } from './applyMiddleware';
import createStore from './redux';

const initialState = { count: 0 };

type State = typeof initialState;
type Action = {
  type: 'add';
};
const reducer = (state: State = initialState, action: Action) => {
  return action.type === 'add'
    ? {
        count: state.count + 1,
      }
    : state;
};

const m1: Middleware<State, Action> = jest.fn(({ dispatch }) => (next) => (action) => {
  if (typeof action === 'function') {
    (action as any)(dispatch);
  } else {
    next(action);
  }
});

const m2: Middleware<State, Action> = jest.fn(({ dispatch }) => (next) => (action) => {
  console.log('before: ', action.type, store.getState());
  next(action);
  console.log('after: ', action.type, store.getState());
});

let store = applyMiddleware(m1, m2)(createStore)(reducer);

const dispatchFunc = () => (dispatch: Dispatch<Action>) => {
  setTimeout(() => {
    dispatch({
      type: 'add',
    });
  }, 100);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('test createStore', () => {
  beforeEach(() => {
    store = applyMiddleware(m1, m2)(createStore)(reducer);
  });

  it('test subscribe', async () => {
    store.dispatch(dispatchFunc() as any);
    await delay(100);
    expect(store.getState().count).toBe(1);
    expect(m1).toBeCalledTimes(2);
    expect(m2).toBeCalledTimes(2);
  });
});

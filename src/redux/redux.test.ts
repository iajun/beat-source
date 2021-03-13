import createStore from './redux';

const initialState = { count: 0 };

type Action = {
  type: 'add';
};
const reducer = (state: typeof initialState = initialState, action: Action) => {
  return action.type === 'add'
    ? {
        count: state.count + 1,
      }
    : state;
};

let store = createStore(reducer);

const dispatchAdd = () =>
  store.dispatch({
    type: 'add',
  });

describe('test createStore', () => {
  beforeEach(() => {
    store = createStore(reducer);
  });

  it('test subscribe', () => {
    const fn = jest.fn(() => {});
    const unsubscribe = store.subscribe(fn);
    dispatchAdd();
    expect(fn).toBeCalledTimes(1);
    dispatchAdd();
    expect(fn).toBeCalledTimes(2);
    unsubscribe();
    dispatchAdd();
    expect(fn).toBeCalledTimes(2);
  });

  it('test store state', () => {
    expect(store.getState().count).toBe(0);
    dispatchAdd();
    expect(store.getState().count).toBe(1);
  });
});

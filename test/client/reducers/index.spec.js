import rootReducer from "client/reducers/index";
import initialState from "client/reducers/initial-state";
import { setInput, setPing } from "client/actions";

describe("input", () => {
  test("When not passing in a state, it should default to initialState.input", () => {
    const result = rootReducer(undefined, {});
    expect(result.input).toEqual(initialState.input);
  });
  test(`When passing in a new input, and action type of SET_INPUT, 
  it should give you a brand new input`, () => {
    const input = "hello world!!";
    const result = rootReducer(initialState, setInput(input));
    expect(result.input).toEqual(input);
  });
});

describe("ping", () => {
  test("When no state is passed in, initial state should be returned", () => {
    const result = rootReducer(undefined, {});
    expect(result.ping).toEqual(initialState.ping);
  });
  test("When you pass in a new ping through an action, it should set the ping", () => {
    const ping = "hello";
    const result = rootReducer(initialState, setPing(ping));
    expect(result.ping).toEqual(ping);
  });
});
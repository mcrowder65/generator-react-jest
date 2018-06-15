import { call, put } from "redux-saga/effects";

import { setPing } from "../index";

const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
export const apiCall = async () => {
  // this is up to you whether or not you want to implement this server...
  const res = await fetch(`${url}/ping`, { method: "GET" });
  return res.text();
};

// eslint-disable-next-line
export function* pingServer() {
  try {
    const resp = yield call(apiCall);
    yield put(setPing(resp));
  } catch (e) {
    yield put(setPing(e.message));
  }
}

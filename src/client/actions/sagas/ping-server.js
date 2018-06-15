import { call, put } from "redux-saga/effects";

import { setPing } from "../index";
import { fetchGet } from "../../../shared/fetch-wrapper";
import { HTTP_RESPONSE_TYPES } from "../../../shared/constants";

const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
export const apiCall = () => {
  // this is up to you whether or not you want to implement this server...
  return fetchGet({ url: `${url}/ping`, headers: { "Content-Type": HTTP_RESPONSE_TYPES.PLAIN, Accept: HTTP_RESPONSE_TYPES.PLAIN } });
};

export function* pingServer() {
  try {
    const resp = yield call(apiCall);
    yield put(setPing(resp));
  } catch (e) {
    yield put(setPing(e.message));
  }
}

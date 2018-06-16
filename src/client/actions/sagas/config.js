import { pingServer } from "client/actions/sagas/ping-server";
import * as sagaTypes from "./types";

// The second argument of your value object can be method,
// where you can override takeEvery and do takeLatest instead
const sagaConfig = {
  [sagaTypes.PING_SERVER]: { generatorFunction: pingServer }
};

export default sagaConfig;

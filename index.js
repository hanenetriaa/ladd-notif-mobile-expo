import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import App from "./App";

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("ladd-notif-mobile", () => RNRedux);

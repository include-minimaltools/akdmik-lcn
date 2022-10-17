import ReactDOM from "react-dom/client";
import { App } from "./App";
import "styles/index.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "redux-store";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);

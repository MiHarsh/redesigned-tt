import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/googleCalendar/index.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById("root")
);
registerServiceWorker();

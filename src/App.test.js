import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/counter";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Counter />, div);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("Correctly count", () => {
  const h1 = document.createElement("h1");
  ReactDOM.render(<Counter />, h1);
});

it("correctly count", () => {});

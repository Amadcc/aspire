import React, { Component } from "react";
import Counter from "./components/counter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Counter />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

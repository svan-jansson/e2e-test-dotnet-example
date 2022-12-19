import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>E2E Test Example App!</h1>
        <ul>
          <li>React</li>
          <li>.NET 6</li>
          <li>Cypress</li>
        </ul>
      </div>
    );
  }
}

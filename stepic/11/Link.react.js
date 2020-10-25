import React, { Component } from "react";

class Link extends Component {
  constructor() {
    super();
    this.state = {
      class: "normal"
    };
  }

  render() {
    return (
      <a
        classname={this.state.class}
        onMouseEnter={() => this.setState({ class: "hovered" })}
        onMouseLeave={() => this.setState({ class: "normal" })}
      />
    );
  }
}
export default Link;

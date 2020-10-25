import React, { Component } from "react";

class CheckboxWithLabel extends Component {
  constructor() {
    super();

    this.labelOn = "On";
    this.labelOf = "Off";
    this.state = {
      value: this.labelOf,
      active: false
    };
    this.actionHandler = this.actionHandler.bind(this);
  }
  actionHandler = e => {
    if (this.state.active) {
      this.setState({ value: this.labelOf, active: false });
    } else {
      this.setState({ value: this.labelOn, active: true });
    }
  };

  render() {
    return (
      <label>
        {this.state.value}
        <input type="checkbox" onChange={this.actionHandler} />
      </label>
    );
  }
}

export default CheckboxWithLabel;
/*  constructor() {
     super();
     this.labelOn = "On";
     this.labelOff = "Off";
     this.state = {
       checked: false
     };
     this.handleChange = this.handleChange.bind(this);
   }
  
   handleChange(event) {
     console.log(this.refs.i1.checked);
     this.setState({ checked: this.refs.i1.checked });
   }
  
   render() {
     return (
       <label>
         {this.state.checked ? this.labelOn : this.labelOff}
         <input ref="i1" type="checkbox" onChange={this.handleChange} />
       </label>
     );
   } */
/* class CheckboxWithLabel extends Component {
    constructor() {
      super()
      this.labelOn = "On";
      this.labelOff = "Off";
      this.state = {
        value: this.labelOff
      };
    }
  
    render() {
      return (
        <label ref="l1">
          {this.state.value}
          <input
            type="checkbox"
            onChange={event =>
              this.setState({
                value: event.target.checked ? this.labelOn : this.labelOff
              })
            }
          />
        </label>
      );
    }
  } */

import './index.css';
import React, { Component } from 'react';
import FaPlay from 'react-icons/lib/fa/play';
import FaPause from 'react-icons/lib/fa/pause';
import FaForward from 'react-icons/lib/fa/forward';
import FaBackward from 'react-icons/lib/fa/backward';

class RadioGroup extends Component {
  state = {
    activeButton: null
  };

  onSelectButton = value => {
    this.setState({
      activeButton: value
    });
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeButton: this.state.activeButton,
        clickButton: () => this.onSelectButton(child.props.value)
      });
    });
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    const isActive = this.props.activeButton === this.props.value; // <-- should come from somewhere
    const className = 'radio-button ' + (isActive ? 'active' : '');
    return (
      <button className={className} onClick={this.props.clickButton}>
        {this.props.children}
      </button>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup legend="Radio Group">
          <RadioButton value="back">
            <FaBackward />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default App;

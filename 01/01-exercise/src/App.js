import './index.css';
import React, { Component } from 'react';
import subscribeToMessages from './messages';
import FadeIn from './FadeIn';

class PinScrollToBottom extends Component {
  scrollToBottom() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  getSnapshotBeforeUpdate() {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    return scrollHeight === scrollTop + clientHeight;
  }

  componentDidUpdate(pP, pS, atBottom) {
    if (atBottom) {
      this.scrollToBottom();
    }
  }

  render() {
    return this.props.children;
  }
}

class App extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="app">
        <div className="link">
          <a href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k">
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div className="avatar" style={{ backgroundImage: `url(${message.avatar})` }} />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }
}

export default App;

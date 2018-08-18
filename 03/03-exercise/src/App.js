/*
- Make the Play button work
- Make the Pause button work
- Disable the play button if it's playing
- Disable the pause button if it's not playing
- Make the PlayPause button work
- Make the JumpForward button work
- Make the JumpBack button work
- Make the progress bar work
  - change the width of the inner element to the percentage of the played track
  - add a click handler on the progress bar to jump to the clicked spot

Here is the audio API you'll need to use, `audio` is the <audio/> dom nod
instance, you can access it as `this.audio` in `AudioPlayer`

```js
// play/pause
audio.play()
audio.pause()

// change the current time
audio.currentTime = audio.currentTime + 10
audio.currentTime = audio.currentTime - 30

// know the duration
audio.duration

// values to calculate relative mouse click position
// on the progress bar
event.clientX // left position *from window* of mouse click
const rect = node.getBoundingClientRect()
rect.left // left position *of node from window*
rect.width // width of node
```

Other notes about the `<audio/>` tag:

- You can't know the duration until `onLoadedData`
- `onTimeUpdate` is fired when the currentTime changes
- `onEnded` is called when the track plays through to the end and is no
  longer playing

Good luck!
*/

import './index.css';
import React, { createContext } from 'react';
import * as PropTypes from 'prop-types';
import podcast from './podcast.mp4';
import mario from './mariobros.mp3';
import FaPause from 'react-icons/lib/fa/pause';
import FaPlay from 'react-icons/lib/fa/play';
import FaRepeat from 'react-icons/lib/fa/repeat';
import FaRotateLeft from 'react-icons/lib/fa/rotate-left';

const AudioContext = React.createContext();

class AudioPlayer extends React.Component {
  state = {
    playAudio: () => {
      this.audio.play();
      this.setState({ isPlaying: true });
    },
    pauseAudio: () => {
      this.audio.pause();
      this.setState({ isPlaying: false });
    },
    jumpForward: () => (this.audio.currentTime = this.audio.currentTime + 10),
    jumpBack: () => (this.audio.currentTime = this.audio.currentTime - 30),
    isPlaying: false
  };

  render() {
    return (
      <div className="audio-player">
        <AudioContext.Provider
          value={this.state}>
          <audio
            src={this.props.source}
            onTimeUpdate={null}
            onLoadedData={null}
            onEnded={null}
            ref={n => (this.audio = n)}
          />

          {this.props.children}
        </AudioContext.Provider>
      </div>
    );
  }
}

class Play extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button className="icon-button" onClick={context.playAudio} disabled={context.isPlaying} title="play">
            <FaPlay />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class Pause extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={context.pauseAudio}
            disabled={!context.isPlaying}
            title="pause">
            <FaPause />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class PlayPause extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => {
          if (context.isPlaying) {
            return (
              <button
                className="icon-button"
                onClick={context.pauseAudio}
                disabled={null}
                title="pause">
                <FaPause />
              </button>
            );
          } else {
            return (
              <button
                className="icon-button"
                onClick={context.playAudio}
                disabled={null}
                title="play">
                <FaPlay />
              </button>
            );
          }
        }}
      </AudioContext.Consumer>
    );
  }
}

class JumpForward extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={context.jumpForward}
            disabled={null}
            title="Forward 10 Seconds">
            <FaRepeat />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class JumpBack extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {context => (
          <button
            className="icon-button"
            onClick={context.jumpBack}
            disabled={null}
            title="Back 10 Seconds">
            <FaRotateLeft />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class Progress extends React.Component {
  render() {
    return (
      <div className="progress" onClick={null}>
        <div
          className="progress-bar"
          style={{
            width: '23%'
          }}
        />
      </div>
    );
  }
}

const Exercise = () => (
  <div className="exercise">
    <AudioPlayer source={mario}>
      <Play /> <Pause /> <span className="player-text">Mario Bros. Remix</span>
      <Progress />
    </AudioPlayer>

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward />{' '}
      <span className="player-text">Workshop.me Podcast Episode 02</span>
      <Progress />
    </AudioPlayer>
  </div>
);

export default Exercise;

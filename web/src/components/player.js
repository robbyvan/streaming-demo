import React, { Component } from 'react';
import styled from 'styled-components';
import Hls from 'hls.js';

const PlayerWrapper = styled.div`
  position:relative; 
`;

const PlayerInner = styled.div``;

const VideoTitle = styled.h2`
  font-size: 22px; 
  color: rgba(0, 0, 0 , 0.7);
  line-height: 25px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const VideoLiveButtonTitle = styled.span`
  display: inline-block;
  border: 1px solid red;
  padding: 2px 10px;
  line-height: 25px;
  font-size: 14px;
  margin-right: 5px;
  font-weight: 400;
`;

class Player extends Component {
  constructor(props) {
    super(props);
    this._onTouchPlayerInside = this._onTouchPlayerInside.bind(this)
  }

  componentDidMount() {
    const video = this.player;

    if(Hls.isSupported()) {
      const streamUrl = 'https://video-dev.github.io/streams/x36xhzz/x36xhzzAA.m3u8';

      video.addEventListener('contextmenu', e => {
        e.preventDefault();
        return false;
      });

      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
   }
   // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
   // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
   // This is using the built-in support of the plain video element, without using hls.js.
   // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
   // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
      video.addEventListener('loadedmetadata',function() {
        video.play();
      });
    }
  }

  _onTouchPlayerInside() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  render() {
    const style = {
      width: 640,
      height: 360,
      background: '#000',
    };

    return(
      <PlayerWrapper>
        <PlayerInner>
          <video
            controls={false}
            style={style}
            autoPlay
            ref={player => this.player = player}
            onClick={this._onTouchPlayerInside}
          />
          <VideoTitle>
            <VideoLiveButtonTitle>Live</VideoLiveButtonTitle>
            Live Stream Camera
          </VideoTitle>
        </PlayerInner>
      </PlayerWrapper>
    );
  }
}

export default Player;
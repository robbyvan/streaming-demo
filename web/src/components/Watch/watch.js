import React, { Component } from 'react';
import styled  from 'styled-components';
import Player from '../Player/player';

const LiveWrapper = styled.div``;

const LiveVideo = styled.div`    
  display: flex;
  justify-content: center;
`;

class Watch extends Component {
  render() {
    return (
      <LiveWrapper>
        <LiveVideo>
          <Player />
        </LiveVideo>
      </LiveWrapper>
    );
  }
}

export default Watch;
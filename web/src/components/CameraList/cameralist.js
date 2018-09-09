import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const UserCameraWrapper = styled.div`
`;

class CameraList extends Component {
  render() {
    return(
      <UserCameraWrapper>
        <h2>Your camera list</h2>
      </UserCameraWrapper>
    );
  }
}

export default CameraList;

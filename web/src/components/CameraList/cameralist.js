import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as AppActions from '../App/actions';
import { getMyCameraList } from '../../api/camera';
import { history } from "../../history";

const UserCameraWrapper = styled.div`
`;

const ListWrapper = styled.div`
`;

function mapStateToProps(store) {
  return {
    user: store.app.user
  };
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

class CameraList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraList: []
    };

  }

  componentWillMount() {
    const user = this.props.user;
    if (!user) {
      history.push('/login');
    }
  }

  componentDidMount() {
    getMyCameraList()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <UserCameraWrapper>
        <h2>Your camera list</h2>
        <ListWrapper>
          
        </ListWrapper>
      </UserCameraWrapper>
    );
  }
}

CameraList.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(CameraList);

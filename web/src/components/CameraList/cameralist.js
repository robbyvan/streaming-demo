import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import * as AppActions from '../App/actions';
import { getMyCameraList } from '../../api/camera';
import { history } from "../../history";
import './style.css';

const UserCameraWrapper = styled.div`
`;

const ListWrapper = styled.ul`
  min-width: 500px;
  margin: 20px auto;
`;

function mapStateToProps(store) {
  return {
    ...store.app
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

  async componentWillMount() {
    const token = this.props.token;
    await this.props.actions.asyncUserStatus(token);
    if (!this.props.isAuthenticated) {
      history.push('/login');
    }
  }

  componentDidMount() {
    getMyCameraList()
      .then(res => {
        if (res.data.success) {
          this.setState({
            cameraList: res.data.cameraList
          });
        } else {
          this.setState({
            cameraList: []
          });
        }
      })
      .catch(err => {
        console.log(err);
         this.setState({
          cameraList: []
        });
      });
  }

  render() {
    const { cameraList } = this.state;
    return(
      <UserCameraWrapper>
        <h2 className="list-header">Your camera list</h2>
        <button
          className="add-button"
          onClick={() => history.push('/cameralist/add')}
        >+ Add New Cam</button>
        <ListWrapper>
          <div className="table-header table-row">
            <li className="table-row-item">Name</li>
            <li className="table-row-item">Status</li>
            <li className="table-row-item">Connection</li>
            <li className="table-row-item">Last Connected</li>
            <li className="table-row-item">Public</li>
          </div>
          {
            cameraList.map(cam => {
              const lastConnected = cam.lastConnected.length > 0
                ? moment(cam.lastConnected).fromNow()
                : 'N/A';

              return (
                <div className="table-row" key={cam._id}>
                  <li className="table-row-item">{cam.name}</li>
                  <li className="table-row-item">{cam.live ? 'Live' : 'Offline'}</li>
                  <li className="table-row-item">{cam.connected ? 'Connected' : 'Disconnected'}</li>
                  <li className="table-row-item">{lastConnected}</li>
                  <li className="table-row-item">{cam.public ? 'Yes' : 'No'}</li>
                </div>
              )
            })
          }
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

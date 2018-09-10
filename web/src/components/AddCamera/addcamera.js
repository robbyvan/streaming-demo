import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  FormSuccessMessage,
  FormErrorMessage,
  Form,
  FormItem,
  FormCheckboxItem,
  FormAction,
  FormInput,
  FormLabel,
  FormSubmit,
  FormButton
} from '../../base/form';
import { history } from "../../history";
import { addCamera } from '../../api/camera';
import { clearToken } from '../../common/js/storage';
import * as AppActions from '../App/actions';

const AddHeader = styled.h2`
  text-align: center;
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

class AddCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: {
        name: '',
        public: false
      },
      message: {
        type: 'success',
        msg: []
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
  }

  componentWillMount() {
    const user = this.props.user;
    if (!user) {
      history.push('/login');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { camera } = this.state;
    camera.name = camera.name.trim();
    this.setState({ camera });
    if (camera.name.length === 0) {
      this.setState({
        message: {
          type: 'fail',
          msg: ['Camera name should not be empty']
        }
      });
      return;
    }
    addCamera(camera)
      .then(res =>{
        console.log(res);
        if (res.data.success) {
          this.setState({
            message: {
              type: 'success',
              msg: ['A new camera has been added to camera list']
            }
          });
          setTimeout(() => history.push("/cameralist"), 1000);
        } else {
          this.setState({
            message: {
              type: 'fail',
              msg: res.data.msg.split(';')
            }
          });
          if (res.data.code === -1) {
            clearToken();
            this.props.actions.signout();
          }
        }
      })
      .catch(err => {
        this.setState({
          message: {
            type: 'fail',
            msg: ['Sorry, an network error occured']
          }
        });
        console.log(err);
      });
  }

  handleInputChange(e) {
    let { camera } = this.state;
    const field = e.target.name;
    const value = e.target.value;
    camera[field] = value;

    this.setState({
      camera: camera
    });
  }

  toggleCheckBox(e) {
    const { camera } = this.state;
    const checkBoxStatus = e.target.checked;
    camera.public = checkBoxStatus;
    this.setState({
      camera: camera
    });
  }

  render() {
    const { camera, message } = this.state;

    return(
      <div className="add-camera">
        <AddHeader>Add New Camera</AddHeader>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <FormLabel>Camera Name</FormLabel>
            <FormInput
              type="text"
              name="name"
              value={camera.name}
              onChange={this.handleInputChange}
            />
          </FormItem>

          <FormCheckboxItem>
            <FormLabel>Display to Public</FormLabel>
            <FormInput
              type="checkbox"
              name="public"
              value={camera.public}
              onChange={this.toggleCheckBox}
            />
          </FormCheckboxItem>

          <FormAction>
            <FormSubmit type="submit">ADD</FormSubmit>
            <FormButton onClick={() => history.push('/cameralist')}>BACK</FormButton>
          </FormAction>

          {
            message.msg.length > 0
            ? message.type === 'success'
              ? <FormSuccessMessage>{message.msg[0]}</FormSuccessMessage>
              : message.msg.map((m, index) => <FormErrorMessage key={index}>{m}</FormErrorMessage>)
            : null
          }
        </Form>
      </div>
    );
  }
}

AddCamera.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(AddCamera);

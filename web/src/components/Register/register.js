import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  FormSuccessMessage,
  FormErrorMessage,
  Form,
  FormItem,
  FormAction,
  FormInput,
  FormLabel,
  FormSubmit,
  FormButton
} from '../../base/form';
import { signup } from '../../api/user';
import { history } from "../../history";

const RegisterWrapper = styled.div`
  position: relative;
`;

const RegisterHeader = styled.h2`
  text-align: center;
`;

function mapStateToProps(store) {
  return {
    user: store.app.user
  };
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        password: '',
        email: ''
      },
      message: {
        type: 'success',
        msg: []
      },
      canSubmit: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // componentWillMount() {
  //   const currentUser = this.props.user;
  //   if (currentUser) {
  //     history.push('/');
  //   }
  // }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.canSubmit) {
      return;
    }
    const { user } = this.state;
    this.setState({ canSubmit: false });
    signup(user)
      .then(res => {
        if (res.data.success) {
          this.setState({
            message: {
              type: 'success',
              msg: ['Hooray! You have created a new account.']
            },
            canSubmit: true,
          });
        } else {
          this.setState({
            message: {
              type: 'error',
              msg: res.data.msg.split(';')
            },
            canSubmit: true,
          });
        }
      })
      .catch(err => {
        this.setState({
            message: {
              type: 'error',
              msg: ['Sorry, an error occured when creating a new account.']
            },
            canSubmit: true,
          });
      })
  }

  handleInputChange(e) {
    let { user } = this.state;
    const field = e.target.name;
    const value = e.target.value;
    user[field] = value;

    this.setState({
      user: user
    });
  }

  render() {
    const { user, message } = this.state;

    return (
      <RegisterWrapper>
        <RegisterHeader>Create A New Account</RegisterHeader>

        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormInput
              type="text"
              name="name"
              placeholder="Your account name"
              onChange={this.handleInputChange}
              value={user.name}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={e => this.handleInputChange(e)}
              value={user.email}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              name="password"
              placeholder="Your password"
              onChange={e => this.handleInputChange(e)}
              value={user.password}
            />
          </FormItem>

          <FormAction>
            <FormSubmit type="submit">SIGN UP</FormSubmit>
            <FormButton onClick={e => history.push('/login')} type="button">
              Already have an account?
            </FormButton>
          </FormAction>
          {
            message.msg.length > 0
            ? message.type === 'success'
              ? <FormSuccessMessage>{message.msg[0]}</FormSuccessMessage>
              : message.msg.map((m, index) => <FormErrorMessage key={index}>{m}</FormErrorMessage>)
            : null
          }
        </Form>
      </RegisterWrapper>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(Register);
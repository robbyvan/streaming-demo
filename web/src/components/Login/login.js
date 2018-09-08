import React, { Component } from 'react';
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
  FormButton,
  FormActionLeft
} from '../../base/form';
import { login } from '../../api/user';

const LoginWrapper = styled.div`
  position: relative;
`;

const LoginHeader = styled.h2`
  text-align: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        email: '',
        password: ''
      },
      canSubmit: true,
      message: {
        type: 'success',
        msg: []
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    if (!this.state.canSubmit) {
      return;
    }
    this.setState({ canSubmit: false });
    const { user } = this.state;
    login(user)
      .then(res => {
        if (res.data.success) {
          this.setState({
            message: {
              type: 'success',
              msg: [`Hey ${res.data.user.name}, what's up`]
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
        console.log(err);
        this.setState({
          message: {
            type: 'error',
            msg: ['Sorry, an error occured when creating a new account.']
          },
          canSubmit: true
        });
      });
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
      <LoginWrapper>
        <LoginHeader>Login works</LoginHeader>

        <Form onSubmit={this.handleSubmit}>
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
            <FormSubmit type="submit">SIGN IN</FormSubmit>
          </FormAction>
          {
            message.msg.length > 0
            ? message.type === 'success'
              ? <FormSuccessMessage>{message.msg[0]}</FormSuccessMessage>
              : message.msg.map((m, index) => <FormErrorMessage key={index}>{m}</FormErrorMessage>)
            : null
          }
        </Form>
      </LoginWrapper>
    );
  }
}

export default Login;
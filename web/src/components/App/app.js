import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { borderColor, headerHeight, containerMaxWidth } from "../../common/css/theme";
import defaultAvatar from '../../common/image/default.png';
import userAvatar from '../../common/image/avatar.png';
import Watch from '../Watch/watch';
import Home from '../Home/home';
import Register from '../Register/register';
import Login from '../Login/login';
import CameraList from '../CameraList/cameralist';
import AddCamera from '../AddCamera/addcamera';
import * as AppActions from './actions';
import { history } from "../../history";

const Container = styled.div `
  max-width: ${containerMaxWidth}px;
  margin: 0 auto;
`;

const Header = styled.div `
  height: ${headerHeight}px;
  border-bottom: 1px solid ${borderColor};
`;

const Main = styled.div `
  padding: 20px 0;
`;

const Footer = styled.div `
  border-top: 1px solid ${borderColor};
  padding: 10px 0;
`;

const Copyright = styled.p`
  font-size: 12px;
  text-align: center;
`;

const HeaderWrapper = styled.div `
  display: flex;  
`;

const HeaderTitle = styled.div `
  font-size: 35px;
  font-weight: 800;
  line-height: ${headerHeight}px;
  flex-grow: 1;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
`;

const HeaderUserMenu = styled.div `
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
`;

const HeaderUserAvatar = styled.img `
  border-radius: 50%;
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const UserTitle = styled.div`
  position: absolute;
  right: 50px;
  font-size: 14px;
  font-weight: 600;
  line-height: ${headerHeight}px;
`;

function mapStateToProps(store) {
  return {
    user: store.app.user,
    token: store.app.token,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

class App extends Component {

  constructor(props) {
    super(props);

    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }

  componentWillMount() {
    const token = this.props.token;
    this.props.actions.asyncUserStatus(token);
  }

  handleAvatarClick(e) {
    let user = this.props.user;
    if (user !== null) {
      this.props.actions.signout();
      return;
    }
    history.push('/login');
  }

  render() {
    const currentUser = this.props.user;
    const avatarSrc = currentUser ? userAvatar : defaultAvatar;

    return (
      <div className="app">
        <Header>
          <Container>
            <HeaderWrapper>
              <HeaderTitle>Camera</HeaderTitle>
              { currentUser && <UserTitle>What's up, {_.get(currentUser, 'name', '')}</UserTitle> }
              <HeaderUserMenu onClick={this.handleAvatarClick}>
                <HeaderUserAvatar alt="avatar" src={avatarSrc} />
              </HeaderUserMenu>
            </HeaderWrapper>
          </Container>
        </Header>

        <Main>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/register'} component={Register}></Route>
            <Route exact path={'/login'} component={Login}></Route>
            <Route exact path={'/watch/:id'} component={Watch} />
            <Route exact path={'/cameralist'} component={CameraList}></Route>
            <Route exact path={'/cameralist/add'} component={AddCamera}></Route>
          </Switch>
        </Main>

        <Footer className="footer">
          <Container>
            <Copyright>2018 @Robby</Copyright>
          </Container>
        </Footer>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));

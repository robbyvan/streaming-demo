import React, { Component } from 'react';
import styled from 'styled-components';
import {borderColor, headerHeight, containerMaxWidth} from "./theme";
import userAvatar from '../image/avatar.jpeg';
import Watch from './pages/watch';
import Home from './pages/home';
import { Route, Switch } from 'react-router-dom'

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
  width: 50px;
  display: flex;
  align-items: center;
`;

const HeaderUserAvatar = styled.img `
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header>
          <Container>
            <HeaderWrapper>
              <HeaderTitle>Camera</HeaderTitle>
              <HeaderUserMenu>
                <HeaderUserAvatar alt="" src={userAvatar} />
              </HeaderUserMenu>
            </HeaderWrapper>
          </Container>
        </Header>

        <Main>
          <Switch>
            <Route exact path={'/watch/:id'} component={Watch} />
            <Route exact path={'/'} component={Home} />
          </Switch>
        </Main>

        <Footer className="footer">
          <Container>
            <Copyright>@ 2018 Robby</Copyright>
          </Container>
        </Footer>
      </div>
    );
  }
}

export default App;
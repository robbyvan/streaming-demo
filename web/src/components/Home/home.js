import React, { Component } from 'react';
import styled  from 'styled-components';
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
`;

const HomeHeader = styled.h2`
text-align: center;
`;

const HomeLinks = styled.ul`
  list-style: none;
  width: 300px;
  text-align: center;
  margin: 0 auto;
  padding: 0;
`;

const LinkWrapper = styled.li`
  margin: 0;
  padding: 20px 40px;
  border: 1px solid #a6908b;
  &:hover {
    cursor: poniter;
  }
  & a {
    text-decoration: none;
    color: #a6908b;
  }
  & a:visited {
    color: #a6908b;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <HomeWrapper>
        <HomeHeader>Welcome to Camera App</HomeHeader>
        {
          isAuthenticated ? <h1>Ha</h1> : <h2>hey</h2>
        }
        <HomeLinks>
          <LinkWrapper>
            <Link to="/cameralist">My Camera List</Link>
          </LinkWrapper>
        </HomeLinks>
        
      </HomeWrapper>
    );
  }
}

export default Home;
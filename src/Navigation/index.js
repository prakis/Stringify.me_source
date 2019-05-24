import React from 'react';
///assets/images/stringify.svg
//import logo from './logo-red.svg';
import { Navbar } from 'reactstrap';

function Logo(){
    return (<div className="logo-text logo-loc nav-div-child-left">
      <span className="logo-text">sssss</span>
      <span className="bracket">(</span>
      <a className="me-text" href="https://twitter.com/prakis">me</a>
      <span className="bracket">)</span>
    </div>
    );
}
class Navigation extends React.Component {
  render() {
    return (
      <header>
        <Navbar expand="md" className="nav-div">

          <Logo />

          <div className="nav-div-child-center">
            <span className="logo-text">title</span>
          </div>
          <div className="nav-div-child-right">
            <span className="logo-text" onClick={this.props.modalHelpRef}>About</span>
          </div>
        </Navbar>
      </header>
    );
  }
}
export default Navigation;

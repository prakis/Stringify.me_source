import React from 'react';
import Navigation from '../Navigation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HelpHtml from '../Help/helphtml';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHelp: false,
      homePageHTML: null
    };

    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.loadHomePageHTML();
  }
  toggleHelpModal() {
    this.setState({
      modalHelp: !this.state.modalHelp
    });
  }
  loadHomePageHTML() {
    if (!this.state.homePageHTML) {
    var me = this;  
      fetch('/homepage.html')
        .then(r => r.text())
        .then(homepagehtml => {
          me.setState({
            homePageHTML: homepagehtml
          });
        });
    }
  }
  render() {
    return (
      <>
        <Navigation modalHelpRef={this.toggleHelpModal} />
        <div className="landing-page">
          home page
        </div>
        <Modal isOpen={this.state.modalHelp} toggle={this.toggleHelpModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleHelpModal}>About</ModalHeader>
          <ModalBody>
            <HelpHtml />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleHelpModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </>);
  }
}

export default HomePage;
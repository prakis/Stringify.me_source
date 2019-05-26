import React from 'react';
import Parser from 'html-react-parser';
import GitHubForkRibbon from 'react-github-fork-ribbon'; 

function ForkRibbon() { 
      return ( <GitHubForkRibbon position="right" 
                          color="green"
                          href="https://github.com/prakis/stringify.me" 
                          target="_blank" > 
                  Fork me on GitHub 
              </GitHubForkRibbon> ); 
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homePageHTML: null
    };
    this.loadHomePageHTML();
  }
  loadHomePageHTML() {
    if (!this.state.homePageHTML) {
    var me = this;  
      fetch('/home.html')
        .then(r => r.text())
        .then(homepagehtml => {
          me.setState({
            homePageHTML: homepagehtml
          });
        });
    }
  }
  render() {
    const __html = (this.state.homePageHTML) ? Parser(this.state.homePageHTML) : null;
    return (<>
        <ForkRibbon />    
        <div className="landing-page">{ __html }</div>
    </>);
  }
}

export default HomePage;
import React from 'react';
import { withRouter } from 'react-router-dom';
import Mustache from 'mustache';
import Parser from 'html-react-parser';
//import DOMPurify from 'dompurify';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gitHubUserName: this.getUserName(),
      isValidGitHubUserName: true,
      profileJson: '',
      themeTemplate: ''
    };
    this.getProfileJson();
  }
  getUserName() {
    var fullPath = this.props.location.pathname;
    return fullPath.split('/')[1];
  }
  addOtherJsonValues(json) {
    json.basics['github'] = "https://github.com/" + this.state.gitHubUserName;
    let picName = json.basics['picture'];
    json.basics['picture_fullpath'] = this.getGitCachePath() + picName;
    this.setState({ profileJson: json });
  }
  getGitCachePath() {
    //return 'https://raw.githubusercontent.com/' + this.state.gitHubUserName + '/stringify.me/master/';
    return 'https://raw.githubusercontent.com/' + this.state.gitHubUserName + '/stringify.me/master/';
  }
  getProfileJson() {
    const profileJsonURL = this.getGitCachePath() + 'profile.json';
    
    var me = this;
    fetch(profileJsonURL)
      .then(response => response.json())
      .then(json => {

        me.addOtherJsonValues(json);

        if (json && json.theme) {
          me.getTemplate(json.theme);
        }

      }).catch(error => {
        this.setState({ isValidGitHubUserName: false })
        console.log("GitHub User profile error", error);
      });
  }
  getTemplate(theme) {
    // https://github.com/prakis/stringify.me-theme
    // https://raw.githubusercontent.com/prakis/stringify.me-theme/master/theme.template
    let themeUrlBase = theme.url.replace("//github.com/", "//raw.githubusercontent.com/");
    let themeUrlFullPath = themeUrlBase + "/master/theme.template";
    //console.log("themeUrlFullPath>>", themeUrlFullPath, "<--2");

    fetch(themeUrlFullPath)
      .then(response => response.text())
      .then(data => {
        //console.log(">->",data,"<-<" , typeof(data));
        this.setState({ themeTemplate: data });

      }).catch(error => {
        //this.setState({ isValidGitHubUserName: false });
        console.log("GitHub Theme error", error);
      });
  }
  render() {
    //let template = JSON.stringify(this.state.themeTemplate);
    const __html = Mustache.render(this.state.themeTemplate, this.state.profileJson);
    //console.log(">", __html, "<");
    let divref = (__html) ? <div ref='test' >{Parser(__html)} </div> : null;
    //<div ref='test' dangerouslySetInnerHTML={{  __html: DOMPurify.sanitize(__html)   }} />
    return (<div>
              {divref}
            </div>);
  }
}

export default withRouter(UserPage);
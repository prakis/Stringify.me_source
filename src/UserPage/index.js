import React from 'react';
import {
    withRouter
} from 'react-router-dom';
import Mustache from 'mustache';
import Parser from 'html-react-parser';
//import DOMPurify from 'dompurify';

const GUC = "githubusercontent.com";
const GITHACK = "githack.com";
const GITCDN_LINK = "gitcdn.link";
class UserPage extends React.Component {
        constructor(props) {
            super(props);

            var fullPath = this.props.location.pathname;
            var username = fullPath.split('/')[1];

            this.state = {
                gitHubUserName: username,
                isValidGitHubUserName: true,
                profileJson: '',
                themeTemplate: '',
                themeUrlRoot: ''
            };
            this.getProfileJson();
        }
        addOtherJsonValues(json) {
            json.basics['github'] = "https://github.com/" + this.state.gitHubUserName;
            let picName = json.basics['picture'];
            json.basics['picture_fullpath'] = this.getGitCachePath(GUC) + picName;
            console.log(json.basics['picture_fullpath']);
            this.setState({
                profileJson: json
            });
        }
        getGitCachePath(cdn, repo = "stringify.me") {
            var path = "";
            switch (cdn) {
                case GITCDN_LINK:
                    path = 'https://gitcdn.link/repo/' + this.state.gitHubUserName + '/' + repo + '/master/';
                    break;
                case GITHACK:
                    path = 'https://raw.githack.com/' + this.state.gitHubUserName + '/' + repo + '/master/';
                    break;
                default:
                    path = 'https://raw.githubusercontent.com/' + this.state.gitHubUserName + '/' + repo + '/master/';
            }
            return path;
        }
        getProfileJson() {
            const profileJsonURL = this.getGitCachePath(GITHACK) + 'profile.json';
            console.log(profileJsonURL);
            var me = this;
            fetch(profileJsonURL)
                .then(response => response.json())
                .then(json => {

                    me.addOtherJsonValues(json);

                    if (json && json.theme) {
                        me.getTemplate(json.theme);
                    }

                }).catch(error => {
                    this.setState({
                        isValidGitHubUserName: false
                    })
                    console.log("GitHub User profile error", error);
                });
        }
        appendMainCSSPath(template) {
            const cdnpath = this.state.themeUrlRoot;
            const maincss = "main.css";
            console.log(cdnpath + maincss);
            return template.replace(maincss, cdnpath + maincss);
        }
        getTemplate(theme) {
            // https://github.com/prakis/stringify.me-theme
            // https://raw.githubusercontent.com/prakis/stringify.me-theme/master/theme.template
            //let themeUrlBase = theme.url.replace("//github.com/", "//raw.githubusercontent.com/");
            let themeUrlBase = theme.url.replace("//github.com/", "//raw.githack.com/");
            //let themeUrlBase = theme.url.replace("//github.com/", "//raw.githack.com/");
            const themeUrlRoot = themeUrlBase + "/master/";
            this.setState({
                themeUrlRoot: themeUrlRoot
            });
            //let themeUrlRoot = "https://raw.githack.com/prakis/stringify.me-theme-card2/master/";
            const fullTemplatePath = themeUrlRoot + "template.html";
            console.log(fullTemplatePath);

            fetch(fullTemplatePath)
                .then(response => response.text())
                .then(data => {
                    let withCSSPath = this.appendMainCSSPath(data);

                    this.setState({
                        themeTemplate: withCSSPath
                    });

                }).catch(error => {
                    //this.setState({ isValidGitHubUserName: false });
                    console.log("GitHub Theme error", error);
                });
        }
        render() {
            //let template = JSON.stringify(this.state.themeTemplate);
            const __html = Mustache.render(this.state.themeTemplate, this.state.profileJson);
            //console.log(">", __html, "<");
            let divref = (__html) ? <div ref = 'test' > { Parser(__html) } </div> : null;
            //<div ref='test' dangerouslySetInnerHTML={{  __html: DOMPurify.sanitize(__html)   }} />
            //return ( <div > { divref } </div>);
            return (  divref );
            }
        }

        export default withRouter(UserPage);
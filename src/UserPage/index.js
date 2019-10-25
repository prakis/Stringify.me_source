import React from 'react';
import { withRouter } from 'react-router-dom';
import Mustache from 'mustache';
import Parser from 'html-react-parser';

/**
 * testProfileJson and testTemplate are only for local testing purposes
 */
import testProfileJson from './testprofile.json';
import testTemplate from './template.txt';

const GUC = "githubusercontent.com";
const GITHACK = "githack.com";
const GITCDN_LINK = "gitcdn.link";
class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.testMode = false;

        var fullPath = this.props.location.pathname;
        var username = fullPath.split('/')[1];

        this.state = {
            gitHubUserName: username,
            isValidGitHubUserName: true,
            profileJson: '',
            themeTemplate: '',
            themeUrlRoot: ''
        };
    }
    componentDidMount(){
        if(this.testMode){
            this._getLocalProfileJsonForTesting();
        } else {
            this.getProfileJson();
        }
        
    }
    _getLocalProfileJsonForTesting(){
        
        this.addOtherJsonValues(testProfileJson);
        //this.getTemplate(testProfileJson.theme);
        testProfileJson.basics['picture_fullpath'] = 'test-profile-200x200.jpg';

        fetch(testTemplate)
            .then(response => response.text())
            .then(templateData => {

                this.setState({
                    themeTemplate: templateData
                });
            }).catch(error => {
                console.log("GitHub Test Theme error", error);
            });        
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
        console.log(profileJsonURL, "<---1");
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
                console.log("GitHub User profile error--", error);
            });
    }

    getTemplate(theme) {
        let themeUrlBase = theme.url.replace("//github.com/", "//raw.githack.com/");
        var themeUrlRoot = themeUrlBase + "/master/";
        this.setState({
            themeUrlRoot: themeUrlRoot
        });
        
        // for local testing
        //themeUrlRoot = "https://raw.githack.com/prakis/stringify.me-theme-card2/master/";
        
        var fullTemplatePath = themeUrlRoot + "template.html";
        console.log("-------------->", fullTemplatePath);

        fetch(fullTemplatePath)
            .then(response => response.text())
            .then(templateData => {
                //let withCSSPath = this.appendTemplateCSSPath(data);

                let templateStyle = "<link rel='stylesheet' href='"+ themeUrlRoot + "theme-style.css' type='text/css'>  ";

                this.setState({
                    themeTemplate: templateStyle + templateData
                });

            }).catch(error => {
                //this.setState({ isValidGitHubUserName: false });
                console.log("GitHub Theme error", error);
            });
    }
    render() {
        var __html = null;
        if(this.state.themeTemplate){
            const renderedTemplate = Mustache.render(this.state.themeTemplate, this.state.profileJson);
            __html = (this.state.themeTemplate) ? Parser(renderedTemplate) : null;
        }
        let divref = <>
            {__html}
        </>;
        return (divref);
    }
}

export default withRouter(UserPage);
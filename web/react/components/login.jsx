// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import * as Utils from '../utils/utils.jsx';
import LoginEmail from './login_email.jsx';
import LoginLdap from './login_ldap.jsx';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        const teamDisplayName = this.props.teamDisplayName;
        const teamName = this.props.teamName;

        let loginMessage = [];
        if (global.window.mm_config.EnableSignUpWithGitLab === 'true') {
            loginMessage.push(
                    <a
                        className='btn btn-custom-login gitlab'
                        href={'/' + teamName + '/login/gitlab'}
                    >
                        <span className='icon' />
                        <span>{'with GitLab'}</span>
                    </a>
           );
        }

        if (global.window.mm_config.EnableSignUpWithGoogle === 'true') {
            loginMessage.push(
                    <a
                        className='btn btn-custom-login google'
                        href={'/' + teamName + '/login/google'}
                    >
                        <span className='icon' />
                        <span>{'with Google Apps'}</span>
                    </a>
           );
        }

        const verifiedParam = Utils.getUrlParameter('verified');
        let verifiedBox = '';
        if (verifiedParam) {
            verifiedBox = (
                <div className='alert alert-success'>
                    <i className='fa fa-check' />
                    {' Email Verified'}
                </div>
            );
        }

        let emailSignup;
        if (global.window.mm_config.EnableSignUpWithEmail === 'true') {
            emailSignup = (
                <LoginEmail
                    teamName={this.props.teamName}
                />
            );
        }

        if (loginMessage.length > 0 && emailSignup) {
            loginMessage = (
                <div>
                    {loginMessage}
                    <div className='or__container'>
                        <span>{'or'}</span>
                    </div>
                </div>
            );
        }

        let forgotPassword;
        if (emailSignup) {
            forgotPassword = (
                <div className='form-group'>
                    <a href={'/' + teamName + '/reset_password'}>{'I forgot my password'}</a>
                </div>
            );
        }

        let userSignUp = null;
        if (this.props.inviteId) {
            userSignUp = (
                <div>
                    <span>{`Don't have an account? `}
                        <a
                            href={'/signup_user_complete/?id=' + this.props.inviteId}
                            className='signup-team-login'
                        >
                            {'Create one now'}
                        </a>
                    </span>
                </div>
            );
        }

        let teamSignUp = null;
        if (global.window.mm_config.EnableTeamCreation === 'true') {
            teamSignUp = (
                <div className='margin--extra'>
                    <a
                        href='/'
                        className='signup-team-login'
                    >
                        {'Create a new team'}
                    </a>
                </div>
            );
        }

        let ldapLogin = null;
        if (global.window.mm_config.EnableLdap === 'true') {
            ldapLogin = (
                <LoginLdap
                    teamName={this.props.teamName}
                />
            );
        }

        return (
            <div className='signup-team__container'>
                <h5 className='margin--less'>{'Sign in to:'}</h5>
                <h2 className='signup-team__name'>{teamDisplayName}</h2>
                <h2 className='signup-team__subdomain'>{'on '}{global.window.mm_config.SiteName}</h2>
                    {verifiedBox}
                    {loginMessage}
                    {emailSignup}
                    {ldapLogin}
                    {userSignUp}
                    <div className='form-group margin--extra form-group--small'>
                        <span><a href='/find_team'>{'Find your other teams'}</a></span>
                    </div>
                    {forgotPassword}
                    {teamSignUp}
            </div>
        );
    }
}

Login.defaultProps = {
    teamName: '',
    teamDisplayName: ''
};
Login.propTypes = {
    teamName: React.PropTypes.string,
    teamDisplayName: React.PropTypes.string,
    inviteId: React.PropTypes.string
};

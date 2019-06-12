import Auth0 from 'auth0-js';

const ON_SUCCESS_REDIRECT = "/";
const ON_FAIL_REDIRECT = "/";

export default class {
    auth0 = new Auth0.WebAuth({
        domain: 'rj-auth.auth0.com',
        clientID: 'KIj84BllENg8vclRqSJrLNiQCe1gFLe0',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                // this.setSession(authResult);
                const expiresAt = JSON.stringify((authResult.expiresIn)*1000 + new Date().getTime());
                localStorage.setItem('access_token',authResult.accessToken);
                localStorage.setItem('id_token',authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                window.location.hash = "";
                window.location.pathname = ON_SUCCESS_REDIRECT
            } else if (err) {
                window.location.pathname = ON_FAIL_REDIRECT
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at') || null);
      return new Date().getTime() < expiresAt;
    }

}
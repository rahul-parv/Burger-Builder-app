import auth0 from 'auth0-js';



export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'rj-auth.auth0.com',
        clientID: 'KIj84BllENg8vclRqSJrLNiQCe1gFLe0',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        audience: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBH6eglplzAlv9XLWXuDhWzVcQvbd-clqM',
        scope: 'openid'
    });


    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
    }


    login() {
        this.auth0.authorize();
        console.log("Auth0 : LOGIN SUCCESS");
    }

    logout() {
        // Remove localsession flags from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('idToken');

        this.auth0.logout({
            returnTo: window.location.origin
        });

        console.log("Auth0 : LOGOUT SUCCESS");
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                window.location.pathname = "/"
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        const access_token = localStorage.getItem('access_token');
        return access_token || null;
    }

    getIdToken() {
        const idToken = localStorage.getItem('idToken');
        return idToken || null;
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        // Set localsession flags in localStorage
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('expiresAt', expiresAt);

        // clear path
        window.location.hash = "";
        // navigate to the home route
        window.location.pathname = "/"
    }

    isAuthenticated() {
        // Check access token and token's expiry time
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            console.log(" access_token not found")
            return false;
        } else {
            const expiresAt = +localStorage.getItem('expiresAt');
            const currentTime = new Date().getTime();
            return (currentTime < expiresAt) ? true : false;
        }
    }
}
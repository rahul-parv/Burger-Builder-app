import axios from 'axios';
import * as actions from './actionTypes'


const firbase_API_key = 'AIzaSyBH6eglplzAlv9XLWXuDhWzVcQvbd-clqM';
const signUpURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + firbase_API_key;
const signInURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + firbase_API_key;

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (idToken, localId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

const authFail = (err) => {
    return {
        type: actions.AUTH_FAIL,
        error: err
    }
}

const checkAuthTimeout = (exoiresInTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, exoiresInTime * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('localId');
    return {
        type: actions.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (email, password, isSignUpMode) => {
    return dispatch => {
        dispatch(authStart());
        const signUpData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let URL = signUpURL;
        if (!isSignUpMode) {
            URL = signInURL;
        }

        axios.post(URL, signUpData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationTime', expirationDate);
                localStorage.setItem('localId', res.data.localId);
                dispatch(checkAuthTimeout(res.data.expiresIn))
                dispatch(authSuccess(res.data.idToken, res.data.localId))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(token, localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}
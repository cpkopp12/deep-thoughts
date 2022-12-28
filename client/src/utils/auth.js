//DECLARATIONS: decode -----------------
import decode from 'jwt-decode';

class AuthService {
    //retrive data from token
    getProfile() {
        return decode(this.getToken())
    }
    //check if user is still logged in
    loggedIn() {
        // checks for a valid saved token
        const token = decode(this.getToken())
        //use type coersion, confused on this
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    getToken() {
        // retrieves user token from local storage
        let tok = localStorage.getItem('id_token');
        if (!tok) {
            return '';
        }
        return tok;
    }
    login(idToken) {
        //save user token to localstor
        localStorage.setItem('id_token', idToken)
        //redirect
        window.location.assign('/');
    }
    logout () {
        //clear user token from locstor
        localStorage.removeItem('id_token');
        //reload +reset state
        window.location.assign('/');
    }
};

export default new AuthService();
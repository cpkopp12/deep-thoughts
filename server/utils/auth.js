//Declarations: jsonwebtoken ---------------------
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhh';
const expiration = '2h';

//export webtoken -----------------------
module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id};

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        //seperate bearer from tokenvalue
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        //if no token, return request as is
        if (!token) {
            return req;
        }

        try {
            //decode + attatch user data to request
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    }
}
import jsonwebtoken from "jsonwebtoken";
import config from "../config.json" assert { type: 'json' };
export default class TokenService {

    static async generate(payload) {
        return jsonwebtoken.sign(payload, config.jswt.secretKey, {expiresIn: config.jswt.tokenLife});
    }

    static async check(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                res.status(401).end();
                throw new Error("Unauthorized");
            }
            jsonwebtoken.verify(token, config.jswt.secretKey, (err, decoded) => {
                if (err) {
                    res.status(401).clearCookie('token').redirect('/');
                    throw err;
                }
                req.user = decoded;
            });
            next();
        } catch (err) {
            console.error(err);
        }
    }

    static async getData(token) {
        let data;
        if (!token)
            return false;
        jsonwebtoken.verify(token, config.jswt.secretKey, (err, decoded) => {
            if (err)
                return false;

            data = decoded;
        });
        return data;
    }
}

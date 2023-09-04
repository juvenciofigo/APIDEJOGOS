var jwt = require("jsonwebtoken");

const JWTSECRET = "dfsdbdjvkbgfgsdgfdgdfgfdgdfgdfgfdgsfgsdfgdfgfdgsdfgfdgsdfgfdgsdfdf";

async function Auth(req, res, next) {

    try {
        AuthToken = req.headers.authorization.replace("Bearer ", "");
        if (!AuthToken || AuthToken === undefined) {
            return res.status(401).send("Token de autorização ausente ou inválido.");
        }

        var token = AuthToken.replace("Bearer ", "");

        async function verifyToken(token, JWTSECRET) {
            try {
                var data = await jwt.verify(token, JWTSECRET);
                return data;
            } catch (e) {
                console.error(e);
                return null;
            }
        }
        const tokenData = await verifyToken(token, JWTSECRET);

        if (!tokenData) {
            return res.status(400).send("Dados inválidos!");
        }
        console.log("Ola");
        req.user = tokenData;
        next();
    } catch (err) {
        return res.status(401).send("Token de autorização ausente ou inválido.");
    }
}

module.exports = {
    JWTSECRET: JWTSECRET,
    Auth: Auth,
};

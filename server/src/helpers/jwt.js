const jwt = require("jsonwebtoken");

const authJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null){
        return res.status(401).json({message: 'Unauthorized'});
    }

    jwt.verify(token, process.env.secret, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Forbidden'});
        }
        req.user = user;
        next();
    })
};

module.exports=authJwt;


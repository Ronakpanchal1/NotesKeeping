const jwt = require('jsonwebtoken')
const JWT_SECRET = "YaaLet$g0"


const fetchuser = (req,res,next)=>{

        const token  = req.header('auth-token');
        if(!token){
            res.status(401).send({error:"Plz authenticate using a valid token"})
        }
        try {
            const data = jwt.verify(token,JWT_SECRET);
            // console.log(data)
            req.user = data.user;
            next();

    } catch (error) {
        res.status(401).send("Invalid Token authentication")
    }
}

module.exports = fetchuser
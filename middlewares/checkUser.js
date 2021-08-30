import { jwtAuthService } from '../services/jwtAuthService.js';
const newJwtService = new jwtAuthService();
const checkUser =(req,res,next)=>{
    try{
        let token;
        console.log(req.headers);
        if(req.headers && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        const verifiedUser = newJwtService.decodeToken(token,process.env.JWT_SECRET_ACCESS_KEY);

        console.log(verifiedUser,"is posting this post!!");

        if(!verifiedUser){
            res.send({
                status:404,
                success:false,
                message:"user not found!!!!"
            });
        }else{
            req.user = verifiedUser;
            next();
        }
    }
    catch(err){
        res.send({
            status:500,
            success:false,
            message:err.message
        })
    }
}

export {checkUser};
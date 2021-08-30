import jwt from 'jsonwebtoken';

class jwtAuthService{

    signToken(id,jwtAccessSecret,jwtRefreshSecret){
        const payload = {
            id:id
        }
        const refreshToken = jwt.sign(payload,jwtRefreshSecret,{algorithm:'HS384',expiresIn:'7 days'});
        const authToken = jwt.sign(payload,jwtAccessSecret,{algorithm:'HS384',expiresIn:'24h'});

        return {
            refreshToken,
            authToken,
        }
    }

    decodeToken(token,jwtsecret){
        const decode = jwt.verify(token,jwtsecret);
        
        if(decode){
            return decode;
        }
        else{
            return {
                success:false,
                message:"jwt decode failed!!",
            }
        }  
    }
    
    checkExpiry(token,jwtsecret){
        const decode = jwt.verify(token,jwtsecret);
        if(!decode || decode.expiresIn < Date.now().valueOf()/1000){
            return{
                success:false,
                message:"jwt is expired!!!"
            }
        }
        return decode;
    }

    signAccessToken(refreshToken,jwtrefreshsecret,jwtaccesssecret){
        const decode = jwt.verify(refreshToken,jwtrefreshsecret);
        if(!decode || decode.expiresIn < Date.now().valueOf()/1000){
            return{
                success : false,
                message : "refreshToken is expired"
            }
        }
        const accessToken = jwt.sign({id:decode.id},jwtaccesssecret,{expiresIn:'24h'});
        return accessToken;
    }


}


export {jwtAuthService};
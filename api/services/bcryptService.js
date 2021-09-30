import bcrypt from 'bcryptjs';
class bcryptService{

    async hashPassword(passowrd){
        try{
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(passowrd, salt);
            return {
                success:true,
                hashedPassword:hashedPassword
            }
        }
        catch(e){
            return{
                success: false,
                message:e.message
            }
        }
    }

    async comparePassword(userPassword,hashedPassword){
        const isReal = await bcrypt.compare(userPassword,hashedPassword);
        if(isReal){
            return {
                success:true,
            }
        }
        else{
            return {
                success:false,
                message:"password dont match!!"
            }
        }
    }

}


export {bcryptService};
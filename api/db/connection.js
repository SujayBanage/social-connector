import mongoose from 'mongoose';

const mongodbConnection = async()=>{
    try{
        const result = await mongoose.connect(process.env.MONGODB_URI,{
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        result ? console.log('connection to Mongodb successfull!!!') : null;

    }
    catch (e) {
        console.log(`error occured while connecting to db ${e}`);
    }

}

export default mongodbConnection;


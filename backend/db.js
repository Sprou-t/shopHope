import mongoose from "mongoose"


export const connectDB = async () =>{
    try {
        // process.env is an obj provided by Node.js tht contains env var
        // we can access .MONGO_URI bcoz we used dotenv which loads these var from file into process.env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1); // 1 means exit w failure
    }
}
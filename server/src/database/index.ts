import {MongoClient} from "mongodb";
import {Database} from "../lib/types";

const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/main?retryWrites=true&w=majority`

export const connectDatabase=async (): Promise<Database> =>{
   const  client =await MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});
   const db = await  client.db('main');
   return{
       listings: db.collection('listings')
   }
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express ,{ Application} from 'express';
// import listing from './listing'
// import bodyParser from "body-parser";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";
import {connectDatabase} from "./database";

//const app= express();
//const port = 9000;

// const server= new ApolloServer({typeDefs, resolvers});
// server.applyMiddleware({app, path:'/api'})

// app.use(bodyParser.json())

/*const one :number = 1;
const two :number = 2;
app.get('/', (_req, res)=>{
  return  res.send(`Sum of one and two is ${one+two} `)
});*/

//listing
/*app.get('/listings', (_req, res)=>{
  return res.send(listing)
});

app.post('/delete-listing',(req, res)=>{
   const id: string = req.body.id;
   for (let i = 0; i < listing.length ; i++) {
     if (listing[i].id === id)
     {
       return res.send(listing.splice(i,1))
     }
  }
   res.send('Failed to delete listing')
});*/
//curl -X POST http://localhost:9000/delete-listing -H 'Content-Type:application/json' -d '{"id":"001"}'
// app.listen(port);
// console.log(`[app:] http://localhost:${port}`);

const mount =async (app:Application) =>{
    const db =await connectDatabase();
    const server= new ApolloServer({typeDefs, resolvers, context:()=>({db})});
    server.applyMiddleware({app, path:'/api'})
    app.listen(process.env.APP_PORT);
    console.log(`[app:] http://localhost:${process.env.APP_PORT}`);

  //  const  listings = await  db.listings.find({}).toArray();
   // console.log(listings);
};

mount(express());


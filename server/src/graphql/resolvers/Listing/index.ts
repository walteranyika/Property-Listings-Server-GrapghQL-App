// import listings from "../listing";
import {IResolvers} from 'apollo-server-express'
import {Database, Listing} from "../../../lib/types";
import {ObjectId} from "mongodb"

export const listingsResolver:IResolvers = {
    Query:{
        // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-unused-vars
        listings: async (_root:undefined, _args:{}, {db}: { db:Database }):Promise<Listing[]>=>{
            return await db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing:async (_root:undefined, {id}:{id:string}, {db}: { db:Database }):Promise<Listing>=>{
            const result =await  db.listings.findOneAndDelete({
                _id: new ObjectId(id)
            });
            if (!result.value){
                throw  new Error("Error While deleting");
            }
            return result.value
            /*for (let i = 0; i < listings.length; i++) {
                if (listings[i].id===id){
                    return listings.splice(i,1)[0];
                }
            }
            throw new Error("Failed to delete listing")*/
        }
    },
    Listing:{
        id:(listing:Listing):string=>listing._id.toString()
    }
}
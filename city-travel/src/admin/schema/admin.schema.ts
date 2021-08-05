import * as mongoose from 'mongoose'
import { string } from 'yargs'

export const AdminSchema  = new mongoose.Schema({
    // _id:String,
    name:String,
    email:String,

    password :String,
   
})
import * as mongoose from 'mongoose'
import { string } from 'yargs'

export const CitySchema  = new mongoose.Schema({
    // _id:String,
    name:String,
    state :String,
    imageLink:String,
    info :String,
    bestVisitTime:String,
    contactToPlan :String
})
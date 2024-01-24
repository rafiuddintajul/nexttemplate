import { Schema, model, models } from "mongoose";
import Contents from './contents'

const WebSectionsSchema = new Schema({
  contents:{
    type: [Schema.Types.ObjectId],
    default:[],
  },
  structure:String
})

const WebSections = models.WebSections || model('WebSections', WebSectionsSchema)

export default WebSections
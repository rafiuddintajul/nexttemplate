import { Schema, model, models } from "mongoose";

const SubContentsSchema = new Schema({
  type:String,
  article:String,
  url:String,
  style:String
});

const ContentsSchema = new Schema({
  contents: { type: [SubContentsSchema], default:[] },
  structure: { type: String },
  bgPic: { 
    url:String, 
    style: String,
    
  }
});

const Contents = models.Contents || model('Contents', ContentsSchema);

export default Contents
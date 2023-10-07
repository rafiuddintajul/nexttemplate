import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
})

const Contents = models.Contents || model('Contents', ContentSchema)

export default Contents
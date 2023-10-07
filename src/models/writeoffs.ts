import { Schema, model, models } from 'mongoose';
import ItemsGroupSchema from './itemgroups';

const WriteOffSchema = new Schema({
  items: {
    type: [ItemsGroupSchema],
    required: [true, 'Items record is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date of Invoice is required'],
  },
  reason: {
    type: String,
    required: [true, 'Reason of Writing Off is required'],
  },
  total: {
    type: Number,
    required: [true, 'Total amount loss is required'],
  }
},{
  timestamps: true
})

const WriteOffs = models.WriteOff || model('WriteOff', WriteOffSchema)
export default WriteOffs
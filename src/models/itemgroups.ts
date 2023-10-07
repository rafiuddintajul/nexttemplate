import { Schema } from 'mongoose';

const ItemsGroupSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product ref is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product flow quantity is required']
  },
})

export default ItemsGroupSchema

import { Schema, model, models } from 'mongoose';
import ItemsGroupSchema from './itemgroups';
import { OrderStatus } from './modelvar';

const OrderSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Customer is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  account: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  items: [ItemsGroupSchema],
  total: {
    type: Number,
    required: [true, 'Total amount of order is required']
  },
  //date should be date order
  date: {
    type: Date,
    required: [true, 'Order\'s date is required']
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
    enum: OrderStatus,
    required: [true, 'Order status is required']
  }
}, {
  timestamps:true
})

const Orders = models.Order || model("Order", OrderSchema);
export default Orders;

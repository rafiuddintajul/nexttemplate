import { Schema, model, models } from 'mongoose';
import ItemsGroupSchema from './itemgroups';

const InvoiceSchema = new Schema({
  no: {
    type: String,
    required: [true, 'Invoice no is required'],
    unique: true,
  },
  items: {
    type: [ItemsGroupSchema],
    required: [true, 'Items record is required'],
  },
  // this should be date of invoice
  date: {                                                 
    type: Date,
    required: [true, 'Date of Invoice is required'],
  },
  total: {
    type: Number,
    required: [true, 'Total amount of invoice is required']
  },
  desc: {
    type: String
  },
},{
  timestamps:true
})

const Invoices = models.Invoice || model('Invoice', InvoiceSchema)
export default Invoices
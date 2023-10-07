import { Schema, model, models } from 'mongoose'

enum AddressStatus {
  DEFAULT = 'default',
  ALTERNATIVE = 'alternative'
}

const AddressesSchema = new Schema({
  address: {
    type: String,
    require: [true, 'Address is required']
  },
  status: {
    type: String,
    enum: AddressStatus,
    require: [true, 'Address\'s status is required']
  }
})

const CustomerSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Customer\'s name is required']
  },
  address: {
    type: [AddressesSchema],
    require: [true, 'Customer\'s address is required']
  },
  account: {
    type: Schema.Types.ObjectId,
    default: null
  }
})

const Customers = models.Customer || model('Customer', CustomerSchema)
export default Customers

/**
 * account: for registered customer
 */
import { Schema, model, models } from 'mongoose';

const ProdSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Product name is required'],
  },
  images: {
    type: Array,
    required: [true, 'Product image is required at least 1 image']
  },
  price: {
    type: Schema.Types.ObjectId,
    ref:'PriceRecord'
  },
  desc: {
    type: String,
    required: [true, 'Product description is required'],
  },
  type: {
    type: String,
    default: 'product',
  },
  tags: {
    type: Array,
  },
  availability: {
    type: Boolean,
    required: [true, 'Product availability is required'],
  }
},{
  timestamps:true
})

const Products = models.Product || model('Product', ProdSchema)
export default Products
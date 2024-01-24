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
    type: Number,
    ref:'PriceRecord',
    required: [true, 'Product Price is required']
  },
  tags: {
    type: Array,
    default: ['general']
  },
  stock: {
    type:Number,
    default:0,
  },
  availability: {
    type: Boolean,
    required: [true, 'Product availability is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  }
},{
  timestamps:true
})

const Products = models.Product || model('Product', ProdSchema)
export default Products
import { Schema, model, models } from "mongoose";

const PriceRecordsSchema = new Schema(
  {
    product: {
      type: String,
      required: [true, "Product reference is required"],
    },
    price: {
      type: Number,
      required: [true, "Product reference is required"],
    }
  },
  {
    timestamps:true
  }
)

const PriceRecords = models.PriceRecord || model("PriceRecord", PriceRecordsSchema)
export default PriceRecords

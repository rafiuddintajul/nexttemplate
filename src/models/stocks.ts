import { Schema, model, models } from "mongoose";
import { Stock, } from "@/types";

export enum StockRecord {
  INVOICE = 'invoice', // items are in inventory
  RETURN = 'return', // items are in inventory
  ORDER = 'order', // items are reserved for order in inventory
  SHIPPING = 'shipping', // items are not in inventory or customer
  SOLD = 'sold', // items are not in inventory and with customer
  WRITEOFF = 'writeoff' // items are not in inventory and loss
}

const StockSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: [true, "Product ref is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product flow quantity is required"],
    },
    reference: {
      type: Schema.Types.ObjectId,
      required: [true, "Reference is required"],
    },
    recordType: {
      type: String,
      required: [true, "Record type of stockflow is required"],
      enum: StockRecord
    }
  },
  {
    timestamps:true,
    statics: {
      async flow(recordType: string, data: any) {
        try {
          const { _id, items, desc } = data;
          const record = items.map((item: Stock) => ({
            product: item.product,
            quantity: item.quantity,
            reference: _id,
            recordType,
            desc,
          }));
          const stockRecord = await this.create(record);
          return stockRecord
        } catch (error) {
          return error
        }
      }
    },
  }
)

const Stocks = models.Stock || model("Stock", StockSchema);
export default Stocks as any;

/* 
  this model records stock flow
  reference: Order no, Invoice no or WriteOff no
  recordtype: invoice(new arrive stock etc), return(product return), compltedOrder(completed order, shipped out etc), shipping(reserved for order etc), loss(damaged, warranty expense etc)
*/

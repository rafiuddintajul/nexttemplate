import { Schema, model, models } from "mongoose";

const ConfigurationSchema = new Schema(
  {
    name: String,
    data: Object,
  }
)

const Configs =  models.Config || model("Config", ConfigurationSchema);

// assertion to bypass typescript error static method could not be found
export default Configs

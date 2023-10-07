import mongoose from "mongoose";

let isConnected = false
const { MONGODB_URI } = process.env

if (!process.env.MONGODB_URI) {
  throw new Error('MongoDB URI does not exist')
}

export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (!isConnected) {
    try {

      const { connection } = await mongoose.connect(MONGODB_URI as string, {
        dbName:"shared_prompt" // Change this
      })

      // check if connection disconnect successfully
      if (connection.readyState === 1) {
        return Promise.resolve(true)
      }

      isConnected = true
      
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
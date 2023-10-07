import { connectDB } from '@/utils/database';
import User from '@/models/user';
import { genSaltSync, hashSync } from 'bcryptjs';

type ErrorType = Error & {
  [key:string]: any
}

export const POST = async (request: Request) => {
  const { username, password, email } = await request.json()

  try {
    if (!username || !password || !email) {
      const error:ErrorType = new Error("Missing some data")
      error.code = 400
      throw error
    }

    await connectDB() 
    // Username and Email existence handling
    const existedUsername = await User.findOne({ username: username })
    if (existedUsername) {
      const error:ErrorType = new Error("Username is already exists")
      error.code = 400
      throw error
    }
    const existedEmail = await User.findOne({ email: email })
    if (existedEmail) {
      const error:ErrorType = new Error("Email is already exists")
      error.code = 400
      throw error
    }
    // Password length handling
    if (password.length < 6) {
      const error:ErrorType = new Error("Password length should be at least 6 characters long")
      error.code = 400
      throw error
    }

    // Create user and return back the data with id and delete the password
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    let user = await User.create({ email: email, username: username, password: hash })
    user = user.toObject()
    delete user.password
    
    return new Response(JSON.stringify(user), { status: 201 })
  } catch (error:any) {
    return new Response(error, { status: error.code })
  }
}
// export default POST
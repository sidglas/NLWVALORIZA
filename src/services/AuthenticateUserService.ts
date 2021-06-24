import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
 

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService{
  async execute ({email, password } : IAuthenticateRequest){
    const userRepositories = getCustomRepository(UsersRepositories)

    const user = await userRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error("email/password incorrect")
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("email/password incorrect")
    }

    const token = sign(
      {
        email: user.email
      }, 
      "2c400209672b10fc2b6d992a8b323965", 
      { 
        subject: user.id,
        expiresIn: "1d",
      }
    )

      console.log('token ', token)
    return token;

  }

}

export { AuthenticateUserService}

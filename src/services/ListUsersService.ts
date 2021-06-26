import { getCustomRepository } from "typeorm"
import { classToPlain } from "class-transformer"
import { UsersRepositories } from "../repositories/UsersRepositories"

class ListUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories)

    //let tags = await tagsRepositories.find()
    //tags = tags.map((tag) => ({...tag, nameCustom: `#${tag.name}`}))
    const users  = await usersRepositories.find()
      
    return classToPlain(users)
  }
}

export { ListUsersService }
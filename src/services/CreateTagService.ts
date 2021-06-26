import { TagsRepositories } from "../repositories/TagsRepositories"
import  { getCustomRepository } from "typeorm"



class CreateTagService  {

  async execute(name : string) {
    if (!name) {
      throw new Error("Invalid Tag name")
    }

    //const usersRepository = new UsersRepositories(); substituído pois usamos repos customizados
    //por ser um custom repository 
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tagAlreadyExists =  await tagsRepository.findOne({
      name
    });

    console.log('Nome repassou', name)
    if ( tagAlreadyExists ) {
      throw new Error("Tag already exists")
    }
    
    const tag = tagsRepository.create({
      name
    })

    await tagsRepository.save(tag);
    return tag;
  }
}

export { CreateTagService }
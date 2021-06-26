import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import  { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id : string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService  {

  

  async execute({tag_id, user_sender, user_receiver, message} :IComplimentRequest) {

    console.log('na CreateComplimentService', user_sender, user_receiver)
    const usersRepositories = getCustomRepository(UsersRepositories)
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    
    if ( user_sender === user_receiver ) {
      throw new Error("Target receiver must bee different from logged one")
    }

    const userReceiverExists =  await usersRepositories.findOne(user_receiver);


    if ( !userReceiverExists ) {
      throw new Error("User receiver does not exist")
    }

    const compliment = complimentsRepository.create({
      
        tag_id ,
        user_sender,
        user_receiver,
        message,
      
    })

    await complimentsRepository.save(compliment);
    return compliment;
  }
}

export { CreateComplimentService }
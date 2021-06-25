import { Request, Response } from "express"
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {

  async handle(request: Request, response: Response){

    console.log('estou na CreateComplimentController')
    const { tag_id , user_sender, user_receiver,  message } = request.body;
    console.log('antes')
    const createComplimentService = new CreateComplimentService()
    console.log('depois', createComplimentService)
    const compliment = await createComplimentService.execute({ tag_id , user_sender, user_receiver,  message })
    console.log('compliment', compliment)
    return response.json(compliment)

  }

}

export { CreateComplimentController }
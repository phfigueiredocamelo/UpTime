import { Request, Response } from "express";
import { CriaGuerreiro } from "../../domain/useCases/CriaGuerreiro";

class GuerreirosController {

  public cria(req: Request, res: Response) {
    (new CriaGuerreiro)
    .handle({ "nome": req.body.nome, "sobrenome": req.body.sobrenome })
    .then(guerreiro => res.json(guerreiro))
  }

}

export const guerreirosController = new GuerreirosController();

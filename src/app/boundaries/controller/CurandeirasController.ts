import { Request, Response } from "express";
import { CriaCurandeira } from "../../domain/useCases/CriaCurandeira";
import { MostrarHorariosDisponiveis } from "../../domain/useCases/MostraHorariosDisponiveis";

class CurandeirasController {

  async cria(req: Request, res: Response) {
    return (new CriaCurandeira)
    .handle({
      "nome": req.body.nome,
      "sobrenome": req.body.sobrenome,
      "onlineEntre": [
        { "hora": req.body.onlineEntre.inicio.hora, "minuto": req.body.onlineEntre.inicio.minuto },
        { "hora": req.body.onlineEntre.fim.hora, "minuto": req.body.onlineEntre.fim.minuto }
      ]
    })
    .then(curandeira => res.json(curandeira))
  }

  async listaDisponibilidade(req: Request, res: Response) {
    if (req.query.data) {
      const data = new Date(Date.parse(req.query.data.toString()))

      return (new MostrarHorariosDisponiveis)
        .handle(req.params.curandeiraApelido, data)
        .then((lista) => res.json(lista))
    }
    return res.json({"error": { "message": "A data é obrigatória."}})
  }

}

export const curandeirasController = new CurandeirasController();

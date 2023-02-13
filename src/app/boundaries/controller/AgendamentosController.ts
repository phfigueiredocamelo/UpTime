import { Request, Response } from "express";
import { Periodo } from "../../domain/types";
import { AgendaDungeon } from "../../domain/useCases/AgendaDungeon";

class AgendamentosController {

  public cria(req: Request, res: Response) {
    const data = new Date(Date.parse(req.body.data));
    const periodo: Periodo = [
      { "hora": req.body.inicio.hora, "minuto": req.body.inicio.minuto },
      { "hora": req.body.fim.hora, "minuto": req.body.fim.minuto }
    ]
    ;(new AgendaDungeon)
    .handle(req.body.apelidoCurandeira, req.body.apelidoGuerreiro, [data, periodo] )
    .then(agendamento => res.json(agendamento))
  }

}

export const agendamentosController = new AgendamentosController();

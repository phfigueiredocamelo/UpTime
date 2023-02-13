import { Router } from "express";
import { agendamentosController } from "./app/boundaries/controller/AgendamentosController";
import { curandeirasController } from "./app/boundaries/controller/CurandeirasController";
import { guerreirosController } from "./app/boundaries/controller/GuerreirosController";

const router: Router = Router()

//Routes
router.post("/curandeiras", curandeirasController.cria);
router.get("/curandeiras/:curandeiraApelido/disponibilidades?:data", curandeirasController.listaDisponibilidade)
router.post("/guerreiros", guerreirosController.cria);
router.post("/agendamentos", agendamentosController.cria);

export { router };

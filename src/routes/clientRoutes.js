import { Router } from "express";
import {
  createClient,
  getStatistics,
  listClients,
  deleteClient,
  updateClient,
} from "../controllers/clientController.js";
import { validateClient } from "../middlewares/validateClient.js";

const router = Router();

router.post("/crear-cliente", validateClient, createClient);
router.get("/kpi-clientes", getStatistics);
router.get("/list-clientes", listClients);
router.put("/editar-cliente/:id", validateClient, updateClient);
router.delete("/eliminar-cliente/:id", deleteClient);

export default router;

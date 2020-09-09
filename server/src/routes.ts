import { Router } from "express";

import DevController from "./controllers/DevController";
import SearchController from "./controllers/SearchController";

const router = Router();

const devController = new DevController();
const searchController = new SearchController();

router.get("/devs", devController.index);
router.post("/devs", devController.store);

router.get("/search", searchController.index);

export default router;

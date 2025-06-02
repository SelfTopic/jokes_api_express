import { Router } from "express";
import { getRandomJoke } from "./joke";

const router = Router();

router.get("/", async (req, res) => {
    await getRandomJoke(req, res);
});
// router.post("/", createJoke);
// router.delete("/:id", deleteJoke);

export default router;
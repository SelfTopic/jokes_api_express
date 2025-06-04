import { Router } from "express";
import { getRandomJoke, createJoke } from "./joke";

const router = Router();

router.get("/", async (req, res) => {
    await getRandomJoke(req, res);
});
router.post("/", async (req, res) => {
    await createJoke(req, res);
});
// router.delete("/:id", deleteJoke);

export default router;
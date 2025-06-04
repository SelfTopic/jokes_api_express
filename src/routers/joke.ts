import { Request, Response } from "express";
import { JokeService } from "../services/joke";
import { initDatabase } from "../database";

export const getRandomJoke = async (req: Request, res: Response) => {
  try {
    const db = await initDatabase();
    const jokeService = new JokeService(db);

    const joke = await jokeService.getRundomJoke();
    
    
    if (!joke) {
      return res.status(404).json({ message: "No jokes found" });
    }
    
    res.json(joke);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching joke", error: error });
  }
};

const config = {
  ADMIN_KEY: "qwerty123"
}

export const createJoke = async (req: Request, res: Response) => {

  const { text, adminKey } = req.body;
  
  if (adminKey !== config.ADMIN_KEY) {
    return res.status(403).json({ message: "Invalid admin key" });
  }
  
  if (!text) {
    return res.status(400).json({ message: "Joke text is required" });
  }
  
  try {
    const db = await initDatabase();
    const jokesService = new JokeService(db);

    const newJoke = await jokesService.insertJoke(text);

    const status = {
      ok: true,
      joke: newJoke
    }
    
    if (!newJoke) {
      status.ok = false
    }

    res.status(201).json(newJoke);
  } catch (error) {
    res.status(500).json({ message: "Error creating joke", error });
  }
};

// export const deleteJoke = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { adminKey } = req.body;
  
//   if (adminKey !== config.ADMIN_KEY) {
//     return res.status(403).json({ message: "Invalid admin key" });
//   }
  
//   try {
//     const db = await initializeDb();
//     const joke = await db.get("SELECT * FROM jokes WHERE id = ?", id);
    
//     if (!joke) {
//       return res.status(404).json({ message: "Joke not found" });
//     }
    
//     await db.run("DELETE FROM jokes WHERE id = ?", id);
//     res.json({ message: "Joke deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting joke", error });
//   }
// };
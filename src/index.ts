import express from "express";
import router from "./routers/route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/jokes", router);

app.listen(3000, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

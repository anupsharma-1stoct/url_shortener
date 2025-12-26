import express, {Request, Response} from "express";
import {config} from "dotenv";
import urlAPI from "./apis/url"

config();

const app = express();
app.use(express.json());

app.use("/", urlAPI);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `The url '${req.path}' is inavild !`,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}!`);
});
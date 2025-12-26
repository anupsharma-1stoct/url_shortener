import {config} from "dotenv";
import {Router, Request, Response, NextFunction} from "express";
import { nanoid } from "nanoid";
import { prisma } from "../prisma/client";
import { AppError, CreateError, FetchError } from "../customErrorHandler";
import { getByShortCode, incrementClick } from "../services";
config();
const router = Router();

router.post("/create/sc", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {url} = req.body;
    
        if (!url || url.length <= 10) {
            return res.status(400).json({ message: "Invalid URL" });
        }

        const urlObj = await prisma.url.create({
            data: {
                original_url: url,
                short_code: nanoid(10)
            }
        });

        return res.status(200).json({"Short url": `${req.protocol}://${process.env.HOST}:${process.env.PORT}/${urlObj.short_code}`, short_code: urlObj.short_code});
    } catch (err:unknown) {
        const error = new CreateError("Error while creating!");
        return next(error);
    }
});

router.get("/:shortCode", async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const url = await getByShortCode(req.params.shortCode)
        if (!url) return res.status(404).json({ message: "Not found" });


        if (url==null) {
            const err = new FetchError("Shortcode not found!");
            return next(err);
        }

        await incrementClick(url.short_code);

        return res.redirect(302, url.original_url);

        // return res.status(200).json({message: "Succes", shortURL});
    } catch (err) {
        const error = new CreateError("Somthing went wrong!");
        return next(error);
    }    
});

router.get("/details/:shortCode", async (req: Request, res: Response)=>{
    const url = await getByShortCode(req.params.shortCode)
    if (!url) return res.status(404).json({ message: "Not found" });

    return res.status(200).json({
        details: url
    });
});

router.use((err:any, req:Request, res:Response, next:NextFunction)=>{
   return res.status(err.status || 500).json({ErrorMessage: err.message});
});

export default router;
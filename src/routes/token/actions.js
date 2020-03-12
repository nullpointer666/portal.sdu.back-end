import { Router } from "express";
import TokenService from "@/services/token";

const router = Router();

router.get("/validate", (req, res) => {
  console.log(TokenService.validate(req.cookies.token));
  res.status(200).end();
});

router.post("/generate", (req, res) => {
  res.status(200).send({
    token: TokenService.create(req.body.data)
  });
});

export default router;

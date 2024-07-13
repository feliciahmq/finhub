import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try{
    const kpis = await KPI.find(); // get from database
    res.status(200).json(kpis); // send to frontend

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

export default router;
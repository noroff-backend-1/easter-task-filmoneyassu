const express = require("express");
const router = express.Router();
const db = require("../models");
const EggsService = require("../services/EggsService");

const { authenticateJWT } = require("../middlewares/auth");


const eggsService = new EggsService(db);

router.get("/", async (req, res) => {
  const eggs = await eggsService.getAllEggs();
  res.json({ status: "Success", eggs });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const egg = await eggsService.getEggById(id);
    if (!egg) return res.status(404).json({ error: "Egg not found" });
    res.json(egg);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/",authenticateJWT, async (req, res) => {
  try {
    const newEgg = req.body;
    const createdEgg = await eggsService.createEgg(newEgg);
    res.status(201).json(createdEgg);
  } catch (error) {
    res.status(500).json({ error: "Failed to create egg" });
  }
});


router.put("/:id", authenticateJWT, async (req, res) => {
  const egg = await eggsService.updateEgg(req.params.id, req.body);
  if (!egg) return res.status(404).json({ status: "NOT_FOUND" });
  res.json(egg);
});

router.delete("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const deleted = await eggsService.deleteEgg(id);
  if (!deleted) return res.status(404).json({ status: "NOT_FOUND" });
  res.status(200).json({ status: "DELETED" });
});

module.exports = router;
// Rank Routes
// Rank Routes
import express from "express";
import {
    getAllRanks,
    getRankById,
    createRank,
    updateRank,
    deleteRank,
    updateMultipleRanksWithIcon1,
} from "../controllers/ranks.controller.js";


const router = express.Router();


// Define routes
router.get("/get-totalranks", getAllRanks);
router.get("/:id", getRankById);
router.post("/new-rank", createRank);
router.put("/:id/update-rank", updateRank);
router.put("/update-multiple-ranks-with-icon1", updateMultipleRanksWithIcon1);

router.delete("/:id", deleteRank);










export default router;
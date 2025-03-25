// Rank Controller
import Rank from "../models/ranks.model.js";

// Get all ranks
export const getAllRanks = async (req, res) => {
    try {
        const ranks = await Rank.find();
        res.status(200).json(ranks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get rank by ID
export const getRankById = async (req, res) => {
    try {
        const rank = await Rank.findById(req.params.id);
        if (!rank) return res.status(404).json({ message: "Rank not found" });
        res.status(200).json(rank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new rank
export const createRank = async (req, res) => {
    const rank = new Rank(req.body);
    try {
        const newRank = await rank.save();
        res.status(201).json(newRank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing rank
export const updateRank = async (req, res) => {
    try {
        const updatedRank = await Rank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRank) return res.status(404).json({ message: "Rank not found" });
        res.status(200).json(updatedRank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a rank
export const deleteRank = async (req, res) => {
    try {
        const deletedRank = await Rank.findByIdAndDelete(req.params.id);
        if (!deletedRank) return res.status(404).json({ message: "Rank not found" });
        res.status(200).json({ message: "Rank deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update multiple ranks with icon1
export const updateMultipleRanksWithIcon1 = async (req, res) => {
    try {
        const { ranks } = req.body; // Array of objects with _id and icon1 fields

        // Iterate through ranks and update each one
        const updatePromises = ranks.map(async (rank) => {
            return Rank.findByIdAndUpdate(rank._id, { icon1: rank.icon1 }, { new: true });
        });

        // Wait for all updates to finish
        const updatedRanks = await Promise.all(updatePromises);

        res.status(200).json(updatedRanks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

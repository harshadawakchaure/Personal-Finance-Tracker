const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// Add Expense
router.post("/", async (req, res) => {
  try {
    const { userId, name, amount, category } = req.body;
    const expense = await Expense.create({ userId, name, amount, category });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
});

// Get Expenses by User
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

// Delete Expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

// Update Expense
router.put("/:id", async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { name, amount, category },
      { new: true }
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(5000, () => console.log("Server running on port 5000"));

const ResultSchema = new mongoose.Schema({
  username: String,
  downloadSpeed: Number,
  uploadSpeed: Number,
  date: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", ResultSchema);

// Create
app.post("/results", async (req, res) => {
  const result = new Result(req.body);
  await result.save();
  res.send(result);
});

// Read
app.get("/results", async (req, res) => {
  const results = await Result.find();
  res.send(results);
});

// Update
app.put("/results/:id", async (req, res) => {
  const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// Delete
app.delete("/results/:id", async (req, res) => {
  await Result.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});

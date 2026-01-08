// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// router.post("/register", async (req, res) => {
//   const hashed = await bcrypt.hash(req.body.password, 10);
//   const newUser = new User({ ...req.body, password: hashed });
//   await newUser.save();
//   res.json({ message: "User registered" });
// });

// router.post("/login", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).json({ message: "Email not found" });

//   const valid = await bcrypt.compare(req.body.password, user.password);
//   if (!valid) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
//   res.json({ token, role: user.role, username: user.username });
// });

// module.exports = router;

import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();


// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    // cek username
    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username sudah digunakan",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // simpan user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Register berhasil",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    // cari user
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // cek password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password salah",
      });
    }

    res.json({
      success: true,

      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        avatarId: user.avatarId,
      },
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  
});

// Update avatar
router.put("/users/:id/avatar", async (req, res) => {
    try {
        const { avatarId } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { avatarId },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
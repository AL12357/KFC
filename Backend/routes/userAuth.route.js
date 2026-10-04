const { Router } = require("express");
const userDetails = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userAuthRouter = Router();

// SIGNUP
userAuthRouter.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (
      typeof firstname !== "string" ||
      typeof lastname !== "string" ||
      !firstname.trim() ||
      !lastname.trim() ||
      !normalizedEmail ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await userDetails.findOne({
      email: normalizedEmail,
    });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newPassword = await bcrypt.hash(password, 10);
    await userDetails.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: normalizedEmail,
      password: newPassword,
      token: "",
    });
    return res.status(201).json({ status: "OK" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("Signup failed:", err);
    return res.status(500).json({ error: "Unable to create account" });
  }
});

// LOGIN
userAuthRouter.post("/login", async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await userDetails.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
    user.token = token;
    await user.save();

    return res.json({ status: "OK", user: token });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ error: "Unable to log in" });
  }
});

// LOGOUT
userAuthRouter.post("/logout", async (req, res) => {
  try {
    const { token } = req.headers;
    const user = await userDetails.findOne({ token: token });
    console.log('user:', user)
    if (user) {
      user.token = "";
      await user.save();
      res.status(200).json({ message: "logout successfully" });
    } else {
      res.status(400).json({ error: "invalid token" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = userAuthRouter;

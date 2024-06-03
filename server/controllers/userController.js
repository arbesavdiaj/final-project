const database = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      const [existingUser] = await database.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return res
          .status(400)
          .json({ message: "Email address already exists." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [registerUser] = await database.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
      res
        .status(200)
        .json({ message: "Registration successful:", registerUser });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const [loginUser] = await database.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (loginUser.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const hashedPassword = loginUser[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ user: loginUser }, "secretKey", {
        expiresIn: "1h",
      });
      //console.log("new--login", loginUser);

      res.cookie("token", token, { httpOnly: true });
      res.json({
        message: "Login successful",
        status: 200,
        user: loginUser,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    res.json({ status: 200, message: "Logged out" });
  },

  getAuthUser: async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.cookies.token, "secretKey");
      const authUser = await database.query(
        "SELECT * FROM users WHERE id = ?",
        [decodedToken.user[0].id]
      );

      //res.cookie("lake-token", authUser[0], { httpOnly: true });
      res.json({
        status: 200,
        message: "Auth successful",
        user: authUser[0],
      });
    } catch (error) {
      res.json({
        status: 401,
        message: "you must be authorized",
        error: error,
      });
    }
  },
};
module.exports = auth;

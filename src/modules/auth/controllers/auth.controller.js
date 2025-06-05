const authService = require("../services/auth.service");

class AuthController {
  async signup(req, res) {
    try {
      console.log("signup route hit", req.body);
      await authService.register(req.body);
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      console.log(req.body);
      const token = await authService.login(req.body);
      res.status(200).json({ token, message: "User Logged in" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();

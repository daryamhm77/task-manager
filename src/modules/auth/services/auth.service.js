const User = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

class AuthService {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  }

  generateToken(user) {
    return jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  async register({ username, password }) {
    if (!username || !password)
      throw new Error("Username and password are required");

    const existing = await User.findOne({ username });
    if (existing) throw new Error("Username exists");

    const hashed = await this.hashPassword(password);
    const user = new User({ username, password: hashed });
    await user.save();
    return user;
  }

  async login({ username, password }) {
    if (!username || !password)
      throw new Error("Username and password are required");

    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return this.generateToken(user);
  }
}

module.exports = new AuthService();

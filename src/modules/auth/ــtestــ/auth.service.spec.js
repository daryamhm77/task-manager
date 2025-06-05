const authService = require("../services/auth.service");
const User = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../model/auth.model.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should create a new user if username not exists", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPass");
      User.prototype.save = jest.fn().mockResolvedValue();

      const result = await authService.register({
        username: "testuser",
        password: "123456",
      });

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(bcrypt.hash).toHaveBeenCalledWith("123456", "salt");
      expect(User.prototype.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("should throw error if username exists", async () => {
      User.findOne.mockResolvedValue({ username: "testuser" });
      await expect(
        authService.register({ username: "testuser", password: "123" }),
      ).rejects.toThrow("Username exists");
    });
  });

  describe("login", () => {
    it("should return token for valid credentials", async () => {
      const mockUser = { _id: "1", username: "testuser", password: "hashed" };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mocked-token");

      const token = await authService.login({
        username: "testuser",
        password: "123456",
      });

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed");
      expect(token).toBe("mocked-token");
    });

    it("should throw error if user not found", async () => {
      User.findOne.mockResolvedValue(null);
      await expect(
        authService.login({ username: "nouser", password: "123" }),
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw error if password does not match", async () => {
      User.findOne.mockResolvedValue({ username: "user", password: "hashed" });
      bcrypt.compare.mockResolvedValue(false);
      await expect(
        authService.login({ username: "user", password: "wrong" }),
      ).rejects.toThrow("Invalid credentials");
    });
  });
});

const express = require("express");
const {
  createUsers,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", createUsers);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/login", loginUser); // login routes

module.exports = router;

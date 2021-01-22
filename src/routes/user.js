const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/create",userController.register);
router.post("/login",userController.login);
router.post("/update",userController.update);

module.exports = router;
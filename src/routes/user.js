const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middleware/jwt");
const userController = require("../controller/userController");

router.post("/create",userController.register);
router.post("/login",userController.login);
router.post("/update",userController.update);
router.get("/get/:phone",jwtMiddleware.authenticate,userController.getuser);
router.get("/getall",jwtMiddleware.authenticate,userController.getalluser);

module.exports = router;
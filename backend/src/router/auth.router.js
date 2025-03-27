const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const upload = require("../fileUploads/file"); 
const authMiddleWare = require('../middleware/auth.middleware')

router.post("/register",upload.single('profileImage'), authController.register);
router.post("/login", authController.login);
router.get("/user", authMiddleWare, authController.getUser);
router.post("/validateToken", authController.validateToken);
router.put("/updateUser",authMiddleWare, upload.single('profileImage'), authController.updateUser);

module.exports = router;
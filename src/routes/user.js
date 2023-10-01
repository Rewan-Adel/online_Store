const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtr');
const authController = require('../controllers/authCtr');
const {verifyToken, isAdmin} = require('../util/token');

router.post("/signup", authController.signup);
router.post("/login",  authController.login );
router.get("/logout",  authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router
    .route("/reset-password/:id/:token")
    .patch(authController.resetPassword);

    
router.use(verifyToken);    
router
    .route("/:id")
    // .patch(userController.updateOne)
    .get(userController.getOne);


router.patch('/wishlist', userController.wishlist);

// @des Admin operations
router.use(isAdmin);    

router.get("/",                  userController.getAllUsers);
router.delete("/:id",            userController.DeleteOne);
router.get("/search/:key",       userController.searchUser);
router.patch("/:id/role?",       userController.role); 

module.exports = router;

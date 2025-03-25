import express from "express";
import { disableTwoFactorAuth ,createOrUpdateProfile ,searchUsers , getUserBySlug ,getUserById ,  enableTwoFactorAuth,getLoginAttempts , getUserVerificationStatus, getUser, updateVerificationStatus, deleteUser, updateCoverImage , updateUserProfile , getProfileState , updateProfileState , updateProfileImage  } from "../controllers/user.controller.js"; // Import the new controller functions
import { verifyToken } from "../middleware/jwt.js";
import { uploadSingle } from "../utils/multerConfig.js";



const router = express.Router();


router.get("/me", verifyToken, (req, res) => {
    const { _id, firstName, lastName, email, role } = req.user;
    res.status(200).json({ _id, firstName, lastName, email, role });
});

// Other user routes
router.delete("/:id", verifyToken, deleteUser);
router.get("/user", verifyToken, getUser);
router.get('/user/:userId', getUserById);
router.put("/:id/cover", verifyToken, uploadSingle , updateCoverImage);
router.put("/:id/profile-photo", verifyToken, uploadSingle , updateProfileImage);
router.put("/:id/profile", verifyToken , updateUserProfile);
router.get("/:id/profile-state", verifyToken, getProfileState);
router.put("/:id/profile-state", verifyToken, updateProfileState);
router.put('/:id/updateVerification', verifyToken , updateVerificationStatus);
router.get('/verification/status/:id', verifyToken, getUserVerificationStatus);
router.post("/enable-2fa",verifyToken , enableTwoFactorAuth);
router.post("/shut-2fa",verifyToken , disableTwoFactorAuth);
router.get("/:userId/login-attempts", verifyToken, getLoginAttempts);
router.get("/search", verifyToken , searchUsers);
router.post("/UserProfile", verifyToken , createOrUpdateProfile);

router.get("/slug/:slug", verifyToken , getUserBySlug); 







export default router;

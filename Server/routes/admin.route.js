import express from "express";
import { deleteUser ,
     getAllUsers ,
      updateAllUsersWithStatus,
      getPendingVerifications, 
      approveIDVerification, 
      rejectIDVerification ,
      uploadIdImages,
      getAllRequests,
      getAllGigsForAdmin,
      DeleteAGig,
      deleteOffer,
      getPaymentsByUserId,
      getTransactionsByUserId,
      getAllProjects,
      getAdminConversations,
      getConversationMessages,
      getUser,
     } 
      from "../controllers/admin.controller.js"; // Import the new controller functions
 import { uploadIDImages } from "../utils/multerConfig.js";
 import { verifyAdmin } from "../middleware/verifyAdmin.js";
 import { verifyToken } from "../middleware/jwt.js";







const router = express.Router();



// Other user routes
router.delete("/:id", verifyToken , verifyAdmin , deleteUser);
router.get("/users", verifyToken , verifyAdmin ,   getAllUsers); // Protect with middleware
router.put('/update-all-users-status', verifyAdmin , updateAllUsersWithStatus);


// ✅ New Routes for ID Verification Management
router.get('/allrequests', verifyToken , verifyAdmin ,  getAllRequests);
router.get('/gigs', verifyToken , verifyAdmin ,  getAllGigsForAdmin);
router.delete('/gigs/:id', verifyToken , verifyAdmin ,  DeleteAGig);
router.delete('/offer/:offerId', verifyToken , verifyAdmin ,  deleteOffer);
router.get("/verifications/pending",verifyToken , verifyAdmin , getPendingVerifications); // Get pending requests
router.put("/verifications/approve/:id", verifyToken ,verifyAdmin  ,approveIDVerification); // Approve ID
router.put("/verifications/reject/:id",verifyToken , verifyAdmin , rejectIDVerification); // Reject ID with comment
router.put('/verifications/upload',verifyToken ,  uploadIDImages , uploadIdImages);
router.get('/payment/:userId', verifyToken, verifyAdmin , getPaymentsByUserId);
router.get("/transactions/:userId", verifyToken, verifyAdmin, getTransactionsByUserId);
router.get("/projects",verifyToken ,verifyAdmin, getAllProjects); // Protect with admin verification
router.get("/conversations",verifyToken ,verifyAdmin, getAdminConversations); // Protect with admin verification
router.get("/conversations/:conversationId",verifyToken ,verifyAdmin, getConversationMessages); // Protect with admin verification
router.get("/user/:userId", verifyToken , verifyAdmin ,   getUser); // Protect with middleware










export default router;

const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getSwappableSlots,
  createSwapRequest,
  respondToSwap,
  getIncoming,
  getOutgoing
} = require("../controllers/swapController");

router.get("/swappable-slots", auth, getSwappableSlots);
router.post("/request", auth, createSwapRequest);
router.post("/response/:requestId", auth, respondToSwap);
router.get("/incoming", auth, getIncoming);
router.get("/outgoing", auth, getOutgoing);

module.exports = router;

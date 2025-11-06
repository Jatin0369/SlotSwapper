const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// Protect everything with auth
router.post("/", auth, createEvent);
router.get("/", auth, getMyEvents);
router.patch("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;

const Event = require("../models/Event");
const SwapRequest = require("../models/SwapRequest");

// GET all swappable slots (NOT mine)
exports.getSwappableSlots = async (req, res) => {
  try {
    const events = await Event.find({
      status: "SWAPPABLE",
      userId: { $ne: req.user.id },
    }).populate("userId", "name email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Create swap request
exports.createSwapRequest = async (req, res) => {
  try {
    const { mySlotId, theirSlotId } = req.body;

    if (!mySlotId || !theirSlotId) {
      return res.status(400).json({ msg: "Missing slot ids" });
    }

    const myEvent = await Event.findById(mySlotId);
    const theirEvent = await Event.findById(theirSlotId);

    if (!myEvent || !theirEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Must be mine
    if (myEvent.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "My slot is not owned by me" });
    }

    // Must NOT be mine
    if (theirEvent.userId.toString() === req.user.id) {
      return res.status(400).json({ msg: "Cannot swap with own event" });
    }

    // Must both be swappable
    if (myEvent.status !== "SWAPPABLE" || theirEvent.status !== "SWAPPABLE") {
      return res.status(400).json({ msg: "Slots not swappable" });
    }

    // Create request
    const swapRequest = await SwapRequest.create({
      fromUserId: req.user.id,
      toUserId: theirEvent.userId,
      mySlotId,
      theirSlotId,
    });

    // Lock events
    myEvent.status = "SWAP_PENDING";
    theirEvent.status = "SWAP_PENDING";
    await myEvent.save();
    await theirEvent.save();

    res.json(swapRequest);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


// Accept / Reject swap request
exports.respondToSwap = async (req, res) => {
  try {
    const { accept } = req.body;
    const { requestId } = req.params;

    const swapReq = await SwapRequest.findById(requestId);
    if (!swapReq) return res.status(404).json({ msg: "Swap request not found" });

    // Only target user can respond
    if (swapReq.toUserId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const myEvent = await Event.findById(swapReq.mySlotId);
    const theirEvent = await Event.findById(swapReq.theirSlotId);

    if (!myEvent || !theirEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }

    if (!accept) {
      // Rejected → revert status
      swapReq.status = "REJECTED";
      await swapReq.save();

      myEvent.status = "SWAPPABLE";
      theirEvent.status = "SWAPPABLE";
      await myEvent.save();
      await theirEvent.save();

      return res.json({ msg: "Swap rejected" });
    }

    // ACCEPTED → Swap owners
    swapReq.status = "ACCEPTED";
    await swapReq.save();

    const tempUser = myEvent.userId;
    myEvent.userId = theirEvent.userId;
    theirEvent.userId = tempUser;

    myEvent.status = "BUSY";
    theirEvent.status = "BUSY";

    await myEvent.save();
    await theirEvent.save();

    res.json({ msg: "Swap accepted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Incoming swap requests
exports.getIncoming = async (req, res) => {
  try {
    const incoming = await SwapRequest.find({ toUserId: req.user.id, status: "PENDING" })
      .populate("mySlotId")
      .populate("theirSlotId")
      .populate("fromUserId", "name email");

    res.json(incoming);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Outgoing requests
exports.getOutgoing = async (req, res) => {
  try {
    const outgoing = await SwapRequest.find({ fromUserId: req.user.id })
      .populate("mySlotId")
      .populate("theirSlotId")
      .populate("toUserId", "name email");

    res.json(outgoing);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

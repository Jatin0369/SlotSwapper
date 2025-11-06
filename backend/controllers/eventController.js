const Event = require("../models/Event");

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;

    if (!title || !startTime || !endTime) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const event = await Event.create({
      title,
      startTime,
      endTime,
      userId: req.user.id,
    });

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all my events
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id }).sort({ startTime: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update event (e.g. make swappable)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });

    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Only allow user to update
    Object.assign(event, req.body);
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!event) return res.status(404).json({ msg: "Event not found" });

    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

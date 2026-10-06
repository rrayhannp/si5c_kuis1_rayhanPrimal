const express = require("express");

const router = express.Router();

const eventController = require("../controllers/eventController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET /events
router.get("/", eventController.getEvents);

// GET /events/:id
router.get("/:id", eventController.getEventById);

// POST /events
router.post("/", cekApiKey, eventController.createEvent);

// PUT /events/:id
router.put("/:id", cekApiKey, eventController.updateEvent);

// DELETE /events/:id
router.delete("/:id", cekApiKey, eventController.deleteEvent);

module.exports = router;
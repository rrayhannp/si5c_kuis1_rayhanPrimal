const eventModel = require("../models/eventModel");

const validateEvent = (body) => {
  const {
    namaEvent,
    tanggal,
    kota,
    kuota,
  } = body;

  // Field wajib
  if (
    !namaEvent ||
    !tanggal ||
    !kota ||
    kuota === undefined
  ) {
    return "Field namaEvent, tanggal, kota, dan kuota wajib diisi";
  }

  return null;
};

// GET /events
const getEvents = (req, res) => {
  const { kota } = req.query;

  if (kota) {
    const events = eventModel.getEventsByKota(kota);

    return res.status(200).json(events);
  }

  const events = eventModel.getAllEvents();

  res.status(200).json(events);
};

// GET /events/:id
const getEventById = (req, res) => {
  const id = parseInt(req.params.id);

  const event = eventModel.getEventById(id);

  if (!event) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(event);
};

// POST /events
const createEvent = (req, res) => {
  const validationError = validateEvent(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const newEvent = eventModel.createEvent({
    namaEvent: req.body.namaEvent,
    tanggal: req.body.tanggal,
    kota: req.body.kota,
    kuota: req.body.kuota,
    hargaTiket: req.body.hargaTiket,
  });

  res.status(201).json({
    status: "success",
    message: "Data event berhasil ditambahkan",
    data: newEvent,
  });
};

// PUT /events/:id
const updateEvent = (req, res) => {
  const id = parseInt(req.params.id);

  const existingEvent = eventModel.getEventById(id);

  if (!existingEvent) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const validationError = validateEvent(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const updatedEvent = eventModel.updateEvent(id, {
    namaEvent: req.body.namaEvent,
    tanggal: req.body.tanggal,
    kota: req.body.kota,
    kuota: req.body.kuota,
    hargaTiket: req.body.hargaTiket,
  });

  res.status(200).json({
    status: "success",
    message: `Data event dengan id ${id} berhasil diubah`,
    data: updatedEvent,
  });
};

// DELETE /events/:id
const deleteEvent = (req, res) => {
  const id = parseInt(req.params.id);

  const existingEvent = eventModel.getEventById(id);

  if (!existingEvent) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  eventModel.deleteEvent(id);

  // Dipertahankan 200 agar perilaku API tetap sama
  // seperti Tugas 1
  res.status(200).json({
    status: "success",
    message: `Data event dengan id ${id} berhasil dihapus`,
    data: null,
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
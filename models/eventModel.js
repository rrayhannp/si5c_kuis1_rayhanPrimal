let events = [
  {
    id: 1,
    namaEvent: "Seminar Nasional Teknologi Web",
    tanggal: "2026-11-14",
    kota: "Yogyakarta",
    kuota: 300,
    hargaTiket: 50000,
  },
  {
    id: 2,
    namaEvent: "Workshop Pemrograman Web",
    tanggal: "2026-12-05",
    kota: "Palembang",
    kuota: 100,
    hargaTiket: 75000,
  },
  {
    id: 3,
    namaEvent: "Tech Meetup Indonesia",
    tanggal: "2026-12-20",
    kota: "Jakarta",
    kuota: 200,
    hargaTiket: 100000,
  },
];

let nextId = 4;

// Mengambil seluruh data event
const getAllEvents = () => {
  return events;
};

// Mengambil satu event berdasarkan ID
const getEventById = (id) => {
  return events.find((event) => event.id === id);
};

// Mengambil event berdasarkan kota
const getEventsByKota = (kota) => {
  return events.filter(
    (event) => event.kota.toLowerCase() === kota.toLowerCase()
  );
};

// Menambahkan event
const createEvent = (eventData) => {
  const newEvent = {
    id: nextId++,
    ...eventData,
  };

  events.push(newEvent);

  return newEvent;
};

// Mengubah event
const updateEvent = (id, eventData) => {
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return null;
  }

  const updatedEvent = {
    id,
    ...eventData,
  };

  events[index] = updatedEvent;

  return updatedEvent;
};

// Menghapus event
const deleteEvent = (id) => {
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return false;
  }

  events.splice(index, 1);

  return true;
};

module.exports = {
  getAllEvents,
  getEventById,
  getEventsByKota,
  createEvent,
  updateEvent,
  deleteEvent,
};
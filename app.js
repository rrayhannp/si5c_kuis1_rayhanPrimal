const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const logger = require("./middlewares/logger");
const eventRoutes = require("./routes/eventRoutes");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandler");

// Membaca .env
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware umum
app.use(cors());
app.use(logger);
app.use(express.json());

// Informasi API
app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Rayhan Primal",
    topik: 10,
    topikNama: "Manajemen Acara - Event",
    resource: "/events",
    endpoints: [
      "GET /events",
      "GET /events/:id",
      "GET /events?kota=Yogyakarta",
      "POST /events",
      "PUT /events/:id",
      "DELETE /events/:id",
    ],
  });
});

// Route utama
app.use("/events", eventRoutes);

// 404 untuk route yang tidak ditemukan
app.use(notFoundHandler);

// Error handler terpusat
app.use(errorHandler);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
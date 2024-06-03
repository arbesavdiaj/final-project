const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/userRoutes");
const lakeRoute = require("./routes/lakeRoutes");
const reservationRoute = require("./routes/reservationsRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/lakes", lakeRoute);
app.use("/reservations", reservationRoute);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

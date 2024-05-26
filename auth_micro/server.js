import express from "express";
import "dotenv/config.js";
import cors from "cors";
import Routes from "./routes/index.js";
const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({
    messages: "Welcome to Auth",
  });
});

app.use(Routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

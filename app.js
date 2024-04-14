const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const recipeRouter = require("./routes/recipeRouter");
const roleRouter = require("./routes/roleRouter");
const ratingRouter = require("./routes/ratingRouter");

const app = express();

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/role", roleRouter);
app.use("/rating", ratingRouter);

app.get("/", (req, res) => {
    res.send("Hola Mundo!");
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

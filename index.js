const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/cats", (req, res) => {
    const cats = ["Blue", "Miaui", "Tony", "Purrboy"];
    res.render("cats", { cats });
});

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render("subreddit", { ...data });
    } else {
        res.render("notfound", { subreddit });
    }
});

app.get("/random", (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    const isEven = rand % 2 === 0;
    res.render("random", { rand, isEven });
});

// app.get("/pomodoro", (req, res) => {
//     let minutesLeft = 25;
//     let secondsLeft = "0" + ((25 * 60) % 60);
//     const pomodoro = () => {
//         const start = Date.now();
//         const end = start + 25 * 60 * 1000;
//         const interval = setInterval(() => {
//             const now = Date.now();
//             if (now >= end) {
//                 clearInterval(interval);
//                 console.log("end");
//             } else {
//                 secondsLeft = Math.round((end - now) / 1000);
//                 minutesLeft = Math.floor(secondsLeft / 60);
//             }
//         }, 1000);
//     };
//     res.render("pomodoro", { pomodoro, secondsLeft, minutesLeft });
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

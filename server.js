const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// 🔥 DÁN LINK GOOGLE SCRIPT CỦA BẠN VÀO ĐÂY
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzI2XlMPPK_gCHux3nr61xgewKkTWOKUy2_95goh-4EAqmsXv9kDas10RSrSJqw3BIR/exec";

app.get("/", (req, res) => {
    res.send("Webhook is running!");
});

app.post("/webhook", async (req, res) => {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

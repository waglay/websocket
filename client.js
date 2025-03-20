import express from "express";
import path from "path";

const app = express();
const PORT = 5000; // Serve index.html on this port

// ✅ Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Start Express server
app.listen(PORT, () => {
    console.log(`🌍 Page server running at: http://localhost:${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
// Middleware
app.use(express_1.default.json());
// Connect to database
(0, database_1.connectDB)();
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker API is running', apiBaseUrl });
});
app.get('/api/users', (req, res) => {
    res.json({ data: [] });
});
app.get('/api/activities', (req, res) => {
    res.json({ data: [] });
});
// Start server
app.listen(PORT, () => {
    console.log(`OctoFit Tracker API listening on port ${PORT}`);
    console.log(`Base URL: ${apiBaseUrl}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
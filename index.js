const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require('fs');

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies

// HTML endpoint to display user names
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// REST API endpoint to get all users
app.get("/api/users", (req, res) => {
    return res.json(users);
});

// REST API endpoint to handle specific user operations
app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        console.log(`Received PATCH request for user ID: ${id} with data:`, body); // Log request details
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        users[userIndex] = { ...users[userIndex], ...body };

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to update data" });
            }
            return res.json({ status: "success", user: users[userIndex] });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        console.log(`Received DELETE request for user ID: ${id}`); // Log request details

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        users.splice(userIndex, 1);

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to delete user" });
            }
            return res.json({ status: "success" });
        });
    });

// POST endpoint to create a new user
app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(`Received POST request with data:`, body); // Log request details
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to save data" });
        }
        return res.json({ status: "success", id: users.length });
    });
});

const PORT = 8002;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

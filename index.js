const PORT = 3000;
const express = require("express");

const app = express();

//project_name->0 // under maintenance
//project_name->1 // online
//key-value pair
const projectsStatus = new Map();

app.get("/project-status/:name", (req, res) => {
    const projectName = req.params.name.toLowerCase();
    const status = projectsStatus.get(projectName);
    if (status === undefined) {
        return res.status(404).json({ error: "Project not found" });
    }
    res.json({ status });

});

app.post("/project-status/:name", (req, res) => {
    const projectName = req.params.name.toLowerCase();
    const status = req.body.status;
    projectsStatus.set(projectName, status);
    res.json({ status });
});
app.get('/projects', (req, res) => {
    res.send(JSON.stringify(projectsStatus));
})

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
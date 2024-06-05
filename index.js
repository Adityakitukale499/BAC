const express = require('express');
const Client = require('./routes/Client')
const Document = require('./routes/Document')
const Employees = require('./routes/Employees')
const Expense = require('./routes/Expense')
const FrontRoute = require('./routes/FrontRoute')
const Project = require('./routes/Project')

// Create an Express application
const app = express();

const mongoose = require('mongoose');

main().then(() => console.log('conected')).catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://adityakitukale4599:aditya4599@cluster0.8ekoj3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

app.use(express.json());

app.use('/', FrontRoute);
app.use('/api/clients', Client);
app.use('/api/attachments', Document);
app.use('/api/employees', Employees);
app.use('/api/expenses', Expense);
app.use('/api/projects', Project);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
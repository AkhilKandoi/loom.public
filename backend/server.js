import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import User from './models/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors'
import UserEntries from './models/userEntries.js';
dotenv.config({ path: './backend/.env' });

const uri = process.env.MONGODB_URI

mongoose.connect(uri)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.error('mongodb connection failed: ', err))

const app = express();
const PORT = process.env.PORT || 5191;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5191'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));


//signin

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'))
})
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: 'invalid info' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'invalid password' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(200).json({ token, username: req.username })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//signup
app.get('/signup', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'signup.html'))
})
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' })

        const hashedPass = await bcrypt.hash(password, 10)

        const user = new User({ username, password: hashedPass })
        await user.save()

        res.status(200).json({ message: 'user registered successfully' })
    } catch (err) {
        console.log("error", err.message)
        res.status(500).json({ message: err.message })
    }
})

app.get('/loom', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'loom.html'))
})
app.post('/loom', async (req, res) => {
    try {

        const { username, fontStyle, fontSize, pageColor, fontColor, backgroundColor, entry, createdAt } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User doesnt exist' })

        const Entry = new UserEntries({ username, fontStyle, fontSize, pageColor, fontColor, backgroundColor, entry, createdAt })

        await Entry.save()

        res.status(200).json({ message: "Saved successfully" })
    } catch (err) {
        console.log("error:", err.message)
        res.status(500).json({ message: err.message })
    }
})

app.post('/data', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await UserEntries.findOne({ username })
        if (!user) return res.status(200).json({ message: 'user dont exists' })
        res.status(200).json({ message: 'user exists' })
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

app.post('/entries', async (req, res) => {
    const { username } = req.body

    try {
        const entries = await UserEntries.find({ username }).sort({ createdAt: 1 })
        if (entries) {
            res.status(200).json({ entries })
        }
        else {
            res.status(400).json({message: 'no entries found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
})

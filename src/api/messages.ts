import express from 'express';
const router = express.Router();

const messages: string[] = [];


router.get('/', (req, res) => {
    res.json(messages);
});

router.post('/', (req, res) => {
    const message = req.body;
    messages.push(message);
    res.json(message);
});

export default router;

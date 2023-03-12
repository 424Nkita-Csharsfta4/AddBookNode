const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Разбор тела запроса в формате JSON
app.use(bodyParser.json());

// Массив событий
let events = [
    {
        id: 1,
        title: 'Событие 1',
        date: '2022-03-01T10:00',
        description: 'Описание события 1'
    },
    {
        id: 2,
        title: 'Событие 2',
        date: '2022-03-02T14:00',
        description: 'Описание события 2'
    },
    {
        id: 3,
        title: 'Событие 3',
        date: '2022-03-05T18:30',
        description: 'Описание события 3'
    }
];

// Получение списка всех событий
app.get('/api/events', (req, res) => {
    res.json(events);
});

// Получение события по id
app.get('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send('Событие не найдено');
    } else {
        res.json(event);
    }
});

// Добавление нового события
app.post('/api/events', (req, res) => {
    const event = {
        id: events.length + 1,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description
    };
    events.push(event);
    res.json(event);
});

// Редактирование существующего события
app.put('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send('Событие не найдено');
    } else {
        event.title = req.body.title;
        event.date = req.body.date;
        event.description = req.body.description;
        res.json(event);
    }
});

// Удаление события
app.delete('/api/events/:id', (req, res) => {
    const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
    if (eventIndex === -1) {
        res.status(404).send('Событие не найдено');
    } else {
        events.splice(eventIndex, 1);
        res.sendStatus(204);
    }
});

// Запуск сервера
app.listen(5174, () => {
    console.log('Сервер запущен на порту 5174');
});

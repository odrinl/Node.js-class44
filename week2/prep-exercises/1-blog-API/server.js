const express = require('express');
const app = express();
const fs = require('fs');
// Middleware to parse JSON data in the request body
app.use(express.json());

// POST route
app.post('/blogs', function (req, res) {
  const title = req.body.title; // JSON data parsed by express.json()
  const content = req.body.content; // JSON data parsed by express.json()
  fs.writeFileSync(title, content);
  res.end('ok');
});

app.put('/posts/:title', (req, res) => {
  const title = req.body.title; // JSON data parsed by express.json()
  const content = req.body.content; // JSON data parsed by express.json()
  // What if the request does not have a title and/or content?
  if (!title || !content) {
    res.status(400).end('Your request have to have title and content!');
    return;
  }
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title; // Retrieve the title parameter from URL
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title; // Retrieve the title parameter from URL
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    // send response
    res.send(post);
  } else {
    res.status(404).send('This post does not exist!');
  }
})

app.get('/blogs', (req, res) => {
  const directoryPath = 'D:/Documents/GitHub/NodeJS/Node.js-class44/Node.js-class44/week2/prep-exercises/1-blog-API'; // Replace with your directory path

  try {
      const files = fs.readdirSync(directoryPath);
      res.json(files.map(file => ({ title: file }))); // Respond with the array of titles
  } catch (error) {
      console.error('An error occurred while reading the directory:', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);

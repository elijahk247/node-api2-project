// all CRUD operations in this file will be extensions of /api/posts
const express = require('express');    // using an express router
const Posts = require('../data/db.js');   // the database that we will be using

const router = express();

// GET request /api/posts
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'The posts information could not be retrieved' });
    })
})

// GET request /api/posts/:id
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(post == 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist'});
      } else {
        res.status(200).json({ message: 'The requested post: ', request: post });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post information could not be retrieved' });
    })
})

// GET request /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(post != 0) {
        res.status(200).json({ comment: post})
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post information could not be retrieved' });
    })
})


module.exports = router;

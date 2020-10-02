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
  Posts.findPostComments(req.params.id)
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

//POST request /api/posts
router.post('/', (req, res) => {
  if(!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: 'Please provide the title and contents for the post' });
  }

  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error while saving the post to the server' });
    })
})

// POST request /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(post != 0) {
        Posts.insertComment(req.body)
          .then(post => {
            if(req.body,text !== undefined) {
              res.status(201).json({ post });
            } else {
              res.status(400).json({ errorMessage: 'Please provide text for the comment' })
            }
          })
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist '})
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error while saving the comment to the database'})
    })
})

// DELETE request /api/posts
router.delete('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      const deletedPost = post;
      if(post != 0) {
        Posts.remove(req.params.id)
          .then(post => {
            res.status(200).json({ deletedPost })
          })
      } else {
        res.status(404).json({ message: 'The post with the specified ID could not be found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed'})
    })
})

// PUT request /api/posts/:id
router.put('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(post != 0) {
        Posts.update(req.params.id)
          .then(post => {
            if(!res.body.title || !res.body.contents) {
              res.status(400).json({ errorMessage: 'Please provide title and contents to the post' });
            } else {
              res.status(200).json(post);
            }
          })
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'The post information could not be modified' });
    })
})


module.exports = router;

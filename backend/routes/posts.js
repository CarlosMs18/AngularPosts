const express = require('express')
const Post = require('../models/post')
const router = express.Router();

router.post("", (req, res , next) => {
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message : 'Post added successfed',
      postId : createdPost._id
    })
  });


})

router.put('/:id',(req, res , next) => {
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    content : req.body.connect
  });
  Post.updateOne({_id : req.params.id}, post )
          .then(result => {
            console.log(result)
            res.status(200).json({message : 'Updated successfull'})
          })
})



router.get('',(req, res , next) => {

Post.find().then(documents => {
  return res.status(200).json({
    message : 'Post Fetchec succesfelyy!',
    posts : documents
  })
})



})


router.delete("/:id",(req, res , next) => {
Post.deleteOne({_id : req.params.id}).then(result => {
  console.log(req.params.id)
  res.status(200).json({message : 'post deleted!'})
})

})
/* app.use((req, res , next) => {
res.send('midlewareeee!')
})
*/
module.exports = router;

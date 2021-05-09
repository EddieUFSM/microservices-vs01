const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

posts === {
    'keyi123': {
        id: 'keyi123',
        title: 'Post Title',
        comments: [{ id: 'keyi123', content: "Comment Content" }]
    },
    'keyi123': {
        id: 'keyi123',
        title: 'Post Title',
        comments: [{ id: 'keyi123', content: "Comment Content" }]
    },
    'keyi123': {
        id: 'keyi123',
        title: 'Post Title',
        comments: [{ id: 'keyi123', content: "Comment Content" }]
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body

    console.log(type)

    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: [] }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data

        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })

        comment.content = content
        comment.status = status
    }

    res.send({})
})

app.listen(4002, () => {
    console.log('Listening on 4002')
})
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const {News, User, Following} = require('../../db/models');
const upload = require('../middlewares/file');


router.get('/', async (req, res) => {
    try {
        const data = await News.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName'],
                },
            ],
        });
        const formattedData = data.map((item) => ({
            id: item.id,
            userId: item.userId,
            text: item.newsText,
            photo: item.photoPath,
            date: item.createdAt.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            firstName: item.User.firstName,
            lastName: item.User.lastName,
        }));
        res.json({status: 200, data: formattedData});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 500, message: 'Internal server error'});
    }
});

router.post('/new', upload.single('photo'), async (req, res) => {
    const id = req.session.user.id;
    const { text } = req.body;
    const photo = req.file.filename;
    try {
        const photoPath =`/photos/${photo}`;
        const user = (await News.create({ userId: id, newsText: text, photoPath: photoPath })).get({ plain: true });
        console.log(user);
        res.json({ status: 200 }); // Send the image URL in the response
    } catch (error) {
        res.send(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    const postId = req.params.id;
    await News.destroy({where: {id: postId}});
    res.end()
})

router.get('/mysubscriptions', async (req, res) => {
    const user = req.session.user.id;
    try {
        const followsTo = await Following.findAll({ where: { follower: user } });
        const users = followsTo.map((item) => item.followsTo);
        const posts = [];
        for (let i = 0; i < users.length; i++) {
            const userName = await User.findOne({ where: { id: users[i] } });
            const userObjects = {
                userId: userName.dataValues.id,
                firstName: userName.dataValues.firstName,
                lastName: userName.dataValues.lastName,
            };
            const userPosts = await News.findAll({ where: { userId: users[i] } });
            const postObjects = userPosts.map((post) => ({
                postId: post.dataValues.id,
                text: post.dataValues.newsText,
                date: new Date(post.dataValues.createdAt),
            }));
            posts.push({ ...userObjects, posts: postObjects });
        }
        posts.sort((a, b) => b.posts[0].date - a.posts[0].date);
        const formattedPosts = posts.map((post) => ({
            ...post,
            posts: post.posts.map((p) => ({
                postId: p.postId,
                text: p.text,
                date: p.date.toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            })),
        }));
        res.json({ status: 200, data: formattedPosts });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;

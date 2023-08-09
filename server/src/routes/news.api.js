const router = require('express').Router();

const {News, User, Following} = require('../../db/models');
const upload = require('../middlewares/file');


router.get('/', async (req, res) => {
    try {
        const data = await News.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'avatar'],
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
            avatar: item.User.avatar,
        }));
        console.log(formattedData)
        res.json({status: 200, data: formattedData});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 500, message: 'Internal server error'});
    }
});

router.post('/new', upload.single('photo'), async (req, res) => {
    const id = req.session.user.id;
    const { text } = req.body;
    const photo = req.file ? req.file.filename : null;
    try {
        const photoPath = photo ? `/photos/${photo}` : null;
        const user = (await News.create({ userId: id, newsText: text, photoPath: photoPath })).get({ plain: true });
        console.log(user);
        res.json({ status: 200 });
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

            const userPosts = await News.findAll({ where: { userId: users[i] } });

            for (const post of userPosts) {
                const postObject = {
                    userId: userName.dataValues.id,
                    firstName: userName.dataValues.firstName,
                    lastName: userName.dataValues.lastName,
                    avatar: userName.dataValues.avatar,
                    postId: post.dataValues.id,
                    text: post.dataValues.newsText,
                    date: new Date(post.dataValues.createdAt).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                };
                posts.push(postObject);
            }
        }

        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(posts)
        res.json({ status: 200, data: posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});



module.exports = router;

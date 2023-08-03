const router = require('express').Router();

const {News, User} = require('../../db/models');

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

router.post('/new', async (req, res) => {
    const id = req.session.user.id;
    const { text } = req.body;
    console.log(id)
    try {
        const user = (await News.create({ userId: id, newsText: text })).get({ plain: true });
        console.log(user)
        res.json({status: 200});

    } catch (error) {
        res.send(error);
    }
})

router.delete('/delete/:id', async (req, res) => {
    const postId = req.params.id;
    await News.destroy({where: {id: postId}});
    res.end()
})

module.exports = router;

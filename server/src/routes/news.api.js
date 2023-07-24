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
        res.json({ status: 200, data: formattedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});


module.exports = router;

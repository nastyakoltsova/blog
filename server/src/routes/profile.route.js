const router = require('express').Router();
const {News, User} = require("../../db/models");
const upload = require('../middlewares/file');
router.get('/:id/posts', async (req, res) => {
    // console.log(req.session.user)
    try {
        const data = await News.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'avatar'],
                },
            ],
            where: { userId: req.params.id }
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
        res.json({ status: 200, data: formattedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

router.get('/:id/user', async (req, res) => {
    try {
        const data = await User.findOne({
            where: { id: req.params.id }
        });
        const isUser = (req.session.user.id === Number(req.params.id));
        const formattedData = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            avatar: data.avatar,
            isUser,
        };
        res.json({ status: 200, formattedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

router.get('/current_user', async (req, res) => {
    const userId = req.session.user.id;
    res.json({status: 200, userId});
})

router.patch('/edit', async (req, res) => {
    const {firstName, lastName, email} = req.body;
    console.log(req.body)
    const user = await User.findOne({
        where: { id: req.session.user.id },
    });
    try {
        if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }
        await User.update({ firstName, lastName, email }, { where: { id: user.id } });
        res.json({ message: 'User updated' });
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.patch('/changeAvatar', upload.single('avatar'), async (req, res) => {
    const user = req.session.user;
    if (!req.file) {
        return res.status(400).json({ error: 'No avatar file provided' });
    }
    const avatar = req.file.filename;
    try {
        await User.update({ avatar: `/photos/${avatar}` }, { where: { id: user.id } });
        res.json({ message: 'User updated', newAvatar: avatar });
    } catch (error) {
        console.error('Ошибка при обновлении аватара:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;

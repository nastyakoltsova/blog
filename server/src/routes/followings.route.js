const router = require('express').Router();
const {Following, User, News} = require('../../db/models');

router.get('/list/subscriptions/:id', async (req, res) => {
    const followerId = req.params.id;
    try {
        const followsTo = await Following.findAll({ where: { follower: followerId } });
        const users = [];
        for (let i = 0; i < followsTo.length; i++) {
            const userName = await User.findOne({ where: { id: followsTo[i].followsTo } });
            const userObjects = {
                userId: userName.dataValues.id,
                firstName: userName.dataValues.firstName,
                lastName: userName.dataValues.lastName,
                avatar: userName.dataValues.avatar,
            };
            users.push({ ...userObjects });
        }
        res.json({status: 200, users})
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/list/subscribers/:id', async (req, res) => {
    const followerId = req.params.id;
    try {
        const followers = await Following.findAll({ where: { followsTo: followerId } });
        const users = [];
        for (let i = 0; i < followers.length; i++) {
            const userName = await User.findOne({ where: { id: followers[i].follower } });
            const userObjects = {
                userId: userName.dataValues.id,
                firstName: userName.dataValues.firstName,
                lastName: userName.dataValues.lastName,
                avatar: userName.dataValues.avatar,
            };
            users.push({ ...userObjects });
        }
        res.json({status: 200, users})
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    const followerId = req.session.user.id;
    const id = req.params.id;
    try {
        const isFollow = (await Following.findOne({where: {follower: followerId, followsTo: id}}));
        const followersNum = (await Following.findAll({where: {followsTo: id}})).length;
        const followsToNum = (await Following.findAll({where: {follower: id}})).length;
        if (isFollow) {
            res.json({isFollow: true, followersNum, followsToNum})
        } else {
            res.json({isFollow: false, followersNum, followsToNum})
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/subscribe', async (req, res) => {
    const followerId = req.session.user.id;
    const { followsToId } = req.body;
    try {
        const following = (await Following.create({follower: followerId, followsTo: followsToId})).get({ plain: true });
        console.log(following);
        res.json({status: 200});
    }
    catch (error) {
        console.log(error);
    }
})

router.delete('/unsubscribe', async (req, res) => {
    const followerId = req.session.user.id;
    const { followsToId } = req.body;
    try {
        await Following.destroy({where: {follower: followerId, followsTo: followsToId}});
        res.json({status: 200});
        res.end()
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = router;

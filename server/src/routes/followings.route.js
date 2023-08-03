const router = require('express').Router();
const {Following} = require('../../db/models');

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

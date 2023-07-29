const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const {logger} = require("sequelize/lib/utils/logger");

router.post('/new', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body)
  try {
    const userCheck = await User.findOne({ where: { email } });
    if (!userCheck) {
      const hashPass = await bcrypt.hash(password, 10);
      const user = (await User.create({ firstName, lastName, email, password: hashPass })).get({ plain: true });
      req.session.user = user;
      res.json({ status: 201, id: user.id, firstName: user.firstName });
    } else {
      res.json({ status: 403 });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await User.findOne({ where: { email } });
    if (data) {
      const user = data.get({ plain: true });
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        req.session.user = user;
        res.json({ id: user.id, email: user.email, status: 200 });
      } else {
        res.json({ status: 403 });
      }
    } else {
      res.json({ status: 403 });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else {
      res.clearCookie('UserAuth');
      res.json({ status: 200 });
    }
  });
});

// router.post('/logout', (req, res) => {
//   req.session.destroy((e) => {
//     if (e) {
//       console.log(e);
//       return;
//     }
//     res.clearCookie('UserAuth');
//     res.redirect('/');
//   });
// });
module.exports = router;


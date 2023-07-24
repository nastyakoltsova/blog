const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

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
  console.log(req.body)

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.json({status: 401});
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.json({status: 401});
  }
  req.session.user = user;
  res.json({status: 200, email, id: user.id});
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


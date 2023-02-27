var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/user',(req,res) => {
  session = req.session;
  res.status(200).json({ user:  req.session.email, isSuccess: true });
});

router.post('/logout',(req,res) => {
  req.session.destroy();
  res.status(200).json({ message:  "User logged out", isSuccess: true});
});

module.exports = router;

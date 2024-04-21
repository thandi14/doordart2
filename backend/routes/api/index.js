const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const resturantsRouter = require('./restaurants.js');
const itemsRouter = require('./items.js');
const reviewsRouter = require('./reviews.js');
const cartsRouter = require('./shoppingcarts.js');

const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/restaurants', resturantsRouter);

router.use('/items', itemsRouter);

router.use('/reviews', reviewsRouter);

router.use('/shoppingcarts', cartsRouter);



router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
    return res.json(req.user);
    }
);

module.exports = router;

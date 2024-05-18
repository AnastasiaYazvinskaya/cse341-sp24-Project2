const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Info page']
    res.send('This is your shopping cart. Add /cart to the link to see the list. Or add /api-docs to see possible actions.');
});

router.use('/cart', require('./cart'));

module.exports = router;
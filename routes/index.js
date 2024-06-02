const router = require('express').Router();
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};
router.use(auth(config));
router.get('/checkLoginStatus', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Info page']
    res.send(`It is a workout and nutrition tracking app that will help users track their fitness progress and maintain a healthy lifestyle.
            <br>Add /api-docs to the link to go to the list of possible actions.
            <br>Add /users to the link to go to the list of users.
            <br>Add /workouts to the link to go to the list of workouts.
            <br>Add /meals to the link to go to the list of meals.`);
});

router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/meals', require('./meals'));

module.exports = router;
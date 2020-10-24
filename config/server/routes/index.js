/* James Kuzhilaparambil Id:301119040  date 10/09/2020 */

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact me page. */
router.get('/contact', indexController.displayContactPage);
// Get route for display Login page 
router.get('/login', indexController.displayLoginPage);
//  Post route for processing Login page
router.post('/login', indexController.processLoginPage);
// Get route for display register page 
router.get('/register', indexController.displayRegisterPage);
//  Post route for processing register page
router.post('/register', indexController.processRegisterPage);
// Get route for display logout page 
router.get('/logout', indexController.performLogout);

module.exports = router;

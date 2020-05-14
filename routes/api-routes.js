module.exports = (app) => {
    const userController = require('../controllers/userController');
    const Users = require('../models/userModel');
/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             emailId:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - emailId
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 */
    app.post('/authenticate', userController.authenticate);
    app.post('/register', userController.register);

/**
 * @swagger
 * /getProfile/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get user
 *     summary: Get a user data
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user object
 *         schema:
 */
    app.get('/getProfile/:userId', userController.getUserData);
    app.get('/getAllLabours', userController.getAllLabours);
    app.get('/getAllFarmers', userController.getAllFarmer);
    app.put('/updateProfile/:userId', userController.updateProfile);

    const farmWorkController = require('../controllers/farmWorkController');

    app.post('/addWork', farmWorkController.addWork);
    app.get('/getWorkHistoryByUser/:userId', farmWorkController.getWorkHistory);
    app.get('/getWorkHistoryById/:workId', farmWorkController.getWorkHistoryById);
    app.put('/updateWorkHistory/:workId', farmWorkController.updateWork);
    app.delete('/deleteWork/:workId', farmWorkController.deleteWork);

    const labourWorkController = require('../controllers/labourWorkController');

    app.get('/getLabourWorkHistory/:labourId', labourWorkController.getLabourWorkHistory);
    app.post('/acceptWork', labourWorkController.acceptWork);
    app.put('/updateLabourWorkHistory/:historyId', labourWorkController.updateWorkHistory);
    app.delete('/deleteLabourWorkHistory/:historyId', labourWorkController.deleteLabourWorkHistory);
}
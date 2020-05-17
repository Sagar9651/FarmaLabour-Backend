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
    app.post('/authenticate', userController.authenticate); // Login 
    app.post('/register', userController.register); // register User

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
    app.get('/getProfile/:userId', userController.getUserData);     //get User Data
    app.get('/getAllLabours', userController.getAllLabours);        // get All Labours(Available only)
    app.get('/getAllFarmers', userController.getAllFarmer);         // get All Farmers
    app.put('/updateProfile/:userId', userController.updateProfile);    // update user Data

    const farmWorkController = require('../controllers/farmWorkController');

    app.post('/addWork', farmWorkController.addWork);
    app.get('/getWorkHistoryByUser/:userId', farmWorkController.getWorkHistory);    //user wise Work History
    app.get('/getWorkHistoryById/:workId', farmWorkController.getWorkHistoryById);  //get Work by Id
    app.put('/updateWorkHistory/:workId', farmWorkController.updateWork);           // update work
    app.delete('/deleteWork/:workId', farmWorkController.deleteWork);               // delete work

    const labourWorkController = require('../controllers/labourWorkController');

    app.get('/getLabourWorkHistory/:labourId', labourWorkController.getLabourWorkHistory); //get Labour WorkHistory
    app.post('/acceptWork', labourWorkController.acceptWork); //Accept work Notification
    app.put('/updateLabourWorkHistory/:historyId', labourWorkController.updateWorkHistory); //Update Labour Work History
    app.delete('/deleteLabourWorkHistory/:historyId', labourWorkController.deleteLabourWorkHistory); // delete labour work History
}
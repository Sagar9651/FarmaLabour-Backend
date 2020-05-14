module.exports = (app) => {
    const userController = require('../controllers/userController');

    app.post('/authenticate', userController.authenticate);
    app.post('/register', userController.register);
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
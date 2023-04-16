const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();
const errors = require("../middlewares/errorHandler");
const { authN, authZ } = require("../middlewares/auth");
const { TypeController, PieceController, ItemController, DepartmentController } = require("../controllers/MainController");
const { EnterItemController, ExitItemController } = require("../controllers/FlowController");
const CustomController = require("../controllers/CustomController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get('/history', CustomController.historiesFetch)
router.get('/history/:id', CustomController.historyDetail)
router.post('/history', CustomController.historyCreate)

router.use(authN);
router.get('/user-login', (req, res, next) => {
  res.status(200).json(req.user)
})
router.get('/user', AuthController.getAllUser)
router.get('/user/:id', AuthController.getUser)
router.put('/user/:id', authZ, AuthController.editUser)
router.delete('/user/:id', authZ, AuthController.deleteUser)
router.put('/user/change-pass/:id', authZ, AuthController.changePass)

router.get('/type', TypeController.typeFetch)
router.get('/type/:id', TypeController.typeDetail)
router.post('/type', authZ, TypeController.typeCreate)
router.put('/type/:id', authZ, TypeController.typeUpdate)
router.delete('/type/:id', authZ, TypeController.typeDelete)

router.get('/piece', PieceController.pieceFetch)
router.get('/piece/:id', PieceController.pieceDetail)
router.post('/piece', authZ, PieceController.pieceCreate)
router.put('/piece/:id', authZ, PieceController.pieceUpdate)
router.delete('/piece/:id', authZ, PieceController.pieceDelete)

router.get('/item', ItemController.itemFetch)
router.get('/item/:id', ItemController.itemDetail)
router.post('/item', authZ, ItemController.itemCreate)
router.put('/item/:id', authZ, ItemController.itemUpdate)
router.delete('/item/:id', authZ, ItemController.itemDelete)

router.get('/department', DepartmentController.DepartmentFetch)
router.get('/department/:id', DepartmentController.DepartmentDetail)
router.post('/department', authZ, DepartmentController.DepartmentCreate)
router.put('/department/:id', authZ, DepartmentController.DepartmentUpdate)
router.delete('/department/:id', authZ, DepartmentController.DepartmentDelete)

router.get('/enter-item', EnterItemController.enterItemFetch)
router.get('/enter-item/:id', EnterItemController.enterItemDetail)
router.post('/enter-item', EnterItemController.enterItemCreate)
router.put('/enter-item/:id', EnterItemController.enterItemUpdate)
router.delete('/enter-item/:id', EnterItemController.enterItemDelete)

router.get('/exit-item', ExitItemController.exitItemFetch)
router.get('/exit-item/:id', ExitItemController.exitItemDetail)
router.post('/exit-item', ExitItemController.exitItemCreate)
router.put('/exit-item/:id', ExitItemController.exitItemUpdate)
router.delete('/exit-item/:id', ExitItemController.exitItemDelete)

router.use(errors);

module.exports = router;
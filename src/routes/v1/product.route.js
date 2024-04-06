const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const productValidation = require('../../modules/product/product.validation')
const productController = require('../../modules/product/controller')
const path = require("path")
const multer = require('multer')

const router = express.Router();


const storage = multer.diskStorage({
  destination: './uploads/products',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

router.post('/add', upload.single('productImage'), validate(productValidation), auth("adminAccess"), productController.addProduct);

// router.get('/', auth(), departmentController.getDepartment);

// router.put('/update/:id', validate(departmentValidations), auth(), departmentController.updateDepartment);

// router.put('/delete/:id', auth(), departmentController.deleteDepartment);

module.exports = router;
const router = require('express').Router();
const Product = require('../models/product');
const faker = require('faker');
const checkJWT = require('../middlewares/check-jwt');
const multer=require('multer');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype ==='image/png'){
    cb(null,true);

  }else{
    cb(new Error('file type not acceptble '),false);

  }
}
var upload=multer({
  storage:storage,
  limits:{fileSize: 1024*1024*5},
  fileFilter:fileFilter

});

router.route('/products')
  .get(checkJWT, (req, res, next) => {
    Product.find({ owner: req.decoded.user._id })
      .populate('owner')
      .populate('category')
      .exec((err, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products
          });
        }
      });
  })
  .post([checkJWT,upload.single('product_picture')], (req, res, next) => {

    console.log(req.file);
    let product = new Product();
    product.owner = req.decoded.user._id;
    console.log(req.body);
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.path;
    product.save();
    res.json({
      success: true,
      message: 'Successfully Added the product'
    });
  });

router.get('/faker/test',(req, res, next) => {
  for (i = 0; i < 15; i++) {
    let product = new Product();
    product.category = "5acc1902580ba509c6622bd7";
    product.owner = "5acbfed6571913c9a9e98135";
    product.image = faker.image.cats();
    product.title = faker.commerce.productName();
    product.description = faker.lorem.words();
    product.price = faker.commerce.price();
    product.save();
  }

  res.json({
    message: "Successfully added 20 pictures"
  });

});


module.exports = router;

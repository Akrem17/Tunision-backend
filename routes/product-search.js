
const router = require('express').Router();
const Product = require('../models/product');


router.get('/', (req, res, next) => {
  if (req.query.query) {
    console.log(req.query.query)
    Product.find({
      title: req.query.query,
      
    }, (err, content) => {
      console.log(content)
      res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: content
      });
    });
  }
});

//Exporting the module  */
module.exports = router;


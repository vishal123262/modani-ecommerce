var express = require('express');
var router = express.Router();
const {isSignedIn, isAuthenticated , isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {
    getProductById , 
    createProduct , 
    getProduct, 
    photo, 
    deleteProduct, 
    updateProduct, 
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product")

// All of params
router.param("userId" , getUserById);
router.param("productId" , getProductById);

// All of actual routes
// create
router.post("/product/create/:userId" , isSignedIn, isAuthenticated , isAdmin , createProduct);

// read
router.get("/product/:productId" , getProduct);
router.get("/product/photo/:productId" , photo);

// update
router.put("/product/:productId/:userId" , isSignedIn , isAuthenticated , isAdmin, updateProduct);

// delete
router.delete("/product/:productId/:userId" , isSignedIn , isAuthenticated , isAdmin, deleteProduct);

// listing routes
router.get("/products" , getAllProducts);

router.get("/product/categories" , getAllUniqueCategories);

module.exports = router;
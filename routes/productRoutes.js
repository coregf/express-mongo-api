const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middleware/auth");

// CRUD para productos
router.get("/", getAllProducts);
router.get("/:id", getProductById);
// requieren autenticación
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;

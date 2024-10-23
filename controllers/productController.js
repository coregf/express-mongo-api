const Product = require("../models/Product");

// GET ALL
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// GET BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // no existe, devolvemos un error 404
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // respondemos con el producto encontrado
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// CREATE
const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el producto" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const Product = require("./models/Product");
const bcrypt = require("bcryptjs");

// variables de entorno
dotenv.config();

// usuario predefinido
const insertSampleUser = async () => {
  try {
    const existingUser = await User.findOne({ email: "test@example.com" });
    if (!existingUser) {
      console.log("No se encontró el usuario, creando uno nuevo...");
      const user = new User({
        email: "test@example.com",
        password: "password",
      });
      await user.save();
      console.log("Usuario de prueba creado con la contraseña 'password'");
    } else {
      console.log("Usuario ya existente");
    }
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
  }
};
const insertSampleProducts = async () => {
  try {

    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      console.log(
        "No se encontraron productos, creando productos de ejemplo..."
      );

      // Inserta productos de ejemplo
      const sampleProducts = [
        {
          name: "Producto 1",
          description: "Descripción del producto 1",
          price: 100,
        },
        {
          name: "Producto 2",
          description: "Descripción del producto 2",
          price: 150,
        },
        {
          name: "Producto 3",
          description: "Descripción del producto 3",
          price: 200,
        },
        {
          name: "Producto 4",
          description: "Descripción del producto 4",
          price: 250,
        },
      ];

      await Product.insertMany(sampleProducts);
      console.log("Productos de ejemplo creados");
    } else {
      console.log("Productos ya existentes, no se crean nuevos productos");
    }
  } catch (error) {
    console.error("Error al insertar productos de ejemplo:", error.message);
  }
};

// Conectar a la base de datos
connectDB().then(() => {
  console.log("Conectado a la base de datos");
  insertSampleUser();
  insertSampleProducts();
});

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

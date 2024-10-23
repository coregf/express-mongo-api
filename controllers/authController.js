const jwt = require("jsonwebtoken");
const User = require("../models/User");


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña hasheada en DB:", user.password);

    const isMatch = await user.matchPassword(password);
    console.log("Resultado de la comparación:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Enviar el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { loginUser };

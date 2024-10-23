const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No hay token, autorización denegada" });
  }

  // Si el token empieza con 'Bearer', eliminamos esa parte
  const tokenWithoutBearer = token.split(" ")[1]; // Extraer solo el token

  try {
    // Verificar el token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = auth;

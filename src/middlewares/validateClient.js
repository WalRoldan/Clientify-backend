export const validateClient = (req, res, next) => {
  const { nombre, apellido, edad, fechaNacimiento } = req.body;

  if (!nombre || !apellido || !edad || !fechaNacimiento) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const fechaISO = new Date(fechaNacimiento);
  if (isNaN(fechaISO)) {
    return res.status(400).json({ message: "Fecha de nacimiento inválida" });
  }

  next();
};

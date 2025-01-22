import Client from "../models/Client.js";

const createClient = async (req, res) => {
  const { nombre, apellido, edad, fechaNacimiento } = req.body;

  if (!nombre || !apellido || !edad || !fechaNacimiento) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    const newClient = new Client({
      nombre,
      apellido,
      edad,
      fechaNacimiento,
      fechaMuerte: new Date(
        new Date(fechaNacimiento).setFullYear(
          new Date(fechaNacimiento).getFullYear() + 80
        )
      ),
    });

    await newClient.save();
    return res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear cliente" });
  }
};

const getStatistics = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients.length === 0) {
      return res.status(400).json({ message: "No hay clientes registrados" });
    }

    const edades = clients.map((client) => client.edad);
    const promedio =
      edades.reduce((sum, edad) => sum + edad, 0) / edades.length;

    const desviacionEstandar = Math.sqrt(
      edades
        .map((edad) => Math.pow(edad - promedio, 2))
        .reduce((sum, sq) => sum + sq, 0) / edades.length
    );

    return res.status(200).json({ promedioEdad: promedio, desviacionEstandar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};

const listClients = async (req, res) => {
  try {
    const clients = await Client.find();

    const clientsWithDeathDate = clients.map((client) => {
      const fechaNacimiento = client.fechaNacimiento;
      const fechaMuerte = fechaNacimiento
        ? new Date(fechaNacimiento).setFullYear(
            new Date(fechaNacimiento).getFullYear() + 80
          )
        : null;

      return {
        ...client.toObject(),
        fechaMuerte: fechaMuerte ? new Date(fechaMuerte).toISOString() : null,
      };
    });

    res.status(200).json(clientsWithDeathDate);
  } catch (error) {
    console.error("Error al obtener la lista de clientes", error);
    res.status(500).json({ message: "Error al obtener la lista de clientes" });
  }
};
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, edad, fechaNacimiento } = req.body;

  try {
    if (!nombre || !apellido || !edad || !fechaNacimiento) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    client.nombre = nombre;
    client.apellido = apellido;
    client.edad = edad;
    client.fechaNacimiento = fechaNacimiento;

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    console.error("Error al actualizar el cliente", error);
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};
const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el cliente", error);
    res.status(500).json({ message: "Error al eliminar el cliente" });
  }
};

export { createClient, getStatistics, listClients, deleteClient, updateClient };

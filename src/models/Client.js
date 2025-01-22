import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  fechaNacimiento: { type: Date, required: true },
  fechaMuerte: { type: Date },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;

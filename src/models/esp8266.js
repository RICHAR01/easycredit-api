import mongoose from 'mongoose'

const Esp8266 = new mongoose.Schema({
  fecha: { type: String, required: false },
  temperatura: { type: String, required: true },
  ph: { type: String, required: true },
  longitud: { type: String, required: true },
  latitud: { type: String, required: true },
  oxigeno_dis: { type: String }
})

export default mongoose.model('esp8266', Esp8266)

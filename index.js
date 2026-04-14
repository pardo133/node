
import db from "mongoose";

const uri = ( 'mongodb://ruizpardo133_db_user:HBzcGo0h8GZ445UC@ac-0gtx7cj-shard-00-00.rijyou0.mongodb.net:27017,ac-0gtx7cj-shard-00-01.rijyou0.mongodb.net:27017,ac-0gtx7cj-shard-00-02.rijyou0.mongodb.net:27017/marzo2026?replicaSet=atlas-ym6poq-shard-0&ssl=true&authSource=admin' ); // La que ya tienes
const Schema = db.Schema;
const userSchema = new Schema({
  nombre: String,
  apellido: String,
  email: String
});


const userModel = db.model('users', userSchema);

async function gestionarUsuarios() {
  try {
    await db.connect(uri);
    console.log(' Conectado...');

    
    const nuevoUsuario = await userModel.create({
      nombre: "Ana",
      apellido: "García",
      email: "ana@mail.com"
    });
    console.log(' Usuario creado:', nuevoUsuario.nombre);

    
    const todos = await userModel.find();
    console.log(' Lista total:', todos.length, 'usuarios');

    
    await userModel.updateOne(
      { nombre: "carlos" }, 
      { $set: { apellido: "Pardo" } }
    );
    console.log('Carlos actualizado');

   

  } catch (err) {
    console.error(' Error:', err);
  } finally {
    await db.disconnect();
    console.log(' Conexión cerrada.');
  }
}

gestionarUsuarios();

const Clients = require("../models/Client");

exports.newClient = async (req, res, next) => {
  try {
    const client = new Clients(req.body);
    await client.save();
    res.json({ message: "Cliente Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el cliente" });
    next();
  }
};

exports.allClients = async (req, res, next) => {
  try {
    res.json(await Clients.find({}));
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.showClient = async (req, res, next) => {
    client = await Clients.findById(req.params.id)
    if(!client) {
        res.json({ error: "el cliente no existe" })
        next()
    }
    res.json(client)
};

exports.updateClient = async (req, res, next) => {
    try {
        res.json(await Clients.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}))
      } catch (error) {
        res.status(500).json({ error: "Error al actualizar el cliente" });
        next();
      }
};

exports.deleteClient = async (req, res, next) => {
    try {
        await Clients.findOneAndDelete({_id: req.params.id})
        res.json({message: "Cliente Eliminado Correctamente" })
      } catch (error) {
        res.status(500).json({ error: "Error al Eliminado el cliente" });
        next();
      }
};



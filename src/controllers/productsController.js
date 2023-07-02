const Products = require("../models/Product");
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

const configurationMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

const upload = multer(configurationMulter).single("image");

exports.uploadFile = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ error: err });
    }
    next();
  });
};

exports.newProduct = async (req, res, next) => {
  try {
    const product = new Products(req.body);

    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();
    res.json({ message: "Product Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear un Product" });
    next();
  }
};

exports.allProduct = async (req, res, next) => {
  try {
    res.json(await Products.find({}));
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.showProduct = async (req, res, next) => {
  product = await Products.findById(req.params.id);

  if (!product) {
    res.json({ error: "el Producto no existe" });
    next();
  }
  res.json(client);
};

exports.updateProduct = async (req, res, next) => {
  try {
    preProduct = await Products.findById(req.params.id);
    pathImage = preProduct.image;

    if (req.file) {
      if (pathImage) {
        fs.unlink("uploads/" + pathImage, (err) => {
          if (err) {
            console.log("Error al eliminar la imagen:", err);
          }
        });
      }
      req.body.image = req.file.filename;
    } else {
      req.body.image = pathImage;
    }

    res.json(
      await Products.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el Producto" });
    next();
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    product = await Products.findById(req.params.id)

    if (product.image) {
      fs.unlink("uploads/" + product.image, (err) => {
        if (err) {
          console.log("Error al eliminar la imagen:", err);
        }
      });
    }
    
    await Products.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Cliente Eliminado Correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al Eliminado el cliente" });
    next();
  }
};

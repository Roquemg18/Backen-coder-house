const { Router } = require("express");
//const Products = require('../dao/models/products.model');
const FilesDao = require("../dao/files.dao");
const uploader = require("../utils/multer.utils");
const ProductsDao = require("../dao/products.dao");

const ProductsFile = new FilesDao("products.json");
const router = Router();
const Products = new ProductsDao();

router.get("/", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json({ message: products });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/loadData", async (req, res) => {
  try {
    const products = await ProductsFile.getItems();
    const newProduct = await Products.insertMany(products);
    res.json({ status: "success", message: newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", error });
  }
});

router.post("/", uploader.single("file"), async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;
    const newProductInfo = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail: req.file.filename,
    };
    const newProduct = await Products.create(newProductInfo);
    res.json({ status: "success", message: newProduct });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Esta cuenta ya existe" });
    }

    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateProduct = await Products.update(id );

    res.json({ message: updateProduct });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

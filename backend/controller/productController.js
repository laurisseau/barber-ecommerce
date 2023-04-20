import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

export const getProduct = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

export const getProductId = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const getProductSlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
});
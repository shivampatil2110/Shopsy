const Products = require("../schema/products");
const Categories = require("../schema/categories");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Products.findOne({ _id: { $eq: req.query.id } });
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageBase64 } = req.body;

    let categoryType = await Categories.findOne({ name: category });

    if (!categoryType) {
      throw new Error("No category");
    }

    let product = new Products({
      name,
      description,
      price,
      stock,
      categoryId: categoryType.id,
      productImage: imageBase64,
    });
    await product.save();

    res.status(200).send({ status: "successfully added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    let id = req.query.id;
    let isExist = await Products.findOne({ _id: { $eq: id } });
    if (!isExist) {
      return res.status(404).send({ msg: "Product not found" });
    }

    let categoryType = await Categories.findOne({ name: category });
    if (!categoryType) {
      return res.status(404).send({ msg: "This category does not exists" });
    }

    let updatedProduct = {
      name,
      description,
      price,
      stock,
      categoryId: categoryType.id,
    };
    let product = await Products.findByIdAndUpdate(id, updatedProduct, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ msg: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;
    let deletedProduct = await Products.findByIdAndDelete({ _id: id });
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
};

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
    const { name, description, price, stock, category } = req.body;

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
    });
    await product.save();

    res.status(200).send({ status: "successfully added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProduct,
};

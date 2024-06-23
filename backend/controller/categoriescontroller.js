const Categories = require("../schema/categories");

const getCategories = async (req, res) => {
  try {
    let categories = await Categories.find();
    res.status(200).send(categories);
  } catch (error) {
    res.send(error.message);
  }
};

const addCategory = async (req, res) => {
  try {
    let { name } = req.body;
    let categoryExists = await Categories.findOne({ name });

    if (categoryExists) {
      return res.send({ msg: "category already exists" });
    }

    let category = new Categories({ name });
    await category.save();
    res.status(200).send({ msg: "category has been added" });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { getCategories, addCategory };

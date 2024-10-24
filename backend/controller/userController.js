const User = require("../schema/user");

const userProfile = async (req, res) => {
  try {
    let response = await User.findOne({ email: req.user });
    if (!response) {
      return;
    }
    res.send(response);
  } catch (error) {}
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    let addressArray = user.address;
    addressArray.push(req.body);
    await User.findByIdAndUpdate(user._id, { address: addressArray });
    res.status(200).send({ msg: "Addresses added successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Error adding address" });
  }
};

const getAddress = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user });
    res.status(200).send({ address: user.address });
  } catch (error) {
    res.status(500).send({ msg: "Error getting address" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { email: req.user },
      { $pull: { address: { _id: req.body.addressId } } },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ msg: "Error updating address" });
  }
};

const editAddress = async (req, res) => {
  try {
    let address = req.body;
    let user = await User.findById(address.userId);
    let arr = [...user.address];
    arr.forEach(async (el) => {
      let id = el._id.toString();
      if (id == address.address._id) {
        await Object.assign(el, address.address);
      }
    });
    user.address = arr;
    await User.findByIdAndUpdate(address.userId, user);
    res.status(200).send({ msg: "Updated successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Error updating address" });
  }
};

module.exports = {
  userProfile,
  addAddress,
  getAddress,
  deleteAddress,
  editAddress,
};

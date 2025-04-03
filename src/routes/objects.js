import express from "express";
import Objects from "../../models/object.js";
import verify from "../../app/verify-token.js";
import { objectValidation } from "../../app/validate.js";

const router = express.Router();
//GET ALL OBJECTS with Query of limit and page
router.get("/all-objects", verify, async (req, res) => {
  let { limit = 10, page = 1 } = req.query;
  const limitData = parseInt(limit);
  const skip = (page - 1) * limit;

  try {
    const findObjects = await find()
      .sort({ first_name: 1, last_name: 1 })
      .limit(limitData)
      .skip(skip);
    if (findObjects != 0) {
      res.json({ page: page, limit: limitData, findObjects });
    } else {
      return res.status(400).json({ error: "DB is empty" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//CREATE NEW OBJECT
router.post("/new", verify, async (req, res) => {
  //VALIDATION OF DATA
  const { error } = objectValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IF OBJECT ALREADY EXIST
  const objectExists = await findOne({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  if (objectExists)
    return res.status(400).json({ error: "Object Already Exists" });

  //CREATING CONTACT
  const object = new Objects({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  try {
    const savedUser = await object.save();
    res.send({
      _id: object._id,
      status: "Created",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//DELETE SPECIFIC OBJECTS

router.delete("/delete/:id", verify, async (req, res) => {
  const result = await findByIdAndDelete({
    _id: req.params.id,
  });
  if (result != null) {
    return res
      .status(200)
      .json({ _id: req.params.id, message: "Deleted Successfully" });
  } else {
    return res.status(400).json({
      error: "ID[" + req.params.id + "]: does not Exists or has been deleted",
    });
  }
});

export default router;

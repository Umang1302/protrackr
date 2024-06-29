const express = require("express");
const router = express.Router();
const StudentModel = require("../models/student");


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of users
 *     description: Optional extended description in Markdown
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 */
router.post("/", async (req, res) => {
  try {
    const student = new StudentModel(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  console.log("GET API CALLED");
  try {
    const students = await StudentModel.find();
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

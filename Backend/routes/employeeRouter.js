const express = require("express");
const Employee = require("../Models/model");
const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.age || !req.body.dateJoined) {
      return res.status(400).send({
        message: "provide all data",
      });
    }

    const newEmployee = {
      name: req.body.name,
      age: req.body.age,
      dateJoined: req.body.dateJoined,
    };

    const employee = await Employee.create(newEmployee);
    return res.status(201).send(employee);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json({
      data: employees,
      totalEmployees: employees.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

Router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.age || !req.body.dateJoined) {
      return res.status(500).json("provide all the info please");
    }
    const { id } = req.params;
    const result = await Employee.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee Updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Employee not found" });
    }
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = Router;

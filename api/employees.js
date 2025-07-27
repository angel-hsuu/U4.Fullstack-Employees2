import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../db/queries/employees.js";
const router = express.Router();
export default router;

// TODO: this file!

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("ID must be a positive integer.");
  }

  const employee = await getEmployee(id);
  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  req.employee = employee;
  next();
});

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    console.log("POST /employees hit", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required.");
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary) {
      return res
        .status(400)
        .send("Request must include name, birthday, and salary.");
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.employee);
  })
  .put(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required.");
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary) {
      return res
        .status(400)
        .send("Request must include name, birthday, and salary.");
    }

    const updated = await updateEmployee({
      id: req.employee.id,
      name,
      birthday,
      salary,
    });

    res.status(200).send(updated);
  })
  .delete(async (req, res) => {
    await deleteEmployee(req.employee.id);
    res.sendStatus(204);
  });

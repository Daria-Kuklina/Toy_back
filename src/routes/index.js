const express = require("express");
const userRouter = require("./users");
const toyRouter = require("./toys");
const orderRouter = require("./orders");
const photoRouter = require("./photos");

const router = express.Router();

router.use("/users", userRouter);
router.use("/toys", toyRouter);
router.use("/orders", orderRouter);
router.use("/photos", photoRouter);

router.use((req, res) => {
  res.send({ success: false, code: "NOT_IMPLEMENTED" });
});
router.use((err, req, res, next) => {
  if (err.name === "CONTROLLER_EXCEPTION") {
    res.send({ success: false, code: err.exceptionCode, message: err.message });
  } else {
    console.error(err);
    res.send({ success: false, code: "INTERNAL_ERROR" });
  }
});

module.exports = router;
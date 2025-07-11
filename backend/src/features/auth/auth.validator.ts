import { NextFunction, Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const loginValidator = [
  body("*").notEmpty().withMessage("All fields are required"),
  body("userName").notEmpty().withMessage("Username is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const registerValidator = [
  body("*").notEmpty().withMessage("All fields are required"),
  body("userName").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const handleValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Validation Failed",
      errors: errors.array(),
    });
    return;
  }
  next();
};

export const validateRequest = (...validatorFns: ValidationChain[]) => {
  return [...validatorFns, handleValidation];
};

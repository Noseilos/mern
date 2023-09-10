import express from "express";
import { getProducts, getProductById } from "../controllers/productController.ja";

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
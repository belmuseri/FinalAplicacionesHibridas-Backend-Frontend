import express from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProductById } from "../controllers/productController.js";
import { autenticar } from "../middleware/autenticar.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', autenticar, createProduct);

//router.put('/:id', updateProduct);
router.post('/', autenticar, createProduct);
router.put('/:id', autenticar, updateProduct);
router.delete('/:id', autenticar, deleteProductById);

export default router;

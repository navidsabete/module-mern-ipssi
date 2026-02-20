import { Router } from 'express';
import { productController } from '../controllers/ProductController';

const productRouter = Router();

productRouter.get("/products", productController.getAll);
productRouter.get("/products/:id", productController.getProductById);
productRouter.post("/products", productController.create);
productRouter.put("/products/:id", productController.update);
productRouter.delete("/products/:id", productController.delete);

export default productRouter;

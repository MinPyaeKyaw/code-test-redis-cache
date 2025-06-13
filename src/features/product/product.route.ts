import { Router } from 'express';
import { getAllProducts } from './product.controller';

const productRoutes = Router();

productRoutes.get('/products', getAllProducts);

export default productRoutes;

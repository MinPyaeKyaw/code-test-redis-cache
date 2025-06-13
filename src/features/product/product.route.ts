import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller';

const productRoutes = Router();

// Get all products
productRoutes.get('/products', getAllProducts);

// Get a single product by ID
productRoutes.get('/products/:id', getProductById);

// Create a new product
productRoutes.post('/products', createProduct);

// Update a product
productRoutes.put('/products/:id', updateProduct);

// Delete a product
productRoutes.delete('/products/:id', deleteProduct);

export default productRoutes;

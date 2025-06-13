import { iosProducts } from '../../mock-data/products';
import { redisService } from '../../services/redis.service';
import { AppError } from '../../utils/http';

const CACHE_KEY = 'products';
const CACHE_EXPIRY = 3600; // 1 hour in seconds

export interface Product {
  id: number;
  name: string;
  category: string;
  os: string;
  price: number;
  releaseYear: number;
  discontinued?: boolean;
}

class ProductService {
  private products: Product[];

  constructor() {
    this.products = [...iosProducts];
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      // Try to get from cache first
      const cachedProducts = await redisService.get(CACHE_KEY);
      if (cachedProducts) {
        return cachedProducts;
      }

      // If not in cache, get from memory and cache it
      await redisService.set(CACHE_KEY, this.products, CACHE_EXPIRY);
      return this.products;
    } catch (error) {
      throw new AppError('Failed to get products', 500);
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const products = await this.getAllProducts();
      const product = products.find((p) => p.id === id);
      return product || null;
    } catch (error) {
      throw new AppError('Failed to get product', 500);
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const newId = Math.max(...this.products.map((p) => p.id)) + 1;
      const newProduct = { ...product, id: newId };

      this.products.push(newProduct);
      await this.invalidateCache();

      return newProduct;
    } catch (error) {
      throw new AppError('Failed to create product', 500);
    }
  }

  async updateProduct(
    id: number,
    productData: Partial<Product>
  ): Promise<Product | null> {
    try {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        return null;
      }

      const updatedProduct = {
        ...this.products[index],
        ...productData,
        id, // Ensure ID cannot be changed
      };

      this.products[index] = updatedProduct;
      await this.invalidateCache();

      return updatedProduct;
    } catch (error) {
      throw new AppError('Failed to update product', 500);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        return false;
      }

      this.products.splice(index, 1);
      await this.invalidateCache();

      return true;
    } catch (error) {
      throw new AppError('Failed to delete product', 500);
    }
  }

  private async invalidateCache() {
    await redisService.del(CACHE_KEY);
  }
}

export const productService = new ProductService();

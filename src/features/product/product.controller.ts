import { NextFunction, Request, Response } from 'express';
import { responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import { productService } from './product.service';
import { AppError } from '../../utils/http';

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await productService.getAllProducts();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new AppError('Invalid product ID', 400);
    }

    const product = await productService.getProductById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await productService.createProduct(req.body);

    responseData({
      res,
      status: 201,
      message: MESSAGES.SUCCESS.CREATE,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new AppError('Invalid product ID', 400);
    }

    const updatedProduct = await productService.updateProduct(id, req.body);
    if (!updatedProduct) {
      throw new AppError('Product not found', 404);
    }

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.UPDATE,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new AppError('Invalid product ID', 400);
    }

    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      throw new AppError('Product not found', 404);
    }

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

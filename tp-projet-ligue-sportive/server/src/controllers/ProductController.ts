import { Request, Response } from 'express';
import { Product } from '../models/Product';

class ProductController {
  // GET /api/produits - Récupérer tout le catalogue
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des produits" });
    }
  }

  // POST /api/produits - Ajouter un produit (Admin) 
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: "Données invalides pour la création" });
    }
  }

  // PUT /api/produits/:id - Modifier un produit (Admin) 
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour" });
    }
  }

  // DELETE /api/produits/:id - Supprimer un produit (Admin) 
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Produit supprimé" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  }
}

export const productController = new ProductController();
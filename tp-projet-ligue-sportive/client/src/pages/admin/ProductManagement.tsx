import { useEffect, useState } from "react";
import {
  Product,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from '../../api';


function ProductManagement(){
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    // 2. L'état de chargement (Pendant l'attente) -> true par défaut
    const [isLoading, setIsLoading] = useState(true);   
    // 3. L'erreur (En cas de pépin) -> null par défaut 
    const [error, setError] = useState<string | null>(null);    
    // Formulaire création
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        is_dispo: true,
        category: "",
        price: 0,
        qte_stock: 0,
    }); 
    // Formulaire mise à jour
    const [editProduct, setEditProduct] = useState({
        name: "",
        description: "",
        is_dispo: true,
        category: "",
        price: 0,
        qte_stock: 0,
    });

    useEffect(() => {
        // On lance la récupération
        fetchProducts(); }, []);
        
        const fetchProducts = async () => { 
            try { 
                // On s'assure que l'erreur est vide avant de commencer 
                setError(null);
                const data = await getAllProducts();
                setProducts(data);
            }
            catch(err: any){
                // Gestion de l'erreur
                console.error("Erreur fetch:", err);
                setError(err.message || "Impossible de contacter le serveur");
            }
            finally { 
                // C'est fini, on enlève le loader (Succès OU Échec)
                setIsLoading(false);
            }
        };
    
        const handleCreate = async (e: React.SubmitEvent) => {
            e.preventDefault();
            if(!newProduct.name.trim()) return;
            try{
              setError(null);
              const created = await createProduct(newProduct);
              setProducts((prev) => [...prev, created]);
    
              // Reset form
              setNewProduct({ name: "", description: "", is_dispo: true, category: "", price: 0, 
                qte_stock: 0, });
              
            }
            catch(err: any){
                // Gestion de l'erreur
                console.error("Erreur :", err);
                setError(err.message || "Impossible de contacter le serveur");
            }
            finally { 
                // C'est fini, on enlève le loader (Succès OU Échec)
                setIsLoading(false);
            }
    
        };
    
        const handleSelectProduct = async (id: string) => { 
          try { 
                // On s'assure que l'erreur est vide avant de commencer 
                setError(null);
                const product = await getProductById(id);
                 setSelectedProduct(product);
                 setEditProduct({
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    qte_stock: product.qte_stock,
                    is_dispo: product.is_dispo,
                });
            }
            catch(err: any){
                // Gestion de l'erreur
                console.error("Erreur fetch:", err);
                setError(err.message || "Impossible de contacter le serveur");
            }
            finally { 
                // C'est fini, on enlève le loader (Succès OU Échec)
                setIsLoading(false);
            }
        };
    
        const handleUpdate = async (e: React.SubmitEvent, id: string) => {
           e.preventDefault();
    
           try{
               setError(null);
               const updated = await updateProduct(id, editProduct);
               setProducts(prev => prev.map(p => (p._id === id ? updated : p)));
               setSelectedProduct(updated);
           }
           catch(err: any){
                // Gestion de l'erreur
                console.error("Erreur :", err);
                setError(err.message || "Impossible de contacter le serveur");
            }
            finally { 
                // C'est fini, on enlève le loader (Succès OU Échec)
                setIsLoading(false);
            }
    
        }
    
    
        const handleDelete = async (id: string) => {
            try { 
                // On s'assure que l'erreur est vide avant de commencer 
                setError(null);
                await deleteProduct(id);
                // Mise à jour locale sans recharger la page
                setProducts(prevProducts => prevProducts.filter((product) => product._id !== id));
                if (selectedProduct?._id === id) setSelectedProduct(null);
        
            }
            catch(err: any){
                // Gestion de l'erreur
                console.error("Erreur :", err);
                setError(err.message || "Impossible de contacter le serveur");
            }
            finally { 
                // C'est fini, on enlève le loader (Succès OU Échec)
                setIsLoading(false);
            }
        };

        // --- RENDU CONDITIONNEL ---
    // Cas 1 : Ça charge 
    if (isLoading) { 
        return <div className="loading-spinner">Chargement des produits...</div>; 
    } 
    
    // Cas 2 : Il y a une erreur 
    if (error) { 
        return <div className="error-message">Error : {error}</div>; 
    } 
    
    // Cas 3 : Tout va bien, on affiche la liste 

    return (
    <div className="page product">
      <h2>Gestion des Produits</h2>

      {/* FORMULAIRE AJOUT UTILISATEUR */}
      <div className="form-container">
        <h3>Ajouter un nouveau produit</h3>
        <form onSubmit={handleCreate} className="form-create-product">
          <input
            type="text"
            placeholder="Nom"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Catégorie (Football, Natation...)"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <label>Prix (€) :</label>
          <input
            type="number"
            placeholder="Prix"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />

          <label>Quantité stock :</label>
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.qte_stock}
            onChange={(e) => setNewProduct({ ...newProduct, qte_stock: Number(e.target.value) })}
          />

          <label>
            Disponible pour location :
            <input
              type="checkbox"
              checked={newProduct.is_dispo}
              onChange={(e) =>
                setNewProduct({ ...newProduct, is_dispo: e.target.checked })
              }
            />
            </label>
              
          <button className="btn btn-primary" type="submit">
            Créer
          </button>
        </form>
      </div>

      {/* FORMULAIRE MISE A JOUR UTILISATEUR */}
      {selectedProduct && (
      <div className="form-container">
        <div className="form-edit-user">
          <h3>Modifier produit</h3>

          <form onSubmit={e => handleUpdate(e, selectedProduct._id!)}>

        
              <input
                type="text"
                value={editProduct.name}
                onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                />

                <input
                type="text"
                value={editProduct.description}
                onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
                />

                <input
                   type="text"
                   value={editProduct.category}
                   onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                 />

                <label>Prix (€) :</label>
                <input
                    type="number"
                    value={editProduct.price} 
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  />
                  <label>Quantité stock :</label>
                  <input
                    type="number"
                    value={editProduct.qte_stock}
                    onChange={(e) => setEditProduct({ ...editProduct, qte_stock: Number(e.target.value) })}
                  />

                  <label>
                    Disponible pour location :
                    <input
                      type="checkbox"
                      checked={editProduct.is_dispo}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct, is_dispo: e.target.checked })
                      }
                    />
                    </label>
                  
                  
                <div className="edit-actions">
                    <button className="btn btn-primary" type="submit">
                      Sauvegarder
                    </button>

                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Annuler
                    </button>
                    </div>
          </form>
        </div>
      </div>
      )}
      
      {/* CONTENEUR TABLEAU */}
      <div className="table-container">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
             <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Disponible pour location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price} €</td>
                <td>{product.qte_stock}</td>
                <td>{product.is_dispo ? "Oui" : "Non"}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleSelectProduct(product._id)}
                    >
                      Modifier
                    </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );


}

export default ProductManagement;
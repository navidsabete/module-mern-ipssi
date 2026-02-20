import { useEffect, useState } from "react";
import { Product } from "../../api";
import { getAllProducts } from "../../api";
import { addToCart } from "../../utils/panier";


function Location() {

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All",
  ...Array.from(new Set(products.map((p) => p.category))),];

  const filteredProducts =  
    categoryFilter === "All"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  // 2. L'état de chargement (Pendant l'attente) -> true par défaut
    const [isLoading, setIsLoading] = useState(true);   
    // 3. L'erreur (En cas de pépin) -> null par défaut 
    const [error, setError] = useState<string | null>(null);


  useEffect(() => {
          // On lance la récupération
          fetchProducts(); }, []);
          
          const fetchProducts = async () => { 
              try { 
                  // On s'assure que l'erreur est vide avant de commencer 
                  setError(null);
                  const data = await getAllProducts();
                  const availableProducts = data.filter((p) => p.is_dispo);
                  setProducts(availableProducts);
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

    // --- RENDU CONDITIONNEL ---
    // Cas 1 : Ça charge 
    if (isLoading) { 
        return <div className="loading-spinner">Chargement des adhérents...</div>; 
    } 
    
    // Cas 2 : Il y a une erreur 
    if (error) { 
        return <div className="error-message">Error : {error}</div>; 
    } 
    
    // Cas 3 : Tout va bien, on affiche la liste 


  return (
    <div className="page">
      <div className="hero">
        <h2>Catalogue Produits</h2>
        <p>Liste des produits par catégorie (Football, Natation...)</p>

        {/* Filtre par catégorie */}
      <div className="filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn-filter ${
              categoryFilter === cat ? "active" : ""
            }`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

        {/* Listing produits */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>Catégorie:</strong> {product.category}
            </p>
            <p>
              <strong>Prix:</strong> {product.price} €
            </p>
            <p>
              <strong>Stock:</strong> {product.qte_stock}
            </p>
            <button
              className="btn btn-primary"
              disabled={product.qte_stock === 0}
              onClick={() => {
                addToCart(product);
              }}
            >
              {product.qte_stock > 0 ? "Ajouter au panier" : "Indisponible"}
            </button>
          </div>
        ))}
      </div>
      
      </div>
    </div>
  );
}

export default Location;

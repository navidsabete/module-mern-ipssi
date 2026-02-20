import { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem } from "../../utils/panier";

function Panier(){
    const [cart, setCart] = useState<CartItem[]>([]);
    useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


  return (
      <div className="page">
        <div className="hero">
          <h2>Mon panier</h2>
           {cart.length === 0 ? (
                <p>Le panier est vide</p>
           ): (
            <>
                <div className="cart-container">
                  {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    {item.quantity} × {item.price} €
                  </p>
                </div>

                <button
                  className="btn-delete"
                  onClick={() => handleRemove(item.id)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          <h3>Total : {total} €</h3>

          <button className="btn btn-primary">
            Valider la réservation
          </button>
            </>
             )}
    </div>   
    </div>   
    );

}

export default Panier;
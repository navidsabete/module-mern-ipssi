import { useState } from "react";

function App() { 
  const [count, setCount] = useState(0);
  const increment = () => { 
    setCount(count+1);
  };
  const decrement = () => { 
    setCount(count-1);
  };
  
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}> 
        <h1>Compteur Interactif</h1> 
        <p style={{ fontSize: '40px', fontWeight: 'bold', color: count<0?'red':'black' }}> 
          {count} 
        </p> 
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={decrement} style={{ padding: '10px 20px' }}> 
            - Diminuer 
          </button> 
          <button onClick={increment} style={{ padding: '10px 20px' }}> 
            + Augmenter 
          </button> 
        </div>
      </div>


    ); 
} 


export default App;
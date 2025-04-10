import React, { useCallback, useEffect, useState } from "react";
import "./Product.css";


export default function Product() {
  const [productsData, setproductsData] = useState([]);


  const fetchProducts = useCallback(async () => {
    try {
      const products = await fetch("https://fakestoreapi.com/products");
      const data = await products.json();
      console.log(data);
      setproductsData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="product-grid">
      {productsData.map((item) => (
        <div className="product-card" key={item.id}>
          <div className="img-container">
            <img src={item.image} alt={item.title} />
          </div>
          <h3>{item.title}</h3>
          <p className="price">${item.price}</p>
          <p className="category">{item.category}</p>
        </div>
      ))}
    </div>
  );
}

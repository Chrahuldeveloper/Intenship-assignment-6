import React, { useCallback, useEffect, useState } from "react";
import "./Product.css";

const dummyProducts = [
  {
    id: 1,
    title: "Minimalist White T-Shirt",
    price: 29.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    Description:
      "Premium cotton t-shirt with a minimalist design, perfect for casual wear.",
  },
  {
    id: 2,
    title: "Classic Denim Jeans",
    price: 79.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    Description:
      "Premium cotton t-shirt with a minimalist design, perfect for casual wear.",
  },
  {
    id: 3,
    title: "Leather Watch",
    price: 149.99,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    Description:
      "Premium cotton t-shirt with a minimalist design, perfect for casual wear.",
  },
  {
    id: 4,
    title: "Ceramic Coffee Mug",
    price: 24.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    Description:
      "Premium cotton t-shirt with a minimalist design, perfect for casual wear.",
  },
  {
    id: 5,
    title: "Ceramic Coffee Mug",
    price: 24.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    Description:
      "Premium cotton t-shirt with a minimalist design, perfect for casual wear.",
  },
];

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

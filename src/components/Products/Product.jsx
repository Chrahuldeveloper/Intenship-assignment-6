import React, { useCallback, useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function Product({ searchQuery, category }) {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const products = await fetch("https://fakestoreapi.com/products");
      const data = await products.json();
      console.log(data);
      setProductsData(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let result = productsData;

    if (category !== "All") {
      result = result.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, category, productsData]);

  return (
    <>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="img-container">
                <Link
                  to={`/product/${item.title}`}
                  state={{
                    image: item.image,
                    title: item.title,
                    description: item.description,
                    Price: item.price,
                    category: item.category,
                  }}
                >
                  <img src={item.image} alt={item.title} />
                </Link>
              </div>
              <h3>{item.title}</h3>
              <p className="price">${item.price}</p>
              <p className="category">{item.category}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h2>No products found</h2>
            <p>Try changing your search or filter criteria</p>
          </div>
        )}
      </div>
    </>
  );
}

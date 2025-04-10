import React, { useState } from 'react';
import { Navbar ,Product} from '../../components/index';
import './Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <>
      <Navbar />
      <div className="home-controls">
        <input
          type="text"
          placeholder="🔍 Search products..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home</option>
        </select>
      </div>
      <Product/>
    </>
  );
}

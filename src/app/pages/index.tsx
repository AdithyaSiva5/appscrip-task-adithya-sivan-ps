"use client";
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import Footer from '../components/Footer/Footer';
import { Product } from '../types/Product';
import { api } from '../services/api';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedCategory === 'all') {
          data = await api.getAllProducts();
        } else {
          data = await api.getProductsByCategory(selectedCategory);
        }
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
        <CategoryFilter 
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
      <Footer />
    </div>
  );
}
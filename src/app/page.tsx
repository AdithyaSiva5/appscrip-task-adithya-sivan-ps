"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import Footer from '@/components/Footer/Footer';
import { FilterState, Product } from '@/types/Product';
import { api } from '@/services/api';
import styles from './page.module.css';
import { RecommendationSort } from '@/components/RecommendationSort/RecommendationSort';
import { FilterSidebar } from '@/components/FilterSidebar/FilterSidebar';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    customizable: false,
    idealFor: {
      selected: [],
      options: ['Men', 'Women', 'Baby & Kids']
    },
    occasion: {
      selected: [],
      options: ['Casual', 'Formal', 'Sport']
    },
    fabric: {
      selected: [],
      options: ['Cotton', 'Polyester', 'Silk']
    },
    work: {
      selected: [],
      options: ['Office', 'Casual', 'Sport']
    },
    segment: {
      selected: [],
      options: ['Men', 'Women', 'Kids']
    },
    suitableFor: {
      selected: [],
      options: ['Casual', 'Formal', 'Sport']
    },
    rawMaterial: {
      selected: [],
      options: ['Cotton', 'Polyester', 'Silk']
    },
    pattern: {
      selected: [],
      options: ['Solid', 'Stripes', 'Floral']
    },
  });
  const [sortType, setSortType] = useState('recommended');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        console.log(data); // Log the data to the console
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter(product => {
    if (filters.customizable && !product.customizable) return false;

    if (filters.idealFor.selected.length &&
      !filters.idealFor.selected.some(filter => product.idealFor?.includes(filter))) return false;

    if (filters.occasion.selected.length &&
      !filters.occasion.selected.some(filter => product.occasion?.includes(filter))) return false;

    if (filters.fabric.selected.length &&
      !filters.fabric.selected.some(filter => product.fabric?.includes(filter))) return false;

    return true;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case 'priceDesc':
        return b.price - a.price;
      case 'priceAsc':
        return a.price - b.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
        <CategoryFilter
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        <div className={styles.productSection}>
          {isMobile && (
            <div className={styles.mobileControls}>
              <button className={styles.filterButton}>FILTER</button>
              <RecommendationSort onSortChange={setSortType} />
            </div>
          )}

          <div className={styles.contentWrapper}>
            {!isMobile && (
              <FilterSidebar
                totalItems={filteredProducts.length}
                onFilterChange={setFilters}
                isMobile={isMobile}
              />
            )}

            <div className={styles.productsWrapper}>
              {!isMobile && (
                <div className={styles.sortContainer}>
                  <RecommendationSort onSortChange={setSortType} />
                </div>
              )}

              {loading ? (
                <div className={styles.loading}>Loading...</div>
              ) : (
                <ProductGrid products={sortedProducts} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
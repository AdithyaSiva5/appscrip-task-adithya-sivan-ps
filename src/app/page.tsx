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
import { Filter } from 'lucide-react';

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
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsFilterVisible(!mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible)
  }

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
          <div className={styles.filterHeader}>
            <span>{products.length} ITEMS</span>
            {!isMobile && (
              <>
                <button
                  onClick={toggleFilterVisibility}
                  className={styles.filterToggleButton}
                >
                  {isFilterVisible ? 'HIDE FILTER' : 'SHOW FILTER'}
                </button>
                <div className={styles.controlsContainer}>
                  <RecommendationSort onSortChange={setSortType} />
                </div>
              </>
            )}
          </div>

          {isMobile && (
            <div className={styles.mobileControls}>
              <button
                onClick={toggleFilterVisibility}
                className={styles.mobileFilterButton}
              >
                {isFilterVisible ? 'HIDE FILTER' : 'FILTER'}
              </button>
              <RecommendationSort
                onSortChange={setSortType}
                className={styles.mobileSortButton}
              />
            </div>
          )}

          <div className={styles.contentWrapper}>
            <FilterSidebar
              totalItems={products.length}
              onFilterChange={setFilters}
              isMobile={isMobile}
              isVisible={isFilterVisible}
            />

            <div className={styles.productsWrapper}>
              {loading ? (
                <div className={styles.loading}>Loading...</div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import styles from './CategoryFilter.module.css';
import { api } from '../../services/api';

interface CategoryFilterProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter = ({ onCategorySelect, selectedCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api.getCategories();
      setCategories(['all', ...data]);
    };
    fetchCategories();
  }, []);

  return (
    <div className={styles.filterContainer}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onCategorySelect(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
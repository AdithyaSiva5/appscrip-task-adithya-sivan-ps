"use client"
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '@/types/Product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
        <button 
          className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <div className={styles.details}>
        <h3>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.rating}>
          ⭐ {product.rating.rate} ({product.rating.count})
        </div>
        <p className={styles.category}>{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
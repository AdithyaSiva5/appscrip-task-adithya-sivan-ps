import { Product } from '../../types/Product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
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
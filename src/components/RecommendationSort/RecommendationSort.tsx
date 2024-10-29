"use client"
import { useState } from "react";
import styles from './RecommendationSort.module.css';

interface RecommendationSortProps {
    onSortChange: (sortType: string) => void;
}

export const RecommendationSort = ({ onSortChange }: { onSortChange: (sortType: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const sortOptions = [
        { label: 'RECOMMENDED', value: 'recommended' },
        { label: 'NEWEST FIRST', value: 'newest' },
        { label: 'POPULAR', value: 'popular' },
        { label: 'PRICE : HIGH TO LOW', value: 'priceDesc' },
        { label: 'PRICE : LOW TO HIGH', value: 'priceAsc' }
    ];

    return (
        <div className={styles.recommendationSort}>
            <button
                className={styles.sortButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                RECOMMENDED
                <span className={styles.arrow}>▼</span>
            </button>

            {isOpen && (
                <div className={styles.sortDropdown}>
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            className={styles.sortOption}
                            onClick={() => {
                                onSortChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
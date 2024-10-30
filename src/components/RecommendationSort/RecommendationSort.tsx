"use client"
import { useState } from "react";
import styles from './RecommendationSort.module.css';

interface RecommendationSortProps {
    onSortChange: (sortType: string) => void;
    className?: string; // Add className prop
}

export const RecommendationSort = ({ onSortChange, className }: RecommendationSortProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('RECOMMENDED');

    const sortOptions = [
        { label: 'RECOMMENDED', value: 'recommended' },
        { label: 'NEWEST FIRST', value: 'newest' },
        { label: 'POPULAR', value: 'popular' },
        { label: 'PRICE : HIGH TO LOW', value: 'priceDesc' },
        { label: 'PRICE : LOW TO HIGH', value: 'priceAsc' }
    ];

    return (
        <div className={`${styles.recommendationSort} ${className || ''}`}>
            <button
                className={styles.sortButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption}
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
                                setSelectedOption(option.label);
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
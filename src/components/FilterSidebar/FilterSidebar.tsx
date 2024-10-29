"use client";
import { useState } from 'react';
import styles from './FilterSidebar.module.css';
import { FilterState } from '@/types/Product';

export const FilterSidebar = ({
  totalItems,
  onFilterChange,
  isMobile = false
}: {
  totalItems: number;
  onFilterChange: (filters: FilterState) => void;
  isMobile?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(!isMobile);
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
    }
  });

  const [expandedFilter, setExpandedFilter] = useState<keyof FilterState | null>(null);

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    const newFilters = { ...filters };

    if (category === 'customizable') {
      newFilters.customizable = !newFilters.customizable;
    } else {
      const categoryFilters = newFilters[category] as { selected: string[]; options: string[] }; // Type assertion
      if (categoryFilters.selected.includes(value)) {
        categoryFilters.selected = categoryFilters.selected.filter(item => item !== value);
      } else {
        categoryFilters.selected = [...categoryFilters.selected, value];
      }
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFilterExpand = (category: keyof FilterState) => {
    setExpandedFilter(expandedFilter === category ? null : category);
  };

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.filterHeader}>
        <span>{totalItems} ITEMS</span>
        {isMobile && (
          <button onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'HIDE FILTER' : 'SHOW FILTER'}
          </button>
        )}
      </div>

      {isVisible && (
        <div className={styles.filterContent}>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader} onClick={() => handleFilterExpand('customizable')}>
              <h3>CUSTOMIZABLE</h3>
              <span className={styles.expandIcon}>
                {expandedFilter === 'customizable' ? '-' : '+'}
              </span>
            </div>
            {expandedFilter === 'customizable' && (
              <div className={styles.filterSectionContent}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.customizable}
                    onChange={() => handleFilterChange('customizable', '')}
                  />
                  CUSTOMIZABLE
                </label>
              </div>
            )}
          </div>

          {Object.keys(filters).map(
            (category) =>
              category !== 'customizable' && (
                <div className={styles.filterSection} key={category}>
                  <div className={styles.filterSectionHeader} onClick={() => handleFilterExpand(category as keyof FilterState)}>
                    <h3>{category.toUpperCase()}</h3>
                    <span className={styles.expandIcon}>
                      {expandedFilter === category ? '-' : '+'}
                    </span>
                  </div>
                  {expandedFilter === category && (
                    <div className={styles.filterSectionContent}>
                      {(
                        filters[category as keyof FilterState] as { selected: string[]; options: string[] } // Type assertion
                      ).options.map((option) => (
                        <label key={option} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={(
                              filters[category as keyof FilterState] as { selected: string[]; options: string[] }
                            ).selected.includes(option)}
                            onChange={() => handleFilterChange(category as keyof FilterState, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
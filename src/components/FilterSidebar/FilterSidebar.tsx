"use client";
import { useState } from 'react';
import styles from './FilterSidebar.module.css';
import { FilterState } from '@/types/Product';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export const FilterSidebar = ({
  totalItems,
  onFilterChange,
  isMobile = false,
  isVisible,
  onClose
}: {
  totalItems: number
  onFilterChange: (filters: FilterState) => void
  isMobile?: boolean
  isVisible: boolean
  onClose?: () => void
}) => {
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
      const categoryFilters = newFilters[category] as { selected: string[]; options: string[] };
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

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.filterSidebar}>
      {isMobile && (
        <div className={styles.filterHeader}>
          <h3>FILTERS</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
      )}

      <div className={styles.filterContent}>
        <div className={styles.filterSection}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.customizable}
              onChange={() => handleFilterChange('customizable', '')}
            />
            <span>CUSTOMIZABLE</span>
          </label>
        </div>

        {Object.entries(filters).map(([category, filterData]) => {
          if (category === 'customizable') return null;
          return (
            <div key={category} className={styles.filterSection}>
              <div
                className={styles.filterSectionHeader}
                onClick={() => handleFilterExpand(category as keyof FilterState)}
              >
                <h3>{category.toUpperCase()}</h3>
                {expandedFilter === category ? (
                  <ChevronUp className={styles.expandIcon} />
                ) : (
                  <ChevronDown className={styles.expandIcon} />
                )}
              </div>
              {expandedFilter === category && (
                <div className={styles.filterSectionContent}>
                  {(filterData as { options: string[] }).options.map((option) => (
                    <label key={option} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={(filterData as { selected: string[] }).selected.includes(option)}
                        onChange={() => handleFilterChange(category as keyof FilterState, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
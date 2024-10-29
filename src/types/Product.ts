export interface Product {
  id: string;
  title: string;
  name: string;
  price: number;
  rating: Rating;
  image: string;
  category: string;
  customizable?: boolean;
  idealFor?: string[];
  occasion?: string[];
  fabric?: string[];
  createdAt: string | Date;
}

export type FilterState = {
  customizable: boolean;
  idealFor: {
    selected: string[];
    options: string[];
  };
  occasion: {
    selected: string[];
    options: string[];
  };
  fabric: {
    selected: string[];
    options: string[];
  };
  work: {
    selected: string[];
    options: string[];
  };
  segment: {
    selected: string[];
    options: string[];
  };
  suitableFor: {
    selected: string[];
    options: string[];
  };
  rawMaterial: {
    selected: string[];
    options: string[];
  };
  pattern: {
    selected: string[];
    options: string[];
  };
};

export interface Rating {
  rate: number;   
  count: number;  
}
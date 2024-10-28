const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  getAllProducts: async (sort?: 'asc' | 'desc', limit?: number) => {
    let url = `${BASE_URL}/products`;
    if (sort || limit) {
      url += '?';
      if (sort) url += `sort=${sort}`;
      if (limit) url += `${sort ? '&' : ''}limit=${limit}`;
    }
    const res = await fetch(url);
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    return res.json();
  },

  getProductsByCategory: async (category: string) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    return res.json();
  }
};
import { useEffect } from "react";
import { useCatalogStore } from "../store/useCatalogStore";
import { fetchCategories, fetchProducts } from "../api/catalogApi";

export const useCatalog = () => {
  const {
    categories,
    products,
    selectedCategoryId,
    isLoadingCategories,
    isLoadingProducts,
    error,
    setCategories,
    setProducts,
    setSelectedCategoryId,
    setLoadingCategories,
    setLoadingProducts,
    setError,
  } = useCatalogStore();

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      setError(null);

      try {
        const data = await fetchCategories();
        if (data) {
          setCategories(data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Categories fetch failed",
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      setError(null);

      try {
        const data = await fetchProducts();
        if (data) setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Products fetch failed");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  return {
    categories,
    products,
    selectedCategoryId,
    isLoadingCategories,
    isLoadingProducts,
    error,
    selectCategory: setSelectedCategoryId,
  };
};

import { useEffect, useState } from "react";
import CategoriesService from "@/services/categories.service";
import { Category } from "@/types/products/categories.type";
import { useRouter } from "next/router";

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleDelete = async (id: any) => {
    try {
      await CategoriesService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await CategoriesService.getCategories();
      setCategories(response?.data);

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  const handleRouter = async (e: any, id: any) => {
    router.push(`/admin/category/${id}`);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Categories List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {categories &&
        categories.map((category: Category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button onClick={(e) => handleRouter(e, category?.id)}>
                update
              </button>
              <button onClick={() => handleDelete(category.id)}>delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategoriesList;

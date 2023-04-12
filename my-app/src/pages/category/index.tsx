import { useEffect } from "react";
import CategoriesService from "@/services/categories.service";
import { Category, PropsCategory } from "@/types/products/categories.type";
import { useRouter } from "next/router";

const categories = ({ categories }: PropsCategory) => {
  const router = useRouter();

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleRoute = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    router.push(`/category/${id}`);
  };

  return (
    <div className="homeProducts">
      <h1>All categories</h1>
      <div className="Products">
        {categories.map((category: Category) => (
          <div className="card" key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <button onClick={(e) => handleRoute(e, category.id)}>
              Voir la Category
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default categories;

export async function getStaticProps() {
  const categoriesData = await CategoriesService.getCategories();
  const categories = categoriesData?.data;

  return {
    props: {
      categories,
    },
  };
}

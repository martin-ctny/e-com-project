import AddToCart from "@/components/products/AddToCart";
import CategoriesService from "@/services/categories.service";
import { Category } from "@/types/products/categories.type";
import { Product } from "@/types/products/product.type";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CategoryId = ({ categoryData }: any) => {
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{categoryData.name}</h1>
      <p>{categoryData.description}</p>
      {categoryData.products.length > 0 ? (
        categoryData.products.map((product: Product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <AddToCart productData={product} />
          </div>
        ))
      ) : (
        <p>Aucun produit disponible dans cette catégorie pour le moment.</p>
      )}
    </div>
  );
};

export default CategoryId;

export async function getStaticPaths() {
  const categoriesData = await CategoriesService.getCategories();
  const paths = categoriesData?.data.map((category: Category) => ({
    params: { id: category.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const categoryData = await CategoriesService.getOneCategory(params.id);
  return {
    props: {
      categoryData,
    },
  };
}

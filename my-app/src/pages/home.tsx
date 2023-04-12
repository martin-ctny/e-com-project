import { useEffect } from "react";
import ProductsService from "../services/products.service";
import { useRouter } from "next/router";
import { Product, Props } from "@/types/products/product.type";
import CategoriesService from "@/services/categories.service";
import { Category, PropsCategory } from "@/types/products/categories.type";

const Home = ({ products, categories }: { products: any; categories: any }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleRouterProducts = () => {
    router.push(`/products`);
  };

  const handleRouteCategory = () => {
    router.push(`/category`);
  };
  return (
    <div className="allProducts">
      <h1>3 recents Products</h1>
      <div className="products">
        {products.slice(0, 3).map((product: Product) => (
          <div className="card" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleRouterProducts}>Voir Plus</button>
      <h1>3 recents Categories</h1>
      <div className="products">
        {categories.slice(0, 3).map((category: Category) => (
          <div className="card" key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
      <button onClick={handleRouteCategory}>Voir Plus</button>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const categoriesData = await CategoriesService.getCategories();
  const categories = categoriesData?.data;

  const productsData = await ProductsService.getProducts();
  const products = productsData?.data;

  return {
    props: {
      categories,
      products,
    },
  };
}

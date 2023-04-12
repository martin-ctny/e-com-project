import ProductsService from "@/services/products.service";
import { Product, Props } from "@/types/products/product.type";
import { useRouter } from "next/router";
import { useState } from "react";

const Products = ({ products }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRouter = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    router.push(`/products/${id}`);
  };

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homeProducts">
      <h1>All Products</h1>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="Products">
        {filteredProducts.map((product: Product) => (
          <div className="card" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={(e) => handleRouter(e, product.id)}>
              voir le produit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

export async function getStaticProps() {
  const productsData = await ProductsService.getProducts();
  const products = productsData?.data;

  return {
    props: {
      products,
    },
  };
}

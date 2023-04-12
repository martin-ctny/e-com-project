import ProductsService from "@/services/products.service";
import { Props } from "@/types/products/product.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await ProductsService.getProducts();
      setProducts(response?.data);

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async (e: any, id: any) => {
    router.push(`/admin/product/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await ProductsService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {products &&
        products.map((product: any) => (
          <div key={product?.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={(e) => handleUpdate(e, product?.id)}>
              modifier
            </button>
            <button onClick={() => handleDelete(product?.id)}>supprimer</button>
          </div>
        ))}
    </div>
  );
};

export default ProductList;

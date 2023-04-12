import AddToCart from "@/components/products/AddToCart";
import ProductsService from "@/services/products.service";
import { Product } from "@/types/products/product.type";
import { useRouter } from "next/router";
import { useEffect } from "react";

const uuid = ({ productData }: { productData: Product }) => {
  const router = useRouter();
  console.log(router);
  const query = router.query.id;

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
      <p>{productData.price}</p>
      <AddToCart productData={productData} />
    </div>
  );
};

export default uuid;

export async function getStaticPaths() {
  const productsData = await ProductsService.getProducts();
  const paths = productsData?.data.map((product: Product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const productData = await ProductsService.getOneProduct(params.id);
  return {
    props: {
      productData,
    },
  };
}

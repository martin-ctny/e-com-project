import ProductsService from "@/services/products.service";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

const UpdateProduct = () => {
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductsService.getOneProduct(id);
        setUpdatedProduct(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  useEffect(() => {
    console.log(updatedProduct);
  }, [updatedProduct]);

  const handleUpdateClick = async () => {
    try {
      const response = await ProductsService.updateProduct(id, {
        title: updatedProduct.title,
        description: updatedProduct.description,
        price: updatedProduct.price,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Modifier le produit</h1>
      <form>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="title"
            value={updatedProduct?.title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            value={updatedProduct?.description}
            name="description"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            name="price"
            value={updatedProduct?.price}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button type="button" onClick={handleUpdateClick}>
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

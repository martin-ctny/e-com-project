import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsService from "@/services/products.service";
import { Product, ProductForm } from "@/types/products/product.type";
import ProductList from "@/components/products/ProductList";
import CategoriesService from "@/services/categories.service";
import { Category } from "@/types/products/categories.type";

const CreateProductForm = () => {
  const [formData, setFormData] = useState<ProductForm>({
    title: "",
    description: "",
    price: 0,
    category: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    selectedId: string
  ) => {
    setFormData({ ...formData, category: selectedId });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await ProductsService.createProduct(formData);
      console.log("Product created:", response.data);
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoriesService.getCategories();
      setCategories(response?.data);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="title"
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={handleChange}
          required
        />
        <select
          name="category"
          onChange={(e) => handleSelect(e, e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit">Create Product</button>
      </form>
      <ProductList />
    </>
  );
};

export default CreateProductForm;

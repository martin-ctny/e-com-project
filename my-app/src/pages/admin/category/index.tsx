import React, { useEffect, useState } from "react";
import CategoriesService from "@/services/categories.service";
import { CategoryForm } from "@/types/products/categories.type";
import CategoriesList from "@/components/category/CategoryList";

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState<CategoryForm>({
    name: "",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await CategoriesService.createCategory(formData);
      console.log("Category created:", response.data);
    } catch (error) {
      console.log("Error creating category:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoriesService.getCategories();
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
          name="name"
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
        />

        <button type="submit">Create Category</button>
      </form>

      <CategoriesList />
    </>
  );
};

export default CreateCategoryForm;

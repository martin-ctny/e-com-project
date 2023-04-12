import React, { useState, useEffect } from "react";
import CategoriesService from "@/services/categories.service";
import { useRouter } from "next/router";

const UpdateCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  const [updatedCategory, setUpdatedCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await CategoriesService.getOneCategory(id);
        setUpdatedCategory(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  useEffect(() => {
    console.log(updatedCategory);
  }, [updatedCategory]);

  const handleUpdateClick = async () => {
    try {
      const response = await CategoriesService.updateCategory(id, {
        name: updatedCategory.name,
        description: updatedCategory.description,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Modifier la catégorie</h1>
      <form>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <button type="button" onClick={handleUpdateClick}>
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  async function saveCategory(event) {
    event.preventDefault();
    const data = { name, parentCategory };
    console.log("data", data);
    if (editedCategory) {
      await axios.put(`/api/categories/`, {
        name,
        parentCategory,
        _id: editedCategory._id,
      });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
  }

  function editCategory(category) {
    console.log("edit category", category);
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  //function deleteCategory
  function deleteCategory(category) {
    console.log("delete category", category);
    swal
      .fire({
        title: "Are you sure?",
        text: `You will not be able to recover ${category.name}!`,
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/categories?_id=${category._id}`);
          swal.fire(
            "Deleted!",
            `${category.name} has been deleted.`,
            "success"
          );
        }
      });
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    }
    fetchCategories();
  }, [categories]);

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory?.name}`
          : "Add new category"}
      </label>
      <form onSubmit={saveCategory} className="flex  gap-1">
        <input
          type="text"
          className="mb-0"
          placeholder="Category name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <select
          className="mb-0"
          onChange={(event) => setParentCategory(event.target.value)}
          value={parentCategory}
        >
          <option value="">No parent category</option>
          {categories &&
            categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-primary "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);

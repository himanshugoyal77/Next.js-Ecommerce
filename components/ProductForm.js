import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import upload from "../lib/upload";
import { set } from "mongoose";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: existingProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState(existingProperties || {});

  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price, images, category, properties };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImage(e) {
    setLoading(true);
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      data.append("upload_preset", "fiverr");
      const url = await upload(data);
      console.log("url", url);
      setImages((oldImages) => {
        return [...oldImages, url];
      });
    }
    setLoading(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find((cat) => cat._id === category);
    propertiesToFill.push(...(catInfo?.properties || []));
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        (cat) => cat._id === catInfo.parent._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  console.log("properties", properties);

  function setProductProp(name, value) {
    setProperties((oldProperties) => {
      return { ...oldProperties, [name]: value };
    });
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="">Product name</label>
      <input
        type="text"
        placeholder="product name"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label htmlFor="">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">uncategorized</option>
        {categories.length > 0 &&
          categories.map((category, i) => {
            return (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            );
          })}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((property, i) => {
          return (
            <div key={i} className="flex gap-1">
              <div className="">{property.name}</div>
              <select
                value={properties[property.name]}
                onChange={(e) => setProductProp(property.name, e.target.value)}
              >
                {property.values.map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      <label htmlFor="">Photos</label>
      <div className="mb-2 flex gap-2">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images.length > 0 &&
            images.map((image, i) => (
              <div key={i} className="flex">
                <img src={image} alt="f" className="w-24 h-24 object-cover" />
              </div>
            ))}
        </ReactSortable>
        {loading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 flex justify-center text-center items-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div className="">Upload</div>
          <input type="file" onChange={uploadImage} className="hidden" />
        </label>
        {/* {!images?.length && <div className="">No photos in this product</div>} */}
      </div>
      <label htmlFor="">Description</label>
      <textarea
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <label htmlFor="">Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}

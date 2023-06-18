import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products?id=${id}`).then((res) => setProductInfo(res.data));
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  function deleteProduct() {
    axios.delete(`/api/products?id=${id}`).then((res) => {
      goBack();
    });
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete&nbsp;"{productInfo?.title}"?
      </h1>

      <div className="flex  gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}

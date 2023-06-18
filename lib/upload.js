import axios from "axios";

const upload = async (data) => {
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dw3bphpot/image/upload",
      data
    );
    const { url } = res.data;
    console.log(url);
    return url;
  } catch (err) {
    console.log(err);
  }
  console.log(data);
};

export default upload;

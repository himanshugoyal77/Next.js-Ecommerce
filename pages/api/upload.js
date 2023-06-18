import multiparty from "multiparty";

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length", files);
  console.log(fields);
  res.status(200).json({ message: "ok" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

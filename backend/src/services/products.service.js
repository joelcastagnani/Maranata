import Product from "../models/product.model.js";

const create = async (data) => {
  const one = await Product.create(data);
  return one;
};
const read = async (page) => {
  const all = await Product.paginate(
    {},
    { page, sort: { name: 1 }, select: "-createdAt -updatedAt -__v" } 
  );
  return all;
};

export { create, read };

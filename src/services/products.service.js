import Product from "../dao/models/product.model.js";
import { createMockProduct } from "../utils/mocks.util.js";

const create = async (data) => {
  try {
    const one = await Product.create(data);
  return one;
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
};
const read = async (page) => {
  const all = await Product.paginate(
    {},
    { page, sort: { name: 1 }, select: "-createdAt -updatedAt -__v" }
  );
  return all;
};
const createMock = async () => {
  const data = createMockProduct();
  const one = await Product.create(data);
  return one;
};
const createMocks = async (quantity) => {
  const prods = [];
  for (let i = 0; i < quantity; i++) {
    const one = await createMock();
    prods.push(one);
  }
  return prods;
};
const deleteProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Producto no encontrado');
  }
  return await Product.findByIdAndDelete(id);
};
const updateProductService = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

export { create, read, createMock, createMocks, deleteProductService, updateProductService };

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "tortillas",
        "papa",
        "verdura",
        "pizas",
        "empanadas",
        "tartas",
        "pastas",
        "pollo",
        "carne",
        "frituras",
        "milanesas",
      ],
    },
    subcategory: {
      type: String,
      enum: [
        // Subcategorías para "papa"
        "comun",
        "reyena",
        // Subcategorías para "pizas"
        "mozzarella",
        "especial",
        "calabresa",
        "napolitana",
        "fugazzeta",
        // Subcategorías para "empanadas"
        "carne",
        "pollo",
        "jamon y queso",
        "humita",
        "fatay",
        "maranata",
        // Subcategorías para "tartas"
        "jamon y queso",
        "verdura",
        "jamon queso tomate y huevo",
        "calabaza",
        "calzone napolitano",
        // Subcategorías para "pastas"
        "tallarines",
        "ravioles",
        "sorrentinos",
        "lasagna",
        "gnoquis",
        "pastel de papas",
        // Subcategorías para "salsas"
        "roja",
        "blanca",
        "mixta",
        "bolognesa",
        // Subcategorías para "pollo"
        "cuarto",
        "medio",
        "entero",
        // Subcategorías para "carne"
        "asado",
        "chorizo",
        // Subcategorías para "frituras"
        "papas fritas",
        "bomba de papa",
        "croqueta de verdura",
        // Subcategorías para "milanesas"
        "comun",
        "napolitana",
        "pollo",
        "carne",
      ],
    },
    image: {
      type: String,
      //   trim: true, // URL de la imagen del producto (opcional)
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

productSchema.plugin(mongoosePaginate);


const Product = mongoose.model("Product", productSchema);
export default Product;

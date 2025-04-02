import React, { useState } from "react";
import "./ProductForm.css";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    image: "",
  });
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);

  const categories = ['tortillas', 'pizas', 'empanadas', 'tartas', 'pastas', 'parrilla', 'frituras', 'milanesas'];
  const subcategoriesMap = {
    tortillas: ['papa', 'verdura'],
    pizas: ['muzzarella', 'napolitana', 'fugazzeta', 'especial', 'calabresa'],
    empanadas: ['carne', 'pollo', 'jamón y queso', 'humita', 'fatay', 'maranata'],
    tartas: ['verdura', 'Jamon y queso', 'JQTyH', 'calabaza (tricolor)', 'calzone napolitano', 'pollo'],
    pastas: ['ravioles', 'ñoquis', 'tallarines', 'sorrentinos', 'lasagna', "pastel de papa"],
    pollo: ['cuarto', 'medio', 'entero'],
    parrilla: ['Asado', 'Chorizo'],
    frituras: ['papas fritas', 'bomba de papa', 'croqueta de verdura'],
    milanesas: ['comun', 'napolitana'],
  };

  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Producto creado exitosamente: " + JSON.stringify(data));
        setFormData({ name: "", description: "", price: "", category: "", subcategory: "", image: "" });
      } else {
        const error = await response.json();
        alert("Error al crear el producto: " + error.message);
      }
    } catch (error) {
      alert("Error en la conexión con el servidor: " + error.message);
    }
  };

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);
  
  const openSubcategoryModal = () => setIsSubcategoryModalOpen(true);
  const closeSubcategoryModal = () => setIsSubcategoryModalOpen(false);

  const selectCategory = (category) => {
    setFormData((prevData) => ({ ...prevData, category, subcategory: "" }));
    setAvailableSubcategories(subcategoriesMap[category] || []);
    closeCategoryModal();
    openSubcategoryModal();
  };

  const selectSubcategory = (subcategory) => {
    setFormData((prevData) => ({ ...prevData, subcategory }));
    closeSubcategoryModal();
  };

  return (
    <>
      <form className="prodFormContainer" onSubmit={handleSubmit}>
        <div className="prodInputsContainer">
          <div className="prodInput">
            <label htmlFor="name">Nombre del Producto:</label>
            <input className="prodInputBar" type="text" id="name" name="name" placeholder="Nombre del producto" value={formData.name || ""} onChange={handleChange} required />
          </div>
          <div className="prodInput">
            <label htmlFor="description">Descripción:</label>
            <textarea className="prodInputBar" id="description" name="description" placeholder="Descripción del producto" rows="4" value={formData.description || ""} onChange={handleChange} required></textarea>
          </div>
          <div className="prodInput">
            <label htmlFor="price">Precio:</label>
            <input className="prodInputBar" type="text" id="price" name="price" placeholder="Precio" value={formData.price || ""} onChange={handleChange} required />
          </div>
          <div className="prodInput">
            <label>Categoría:</label>
            <button type="button" className="prodInputBar select" onClick={openCategoryModal}>{formData.category || "Seleccionar Categoría"}</button>
          </div>
          <div className="prodInput">
            <label>Subcategoría:</label>
            <button type="button" className="prodInputBar select" onClick={openSubcategoryModal} disabled={!formData.category}>{formData.subcategory || "Seleccionar Subcategoría"}</button>
          </div>
          <div className="prodInput">
            <label htmlFor="image">Imagen (URL):</label>
            <input className="prodInputBar" type="text" id="image" name="image" placeholder="URL de la imagen" value={formData.image || ""} onChange={handleChange} required />
          </div>
        </div>
        <button className="prodSubmit" type="submit">Enviar</button>
      </form>
      
      {isCategoryModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Seleccionar Categoría</h2>
            <ul>
              {categories.map((cat) => (
                <li key={cat} onClick={() => selectCategory(cat)}>{cat}</li>
              ))}
            </ul>
            <button onClick={closeCategoryModal}>Cerrar</button>
          </div>
        </div>
      )}

      {isSubcategoryModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Seleccionar Subcategoría</h2>
            <ul>
              {availableSubcategories.map((sub) => (
                <li key={sub} onClick={() => selectSubcategory(sub)}>{sub}</li>
              ))}
            </ul>
            <button onClick={closeSubcategoryModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductForm;

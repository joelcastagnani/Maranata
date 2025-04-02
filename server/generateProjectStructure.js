import fs from "fs";
import path from "path";

// Función recursiva para recorrer directorios
const readDirectory = (dirPath) => {
  const items = fs.readdirSync(dirPath); // Leer los archivos y carpetas dentro del directorio
  const result = {};

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item); // Obtener la ruta completa del archivo o carpeta
    const stat = fs.statSync(fullPath); // Obtener información sobre el archivo o carpeta

    if (stat.isDirectory()) {
      // Si es un directorio, llamar recursivamente
      result[item] = readDirectory(fullPath);
    } else {
      // Si es un archivo, agregarlo al objeto
      result[item] = null;
    }
  });

  return result;
};

// Ruta inicial del proyecto
const projectDir = path.join(process.cwd(), "client"); // Cambia 'client' a la ruta de tu proyecto si es necesario

// Obtener la estructura del proyecto
const structure = readDirectory(projectDir);

// Guardar la estructura como un archivo JSON
fs.writeFileSync(
  "project-structure.json",
  JSON.stringify(structure, null, 2),
  "utf-8"
);

console.log(
  "La estructura del proyecto se ha guardado en project-structure.json"
);

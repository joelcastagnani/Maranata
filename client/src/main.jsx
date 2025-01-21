import { StrictMode } from 'react'
import reactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Modal from "react-modal";

const root = reactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// reactDOM.createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

Modal.setAppElement("#root");
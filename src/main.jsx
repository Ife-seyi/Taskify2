import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <DndProvider backend={HTML5Backend}>
        <>
          <Toaster position="top-right" />
          <App />
        </>
      </DndProvider>
    </Router>
  </React.StrictMode>
);

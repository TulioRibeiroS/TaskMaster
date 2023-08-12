import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import CardGrid from "./pages/list";
import Form from "./pages/form";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="list-task" element={<CardGrid />} />
        <Route path="add-task" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

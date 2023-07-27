import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import NoPage from "./components/NoPage/NoPage";
import { AddRecords } from "./components/AddRecords/AddRecords";
import { EditRecords } from "./components/AddRecords/EditRecords";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecords />}></Route>
        <Route path="/:status/:id" element={<EditRecords />}></Route>
        <Route exact path="login" element={<LoginPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

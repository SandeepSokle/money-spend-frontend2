import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import NoPage from "./components/NoPage/NoPage";
import { AddRecords } from "./components/AddRecords/AddRecords";
import { EditRecords } from "./components/AddRecords/EditRecords";
import Protected from "./ProtectedRouter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <AddRecords />
            </Protected>
          }
        ></Route>
        <Route
          path="/:status/:id"
          element={
            <Protected>
              <EditRecords />
            </Protected>
          }
        ></Route>
        <Route exact path="login" element={<LoginPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginPage from "./components/LoginPage/LoginPage";
import NoPage from "./components/NoPage/NoPage";
import { AddRecords } from "./components/AddRecords/AddRecords";
import { EditRecords } from "./components/AddRecords/EditRecords";
import Protected from "./ProtectedRouter";
import ProfilePage from "./components/Home/Profile";
import HistoryPage from "./components/Home/HistoryPage";

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
          path="/profile"
          element={
            <Protected>
              <ProfilePage />
            </Protected>
          }
        ></Route>
        <Route
          path="/history"
          element={
            <Protected>
              <HistoryPage />
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

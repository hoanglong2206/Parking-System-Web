import { Routes, Route } from "react-router-dom";
import { Dashboard, Home, Login, Register } from "@/pages";
import { AdminLayout } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="app/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/context/store/store";

const AdminProtect = ({ children }: { children: React.ReactNode }) => {
  function IsAuthenticated() {
    const auth = useSelector((state: RootState) => state.auth);
    if (auth.token && auth.user.role === "user") {
      return true;
    }
    return false;
  }
  if (IsAuthenticated()) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default AdminProtect;

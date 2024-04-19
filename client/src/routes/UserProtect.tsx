import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/context/store/store";

const UserProtect = () => {
  function IsAuthenticated() {
    const auth = useSelector((state: RootState) => state.auth);
    if (auth.token) {
      return true;
    }
    return false;
  }
  if (IsAuthenticated()) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default UserProtect;

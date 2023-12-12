import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);    

  return (
    currentUser != null ? <Outlet /> : <Navigate to="/log-in" />
  )
}

export default PrivateRoutes
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

const useUser = () => useContext(UserContext);

export default useUser;
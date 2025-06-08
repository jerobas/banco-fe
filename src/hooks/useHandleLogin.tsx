import { useNavigate } from "react-router-dom";
import { saveUserInStorage } from "../services/Auth";
import ApiService from "../api/index";

export const useHandleLogin = () => {
    const navigate = useNavigate();

    const handleLogin = async (_, formData) => {
        const name = formData.get("name")

        if (typeof (name) !== "string" || !name.trim()) return true;

        try {
            const response = await ApiService.post("/users", { name });
            if (response.status === 201) {
                await new Promise(r => setTimeout(r, 2000));
                saveUserInStorage(JSON.stringify(response.data));
                navigate("/");
                return false;
            }
            return true;
        } catch (err) {
            throw new Error(err);
        }
    };

    return handleLogin;
}
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { passwordChange } from "../../services/authService/apiPasswordChange";

export function useChangePassword() {
  const navigate = useNavigate();

  const { mutate: changePassword, isLoading: isChanging } = useMutation({
    mutationFn: passwordChange,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("SIGNIN DATA2", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { changePassword, isChanging };
}

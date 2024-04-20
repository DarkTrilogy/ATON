import { useMutation } from "@tanstack/react-query";
import { signIn as signInApi } from "../../services/authService/apiSignIn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: ({ login, password }) => {
      return signInApi({ login, password });
    },
    onSuccess: (user, variables) => {
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("SIGNIN DATA2", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { signIn, isLoading };
}

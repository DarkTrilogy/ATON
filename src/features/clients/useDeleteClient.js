import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteClientFromUser } from "../../services/userService/apiClients";
import { useNavigate } from "react-router-dom";

export function useDeleteClient() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteClient, isLoading: isDeleting } = useMutation({
    queryKey: ["clients"],
    mutationFn: ({ clientId }) => {
      console.log("useDeleteClient", clientId);
      return deleteClientFromUser(localStorage.getItem("login"), clientId);
    },
    onSuccess: () => {
      toast.success("Client deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
      navigate("/clients");
    },
    onError: (err) => {
      toast.error("Something went wrong");
    },
    retry: false,
  });

  return { isDeleting, deleteClient };
}

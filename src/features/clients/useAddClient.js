import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addClientToUser } from "../../services/userService/apiClients";

export function useAddClient() {
  const { mutate: addClient, isLoading } = useMutation({
    // queryKey: ["user"],
    mutationFn: (client) => {
      console.log("useAddClient1", client);
      return addClientToUser(localStorage.getItem("login"), client);
    },
    onSuccess: () => {
      toast.success("Client added successfully");
    },
    onError: (err) => {
      toast.error("Something went wrong");
    },
    retry: false,
  });

  return { isLoading, addClient };
}

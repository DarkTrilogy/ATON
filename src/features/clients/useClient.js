import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClientById } from "../../services/userService/apiClients";

export function useClient() {
  const { clientId } = useParams();
  console.log("jas;dlfjlsa", clientId);

  const {
    isLoading,
    data: client,
    error,
  } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
    retry: false,
  });

  return { isLoading, error, client };
}

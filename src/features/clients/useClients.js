import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUserByLogin } from "../../services/userService/apiUsers";

export function useClients() {
  const [searchParams] = useSearchParams();

  const accountNumber = searchParams.get("search");

  let {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getUserByLogin(localStorage.getItem("login")),
  });

  let clients = data.clients || [];

  if (accountNumber) {
    clients = clients.filter((client) => {
      return client.accountNumber.includes(accountNumber);
    });
  }

  return { isLoading, error, clients };
}

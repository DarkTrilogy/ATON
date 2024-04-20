import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, error, data: user } = useUser();

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (error) {
    console.error(error);
    navigate("/error");
  }

  if (user?.role !== "authenticated") {
    navigate("/login");
  }

  if (user?.role === "authenticated") {
    return children;
  }
}

export default ProtectedRoute;

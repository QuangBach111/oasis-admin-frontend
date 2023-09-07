/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the current user
  const { user, isLoading } = useUser();

  // 2. While loading, show a spinner                 
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const isAuthenticated = user?.role === "ROLE_USER";

  // 3. If the is not user, return login
  if (!isAuthenticated)
    navigate("/login");

  // 4. If there is a user, render the app
  return children;
}

export default ProtectedRoute;

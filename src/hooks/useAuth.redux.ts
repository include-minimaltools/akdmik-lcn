import { useDispatch } from "react-redux";
import { useAppSelector } from "redux-store";
import { authenticate, AuthState } from "redux-store/auth";

const useReduxAuth = () => {
  const { user, isAuthenticated, token } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  return {
    user,
    authenticate: (state: AuthState) => dispatch(authenticate(state)),
    isAuthenticated,
    token,
  };
};

export default useReduxAuth;

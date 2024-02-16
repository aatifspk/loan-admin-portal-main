import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";
import AuthService from "../services/auth.services";

const login = (email, password, rememberMe) => (dispatch) => {
  return (
    AuthService.login(email, password, rememberMe)
      // return AuthService.login
      .then(
        (data) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
          });
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch({
            type: LOGIN_FAIL,
          });
          // console.log(error);
          // dispatch({
          //     type: LOGIN_FAIL,
          //   });

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject();
        }
      )
  );
};

export default { login };

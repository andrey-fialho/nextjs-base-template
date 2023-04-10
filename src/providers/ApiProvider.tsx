import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import { useSnackbar } from 'notistack';
import { createContext, useContext } from 'react';
import { HttpCode } from '@/constants/http-code';
import { UserService } from '@/services/UserService';

interface IApiContext {
  api: AxiosInstance;
  userService: UserService;
}
const ApiContext = createContext<IApiContext>({} as IApiContext);
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const ApiProvider: React.FC<any> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  function showSnackbar(message: string) {
    enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  }

  async function errorHandler(axiosError: AxiosError<ApiError>) {
    const response = axiosError.response;
    if (!response)
      return {
        success: false,
        error: {
          type: 'GENERIC',
          message: "Can't process your request. Try again later.",
        },
      };

    const { data: error } = response;

    let message = error.message;

    if (message) {
      showSnackbar(message);
      return { success: false, error };
    }

    switch (response.status) {
      case HttpCode.BadRequest:
        message = "Can't process your request. Try again later.";
        break;
      case HttpCode.Forbidden:
        message = "Sorry, you don't have access to this resource.";
        break;
      case HttpCode.NotFound:
        message = 'Could not find the item you are looking for.';
        break;
      default:
        message = 'An error has ocurred. Try again later.';
        break;
    }

    showSnackbar(message);

    return { success: false, error };
  }

  api.interceptors.response.use((response) => {
    return { success: true, data: response.data } as any;
  }, errorHandler);

  const context = {
    api,
    userService: new UserService(api),
  };

  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);

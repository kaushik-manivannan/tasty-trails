import { AxiosError } from 'axios';

export const handleAxiosError = (error: AxiosError<ErrorResponse>): string => {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message ?? 'Unknown Error';
  
      if (statusCode === 400) {
        return 'Bad Request: ' + errorMessage;
      } else if (statusCode === 401) {
        return 'Unauthorized: ' + errorMessage;
      } else if (statusCode === 403) {
        return 'Forbidden: ' + errorMessage;
      } else {
        return errorMessage;
      }
    }
  
    return 'An unexpected error occurred.';
  };


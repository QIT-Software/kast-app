export const getErrorMessage = (error: any): string => {
  if (error.message) return error.message;
  return 'We are already working to fix this problem. Please try again';
};

export const getErrorDetails = (error: any): string => {
  let details: string;
  if (error.data) {
    details = JSON.stringify(error.data);
  } else if (
    error.graphQLErrors &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors[0].message
  ) {
    details = JSON.stringify(error.graphQLErrors[0].message);
  } else {
    details = JSON.stringify(error);
  }

  return details;
};

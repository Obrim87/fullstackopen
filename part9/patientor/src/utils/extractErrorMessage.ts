const extractErrorMessage = (errorMessage: string) => {
  return errorMessage.substring(
    errorMessage.indexOf('Error:'),
    errorMessage.indexOf('<br>')
  );
};

export default extractErrorMessage;

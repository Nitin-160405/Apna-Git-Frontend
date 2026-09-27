export function getAuthErrorMessage(error, fallbackMessage) {
  const serverMessage = error?.response?.data?.message;

  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage;
  }

  if (error?.code === "ECONNABORTED") {
    return "The authentication server took too long to respond. Please try again.";
  }

  if (!error?.response) {
    return "Cannot reach the authentication server. Make sure the backend is running.";
  }

  return fallbackMessage;
}

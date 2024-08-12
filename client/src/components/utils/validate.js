export const checkValidateData = (email) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  if (!isEmailValid) {
    return "Email should contain valid characters, including an '@' symbol and a domain (e.g., user@example.com).";
  }

  return null;
};

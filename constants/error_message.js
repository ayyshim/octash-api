module.exports = {
  status: {
    UNAUTHORIZED: 401,
    NOT_ACCEPTABLE: 406,
    NOT_FOUND: 404,
    FORBIDDEN: 403
  },
  message: {
    INVALID_CREDENTIALS: "Invalid username or password.",
    USERNAME_NOT_AVAILABLE: "Username is not available.",
    EMAIL_NOT_AVAILABLE: "Email is already in use.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    PROJECT_NOT_FOUND: "Project not found.",
    PROJECT_API_IS_UNDEFINED_OR_NULL: "Project api key is undefined or nulled.",
    PROJECT_API_INVALID: "Invalid project api.",
    USERBASE_EMAIL_EXIST: "Email is already in use.",
    USERBASE_INVALID_EMAIL: "Email can not be found to be associated with any user in our database.",
    USERBASE_INVALID_PASSWORD: "Password do not match to the corresponding user email.",
    USERBASE_INVALID_USER: "User not found."
  }
};

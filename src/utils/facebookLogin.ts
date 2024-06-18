export const getFacebookOAuthURL = () => {
  return `${import.meta.env.VITE_PROXY_TARGET}/api/sessions/oauth/facebook/auth`;
}
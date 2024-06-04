type PromptOption = "none" | "consent" | "select_account";

export const getGoogleOAuthURLAuth = (promptOption: PromptOption) => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const config = {
    GoogleOAuthRedirectUrl: `${import.meta.env.VITE_PROXY_TARGET}/api/sessions/oauth/google/auth`,
    GoogleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
  }
  const options: {
    redirect_uri?: string;
    client_id: string;
    access_type: string;
    response_type: string;
    prompt: PromptOption;
    scope: string;
  } = {
    redirect_uri: config.GoogleOAuthRedirectUrl,
    client_id: config.GoogleClientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: promptOption,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

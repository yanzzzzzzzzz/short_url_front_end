type PromptOption = "none" | "consent" | "select_account";

export const getGoogleOAuthURLSignUp = (promptOption: PromptOption) => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const config = {
    GoogleOAuthRedirectUrl: "http://localhost:4001/api/sessions/oauth/google/signup",
    GoogleClientId: "393147601550-fikm3621o6j5ub41cntmnp3clh9uhhjf.apps.googleusercontent.com"
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
    client_id: config.GoogleClientId as string,
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

export const getGoogleOAuthURLLogin = (promptOption: PromptOption) => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const config = {
    GoogleOAuthRedirectUrl: "http://localhost:4001/api/sessions/oauth/google/login",
    GoogleClientId: "393147601550-fikm3621o6j5ub41cntmnp3clh9uhhjf.apps.googleusercontent.com"
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
    client_id: config.GoogleClientId as string,
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
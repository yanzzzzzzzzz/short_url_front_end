function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const config = {
    GoogleOAuthRedirectUrl: "http://localhost:4001/api/sessions/oauth/google",
    GoogleClientId: "393147601550-fikm3621o6j5ub41cntmnp3clh9uhhjf.apps.googleusercontent.com"
  }
  const options: {
    redirectUrl?: string;
    clientId: string;
    accessType: string;
    responseType: string;
    prompt: string;
    scope: string;
  } = {
    redirectUrl: config.GoogleOAuthRedirectUrl,
    clientId: config.GoogleClientId as string,
    accessType: 'offline',
    responseType: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
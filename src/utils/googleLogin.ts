function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const config = {
    GoogleOAuthRedirectUrl: "http://localhost:4001/api/sessions/oauth/google",
    GoogleClientId: "393147601550-fikm3621o6j5ub41cntmnp3clh9uhhjf.apps.googleusercontent.com"
  }
  const options: {
    redirect_uri?: string;
    client_id: string;
    access_type: string;
    response_type: string;
    prompt: string;
    scope: string;
  } = {
    redirect_uri: config.GoogleOAuthRedirectUrl,
    client_id: config.GoogleClientId as string,
    access_type: 'offline',
    response_type: 'code',
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
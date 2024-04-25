function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const config = {
    NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL: "http://localhost:4001/api/sessions/oauth/google",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: "393147601550-fikm3621o6j5ub41cntmnp3clh9uhhjf.apps.googleusercontent.com"
  }
  const options: {
    redirect_uri?: string;
    client_id: string;
    access_type: string;
    response_type: string;
    prompt: string;
    scope: string;
  } = {
    redirect_uri: config.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: config.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };
  console.log({ options });

  const qs = new URLSearchParams(options);

  console.log({ qs });

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
const getAccessToken = async () => {
  try {
    console.log('Fetching Spotify Access Token...');
    console.log('SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID);
    // console.log('SPOTIFY_CLIENT_SECRET:', process.env.SPOTIFY_CLIENT_SECRET);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    });

    console.log('Token Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token Fetch Error:', errorData);
      throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    console.log('Access Token Data:', data);
    return data.access_token;
  } catch (error) {
    console.error('Error in getAccessToken:', error.message);
    throw error;
  }
};

export async function GET() {
  try {
    const token = await getAccessToken();
    console.log('Access Token:', token);

    const response = await fetch('https://api.spotify.com/v1/artists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch podcasts');
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

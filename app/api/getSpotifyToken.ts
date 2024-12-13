import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = process.env.SPOTIFY_TOKEN_URL;

  if (!clientId || !clientSecret || !tokenUrl) {
    return res.status(500).json({ error: 'Missing Spotify credentials in environment variables' });
  }

  try {
    // Prepare the Basic Authentication header
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    // Request body for token generation
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    });

    // Make a POST request to the Spotify Token API
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify token: ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json({ accessToken: data.access_token });
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    res.status(500).json({ error: 'Failed to fetch Spotify token' });
  }
}

import { Podcast } from '@/types/Podcast';
import { NextResponse } from 'next/server';

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get('market') || 'ES';
  const limit = 20;

  const queries = ['Christelijk', 'Bijbel', 'Theologie', 'Gebed', 'Apologetiek'];
  let aggregatedResults: Podcast[] = [];

  try {
    const accessToken = await getSpotifyAccessToken();

    for (const query of queries) {
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&market=${market}&limit=${limit}`;
      const response = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
      }

      const searchData = await response.json();
      if (searchData.shows?.items) {
        aggregatedResults = [...aggregatedResults, ...searchData.shows.items];
      }
    }

    // Remove duplicate podcasts by ID
    const uniqueResults = aggregatedResults.filter(
      (item, index, self) => self.findIndex((i) => i.id === item.id) === index
    );

    return NextResponse.json({ items: uniqueResults });
  } catch (error) {
    console.error('Error searching for shows:', error);
    return NextResponse.json({ error: 'Failed to search for shows' }, { status: 500 });
  }
}

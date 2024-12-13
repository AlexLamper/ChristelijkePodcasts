import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { market, ids, q } = req.query;

  // Validate market
  if (!market || typeof market !== 'string' || market.length < 2) {
    return res.status(400).json({ error: 'Invalid market code' });
  }

  try {
    // Construct the Spotify API endpoint
    let apiUrl = `https://api.spotify.com/v1/shows?market=${market}`;

    // Add ids or q if provided
    if (ids) {
      apiUrl += `&ids=${Array.isArray(ids) ? ids.join(',') : ids}`;
    } else if (q) {
      apiUrl += `&q=${q}`;
    }

    // Make the API call
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch podcast shows');
    }

    // Ensure type safety for the response
    const data = (await response.json()) as { shows: Array<{ id: string; name: string; images: { url: string }[] }> };

    res.status(200).json({ shows: data.shows });
  } catch (error) {
    console.error('Error fetching podcast shows:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

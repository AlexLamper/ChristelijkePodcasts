export async function GET(request) {
    try {
      const { ids, market } = request.query;
  
      if (!market || market.length < 2) {
        return new Response(
          JSON.stringify({ error: 'Invalid market code' }),
          { status: 400 }
        );
      }
  
      const accessToken = await getAccessToken();  // Fetch the access token
      console.log('Access Token:', accessToken);
  
      const response = await fetch(`https://api.spotify.com/v1/shows?ids=${ids}&market=${market}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch podcast shows: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Unexpected Error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Unexpected error occurred' }),
        { status: 500 }
      );
    }
  }
  
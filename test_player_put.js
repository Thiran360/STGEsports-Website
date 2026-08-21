async function test() {
  try {
    // 1. First get players to find a valid ID
    const getRes = await fetch('https://api.codingboss.in//sports_app/get-player/', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    const players = await getRes.json();
    console.log('GET players:', players);

    if (players.length > 0) {
      const p = players[0];
      const payload = {
        playerTag: "STGzTest",
        role: "ENTRY",
        description: "Test description",
        instagramUsername: "test.ig",
        instagramLink: "http://test",
        profileImage: null,
        teamName: "STG Esports",
        team: p.team // keep original team ID
      };

      console.log('Trying PUT /sports_app/player/' + p.id + '/');
      const putRes = await fetch(`https://api.codingboss.in//sports_app/player/${p.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(payload)
      });
      console.log('PUT status:', putRes.status);
      console.log('PUT body:', await putRes.text().catch(e => e.message).then(t => t.substring(0, 500)));
    }
  } catch (e) {
    console.error(e);
  }
}
test();

async function test() {
  try {
    const getRes = await fetch('https://api.codingboss.in//sports_app/get-team/', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    const teams = await getRes.json();
    console.log('GET teams:', teams);

    if (teams.length > 0) {
      const t = teams[0];
      const payload = {
        id: t.id,
        teamName: t.teamName + " Edited",
        teamColor: t.teamColor || "#FFFFFF",
        teamLogo: t.teamLogo
      };

      console.log('Trying PUT /sports_app/team/ with ID ' + t.id);
      const putRes = await fetch(`https://api.codingboss.in//sports_app/team/`, {
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

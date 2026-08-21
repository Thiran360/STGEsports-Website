async function test() {
  try {
    const payload = {
      teamName: "STG Esports Edited",
      teamColor: "#FF0000",
      teamLogo: "https://test.com/logo.png"
    };

    console.log('Trying PUT /sports_app/team/ without ID');
    const putRes = await fetch(`https://api.codingboss.in//sports_app/team/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
      body: JSON.stringify(payload)
    });
    console.log('PUT status:', putRes.status);
    console.log('PUT body:', await putRes.text().catch(e => e.message).then(t => t.substring(0, 500)));
  } catch (e) {
    console.error(e);
  }
}
test();

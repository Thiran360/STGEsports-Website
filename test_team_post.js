async function test() {
  try {
    const payload = {
      teamName: "STG Esports POSTED",
      teamColor: "#00FF00",
      teamLogo: "https://test.com/logo2.png"
    };

    console.log('Trying POST /sports_app/team/');
    const postRes = await fetch(`https://api.codingboss.in//sports_app/team/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
      body: JSON.stringify(payload)
    });
    console.log('POST status:', postRes.status);
    console.log('POST body:', await postRes.text().catch(e => e.message).then(t => t.substring(0, 500)));
  } catch (e) {
    console.error(e);
  }
}
test();

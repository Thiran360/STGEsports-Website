async function test() {
  try {
    const payload = {
      id: "es1",
      playerTag: "STGzTest",
      role: "ENTRY",
      description: "Test description",
      instagramUsername: "test.ig",
      instagramLink: "http://test",
      profileImage: "",
      teamName: "STG Esports",
    };

    console.log('Trying PUT /sports_app/player/ with string ID');
    const putRes = await fetch(`https://api.codingboss.in//sports_app/player/`, {
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

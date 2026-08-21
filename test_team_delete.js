async function test() {
  try {
    const payload = {
      teamName: "STG Esports POSTED",
      teamColor: "#00FF00",
      teamLogo: "https://test.com/logo2.png"
    };

    // 1. Create a team to delete
    console.log('Trying POST /sports_app/team/');
    const postRes = await fetch(`https://api.codingboss.in//sports_app/team/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
      body: JSON.stringify(payload)
    });
    const postData = await postRes.json();
    console.log('POST data:', postData);

    if (postData.data && postData.data.id) {
      const id = postData.data.id;
      console.log('\nTrying DELETE /sports_app/team/ with ID ' + id);
      const deleteRes = await fetch(`https://api.codingboss.in//sports_app/team/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ id })
      });
      console.log('DELETE status:', deleteRes.status);
      console.log('DELETE body:', await deleteRes.text().catch(e => e.message).then(t => t.substring(0, 500)));
    }
  } catch (e) {
    console.error(e);
  }
}
test();

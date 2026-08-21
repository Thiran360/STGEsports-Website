async function test() {
  try {
    console.log('Trying DELETE /sports_app/player/ with string ID "es1"');
    const deleteRes1 = await fetch(`https://api.codingboss.in//sports_app/player/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
      body: JSON.stringify({ id: "es1" })
    });
    console.log('DELETE es1 status:', deleteRes1.status);
    console.log('DELETE es1 body:', await deleteRes1.text().catch(e => e.message).then(t => t.substring(0, 500)));

    console.log('\nTrying DELETE /sports_app/player/ with invalid integer ID 99999');
    const deleteRes2 = await fetch(`https://api.codingboss.in//sports_app/player/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
      body: JSON.stringify({ id: 99999 })
    });
    console.log('DELETE 99999 status:', deleteRes2.status);
    console.log('DELETE 99999 body:', await deleteRes2.text().catch(e => e.message).then(t => t.substring(0, 500)));
  } catch (e) {
    console.error(e);
  }
}
test();

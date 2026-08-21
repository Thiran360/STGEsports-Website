const fetch = require('node-fetch');

async function testPUT() {
  const payload = {
    id: 6,
    teamName: "STG Esports",
    teamColor: "#e60000",
    teamLogo: null
  };
  console.log('Sending PUT to /sports_app/team/ with payload:', payload);
  try {
    const res = await fetch('https://api.codingboss.in//sports_app/team/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(payload)
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response:', text.substring(0, 1000));
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

testPUT();

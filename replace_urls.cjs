const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/LineupPage.jsx',
  'src/pages/AdminLogin.jsx',
  'src/pages/AdminDashboard.jsx',
  'src/components/EventsShowcase.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/\/api\/sports_app\//g, 'https://api.codingboss.in/sports_app/');
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});

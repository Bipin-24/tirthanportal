const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');

// Automatically load all partials from the markdoc/partials directory
const partialsDir = path.join(__dirname, 'markdoc', 'partials');
const partials = {};

if (fs.existsSync(partialsDir)) {
  const files = fs.readdirSync(partialsDir);
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
      partials[file] = Markdoc.parse(content);
    }
  });
}

module.exports = {
  partials
};

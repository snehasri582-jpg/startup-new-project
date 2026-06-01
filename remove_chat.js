const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

for (const file of files) {
    if (file === 'chat.html') continue; // We'll delete it separately
    
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove the sidebar Messages link
    content = content.replace(/^[ \t]*<a href="chat\.html" class="menu-item">.*?<\/a>\r?\n/gm, '');
    
    // Remove other buttons/links pointing to chat.html
    content = content.replace(/^[ \t]*<a href="chat\.html"[^>]*>.*?<\/a>\r?\n/gm, '');
    content = content.replace(/<button[^>]*onclick="window\.location\.href='chat\.html'"[^>]*>.*?<\/button>/g, '');
    content = content.replace(/window\.location\.href\s*=\s*'chat\.html';/g, "alert('Chat is no longer available.');");
    
    // Specifically handle the profile-view.html "Chat" button block
    content = content.replace(/<p><a href="chat\.html">Chat<\/a><\/p>/g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        console.log(`Updated ${file}`);
    }
}

// Delete chat.html
const chatPath = path.join(dir, 'chat.html');
if (fs.existsSync(chatPath)) {
    fs.unlinkSync(chatPath);
    console.log("Deleted chat.html");
}

console.log(`Done! Modified ${modifiedCount} files.`);

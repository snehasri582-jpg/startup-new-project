import os
import re

files = [
    'studenthome.html', 'tracking.html', 'shareidea.html', 
    'shareidea-details.html', 'settings.html', 'profile.html', 
    'pending.html', 'notifications.html', 'investors.html', 
    'contact2.html', 'chat.html', 'student.html', 'report.html'
]

pattern = re.compile(r'<span class="icon">.*?</span>')

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = pattern.sub('', content)
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")

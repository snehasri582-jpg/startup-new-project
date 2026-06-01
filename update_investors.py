import os
import re

investor_files = [
    'investorhome.html', 'view.html', 'chat2.html', 'myinvest.html', 
    'contact3.html', 'shortlist.html'
]

# Update sidebar in investor files
for file in investor_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already added
        if 'href="students.html"' not in content:
            # We want to add the Student Network link right before Customer Care or after My Investments
            new_link = '\n      <a href="students.html" class="menu-item"><span class="icon">🎓</span><span class="label">Student Network</span></a>'
            # Look for contact3.html link and insert before it
            content = re.sub(
                r'(<a href="contact3.html".*?>)', 
                rf'{new_link}\n      \1', 
                content
            )
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added Student Network to {file}")

# Update profile-view.html
if os.path.exists('profile-view.html'):
    with open('profile-view.html', 'r', encoding='utf-8') as f:
        content = f.read()
    if 'href="students.html"' not in content:
        new_link = '        <a href="students.html" class="menu-item"><span class="icon">🎓</span><span class="label">Student Network</span></a>\n'
        content = re.sub(
            r'(<a href="contact3.html".*?>)', 
            rf'{new_link}\1', 
            content
        )
        with open('profile-view.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Added Student Network to profile-view.html")

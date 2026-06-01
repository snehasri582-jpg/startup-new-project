function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    let projTitle = '';
    
    // Check if coming from a direct schedule click
    const selectedProj = JSON.parse(localStorage.getItem('selected_schedule_project'));
    if (selectedProj && selectedProj.title) {
      projTitle = selectedProj.title;
    } else {
      // Check if coming from idea details view
      const shareIdea = JSON.parse(localStorage.getItem('shareidea_selected'));
      if (shareIdea && shareIdea.project && shareIdea.project.title) {
        projTitle = shareIdea.project.title;
      }
    }
    
    if (projTitle) {
      document.getElementById('topicInput').value = `${projTitle} - Pitch Discussion`;
    }
  } catch (e) {}
});

function handleSchedule(event) {
  event.preventDefault();
  
  const topic = document.getElementById('topicInput').value || 'Meeting';
  const dateInput = document.getElementById('dateInput').value;
  
  // Generate random meet link (e.g. abc-defg-hij)
  const randomChars = Math.random().toString(36).substring(2, 12);
  const meetLink = `https://meet.google.com/${randomChars.slice(0,3)}-${randomChars.slice(3,7)}-${randomChars.slice(7)}`;
  
  // Save to admin meetings store as PENDING
  try {
    const meetings = JSON.parse(localStorage.getItem('startupConnect.admin.meetings')) || [];
    meetings.push({
      id: Date.now(),
      title: topic,
      student: "Pending Student", // This could be extracted from local storage if available
      investor: "Investor Pro",
      company: "Angel Investor",
      date: dateInput,
      time: "17:00",
      status: "PENDING",
      link: meetLink,
      description: "Meeting request submitted by investor."
    });
    localStorage.setItem('startupConnect.admin.meetings', JSON.stringify(meetings));
  } catch (e) {}

  alert(`Meeting request submitted!\n\nTopic: ${topic}\n\nThe request has been sent to the Admin for approval. Once approved, the student will be notified.`);
  
  // Redirect to investor updates after scheduling
  window.location.href = 'investor-updates.html';
}


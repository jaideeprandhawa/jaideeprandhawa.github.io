document.addEventListener('DOMContentLoaded', function() {
  // Project modal functionality
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  
  if (projectCards.length && modal) {
    projectCards.forEach(card => {
      card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const projectData = getProjectDetails(projectId);
        
        if (projectData) {
          document.getElementById('modal-title').textContent = projectData.title;
          document.getElementById('modal-description').innerHTML = projectData.description;
          document.getElementById('modal-image').src = projectData.image;
          document.getElementById('modal-tech').innerHTML = formatTechStack(projectData.tech);
          
          if (projectData.link) {
            document.getElementById('modal-link').href = projectData.link;
            document.getElementById('modal-link').style.display = 'inline-block';
          } else {
            document.getElementById('modal-link').style.display = 'none';
          }
          
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // Prevent scrolling
          
          setTimeout(() => {
            modal.classList.add('active');
          }, 10);
        }
      });
    });
    
    // Close modal
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
  
  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  function getProjectDetails(id) {
    // Project data could be loaded from a JSON file or API
    const projects = {
      'eduai': {
        title: 'EduAI - AI Coding Tutor',
        description: `<p>EduAI is an interactive learning platform that provides students with AI-driven guidance directly within the code editor.</p>
        <h4>Problem Statement</h4>
        <p>Students learning to code often struggle with debugging and understanding concepts without immediate feedback.</p>
        <h4>Solution</h4>
        <p>EduAI uses AI to analyze code in real-time and provide personalized suggestions, error explanations, and learning resources.</p>
        <h4>Outcomes</h4>
        <p>In testing, students using EduAI showed 40% faster problem-solving rates and reported higher confidence in coding skills.</p>`,
        image: 'images/projects/eduai-detail.jpg',
        tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'LLMs', 'Python'],
        link: 'https://github.com/username/eduai'
      },
      // Add other projects here
    };
    
    return projects[id];
  }
  
  function formatTechStack(techArray) {
    return techArray.map(tech => `<span class="tech-pill">${tech}</span>`).join('');
  }
});

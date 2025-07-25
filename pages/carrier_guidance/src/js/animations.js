// Animation utilities

export const animations = {
  // Fade out an element and execute a callback when complete
  fadeOut: (element, callback) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.classList.remove('active');
      if (callback) callback();
    }, 300); // Match transition duration
  },
  
  // Fade in an element
  fadeIn: (element) => {
    setTimeout(() => {
      element.classList.add('active');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50); // Small delay to ensure the display change has taken effect
  },
  
  // Slide elements in from the side
  slideIn: (elements, direction = 'left', staggerDelay = 100) => {
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = direction === 'left' 
        ? 'translateX(-20px)' 
        : 'translateX(20px)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
      }, index * staggerDelay);
    });
  },
  
  // Pulse animation
  pulse: (element) => {
    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 600); // Animation duration
  }
};
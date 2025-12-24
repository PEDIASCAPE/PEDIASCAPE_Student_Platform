// Results calculation logic

import { careerData } from './questions.js';

// Calculate results based on user answers
export function calculateResults(userAnswers, questions) {
  // Initialize career scores
  const careerScores = {};
  
  // Process each answer
  userAnswers.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== null) {
      const question = questions[questionIndex];
      const answer = question.options[answerIndex];
      
      // Add points to each career associated with this answer
      answer.careers.forEach(career => {
        if (!careerScores[career]) {
          careerScores[career] = 0;
        }
        careerScores[career] += 1;
      });
    }
  });
  
  // Convert to array for sorting
  const careers = Object.entries(careerScores).map(([career, score]) => ({
    career,
    score,
    percentage: Math.round((score / userAnswers.length) * 100)
  }));
  
  // Sort by score (descending)
  careers.sort((a, b) => b.score - a.score);
  
  // Get top 5 careers
  const topCareers = careers.slice(0, 5);
  
  // Map career data based on category score
  const careerCategories = {
    technical: getTechnicalScore(careerScores),
    creative: getCreativeScore(careerScores),
    analytical: getAnalyticalScore(careerScores),
    interpersonal: getInterpersonalScore(careerScores)
  };
  
  // Get the dominant category
  const dominantCategory = Object.entries(careerCategories)
    .sort((a, b) => b[1] - a[1])
    [0][0];
  
  // Create result matches with error handling
  const matches = topCareers
    .map(careerScore => {
      // Find the best matching actual career from our data
      const actualCareer = findBestMatchingCareer(careerScore.career);
      const careerInfo = careerData[actualCareer];

      // Skip if no career data is found
      if (!careerInfo) {
        console.warn(`No career data found for ${actualCareer}`);
        return null;
      }

      return {
        title: careerInfo.title,
        description: careerInfo.description,
        percentage: careerScore.percentage,
        skills: careerInfo.skills || []
      };
    })
    .filter(match => match !== null); // Remove any null entries
  
  // Create the results object
  return {
    title: getResultTitle(dominantCategory),
    description: getResultDescription(dominantCategory),
    matches: matches
  };
}

// Find the best matching career from our careerData
function findBestMatchingCareer(careerCategory) {
  // If the exact category exists in careerData, use it
  if (careerData[careerCategory]) {
    return careerCategory;
  }
  
  // Otherwise map to the closest match
  const careerMappings = {
    "corporate": "finance",
    "administration": "project_management",
    "arts": "design",
    "media": "marketing",
    "sports": "education",
    "travel": "sales",
    "field_work": "research",
    "tech": "software_development",
    "digital_nomad": "entrepreneurship",
    "content_creation": "marketing",
    "engineering": "software_development",
    "management": "project_management",
    "operations": "project_management",
    "quality_assurance": "software_development",
    "accounting": "finance",
    "counseling": "hr",
    "development": "software_development",
    "government": "consulting",
    "remote_work": "software_development",
    "startup": "entrepreneurship",
    "medicine": "healthcare",
    "law": "consulting",
    "product_development": "product_management",
    "nonprofit": "education",
    "business": "finance",
    "technical_writing": "research",
    "training": "education",
    "architecture": "design",
    "data_analysis": "data_science",
    "academia": "research",
    "trades": "entrepreneurship",
    "specialized_medicine": "healthcare",
    "executive": "consulting",
    "corporate": "finance",
    "journalism": "marketing",
    "event_planning": "project_management",
    "emergency_services": "healthcare",
    "self_employment": "entrepreneurship",
    "remote_technical": "software_development",
    "manufacturing": "project_management",
    "it": "software_development",
    "writing": "marketing"
  };
  
  // Get the mapped career or use a default that we know exists in careerData
  const mappedCareer = careerMappings[careerCategory];
  return careerData[mappedCareer] ? mappedCareer : "consulting";
}

// Calculate technical score
function getTechnicalScore(careerScores) {
  const technicalCareers = [
    "data_science", "engineering", "software_development", "it",
    "technical_writing", "development", "tech", "remote_technical"
  ];
  
  return calculateCategoryScore(careerScores, technicalCareers);
}

// Calculate creative score
function getCreativeScore(careerScores) {
  const creativeCareers = [
    "design", "arts", "media", "writing", "marketing", "content_creation",
    "architecture", "product_development", "creative"
  ];
  
  return calculateCategoryScore(careerScores, creativeCareers);
}

// Calculate analytical score
function getAnalyticalScore(careerScores) {
  const analyticalCareers = [
    "data_science", "research", "finance", "analysis", "data_analysis",
    "accounting", "quality_assurance"
  ];
  
  return calculateCategoryScore(careerScores, analyticalCareers);
}

// Calculate interpersonal score
function getInterpersonalScore(careerScores) {
  const interpersonalCareers = [
    "sales", "hr", "education", "counseling", "healthcare", "management",
    "training", "consulting"
  ];
  
  return calculateCategoryScore(careerScores, interpersonalCareers);
}

// Calculate category score based on career scores
function calculateCategoryScore(careerScores, careers) {
  let score = 0;
  
  careers.forEach(career => {
    if (careerScores[career]) {
      score += careerScores[career];
    }
  });
  
  return score;
}

// Get result title based on dominant category
function getResultTitle(category) {
  const titles = {
    technical: "Technology and Innovation Professional",
    creative: "Creative and Design Specialist",
    analytical: "Analytical Problem Solver",
    interpersonal: "People-Oriented Professional"
  };
  
  return titles[category] || "Versatile Professional";
}

// Get result description based on dominant category
function getResultDescription(category) {
  const descriptions = {
    technical: "You thrive in environments where you can apply technical skills to solve complex problems. Your logical approach and attention to detail make you well-suited for careers in technology and engineering fields.",
    creative: "Your creative thinking and innovative approach set you apart. You excel in environments where you can express your creativity and develop original solutions and designs.",
    analytical: "You have a natural ability to analyze information and draw meaningful conclusions. Your methodical approach to problem-solving makes you valuable in roles requiring careful analysis and strategic thinking.",
    interpersonal: "Your strength lies in connecting with others and building relationships. You thrive in environments where you can collaborate, communicate, and work directly with people."
  };
  
  return descriptions[category] || "You have a balanced skill set that makes you adaptable to various professional environments. Your versatility allows you to succeed in different types of roles and industries.";
}
import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import WhatIsNumerology from './components/WhatIsNumerology';
import WhyThisReport from './components/WhyThisReport';
import HowItWorks from './components/HowItWorks';
import NumerologyForm from './components/NumerologyForm';
import ReportDisplay from './components/ReportDisplay';
import Footer from './components/Footer';
import { generateNumerologyReport } from './services/api';

// Demo mode - uses local calculations when backend is not available
const DEMO_MODE = true;

function App() {
  const [report, setReport] = useState(null);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Lenis for Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Numerology calculation functions for demo mode
  const calculateLifePathNumber = (day, month, year) => {
    const reduceToSingle = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
      }
      return num;
    };
    return reduceToSingle(reduceToSingle(day) + reduceToSingle(month) + reduceToSingle(year));
  };

  const calculateDestinyNumber = (name) => {
    const letterValues = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };
    const sum = name.toLowerCase().split('').filter(c => letterValues[c]).reduce((t, c) => t + letterValues[c], 0);
    const reduceToSingle = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
      }
      return num;
    };
    return reduceToSingle(sum);
  };

  const personalityTraits = {
    1: "You are a natural-born leader with strong independence and determination. Your innovative thinking and self-reliance make you a pioneer in whatever field you choose.",
    2: "You possess a gentle, diplomatic nature with exceptional intuition. Your ability to see both sides of any situation makes you an excellent mediator and peacemaker.",
    3: "Your creativity and self-expression are your greatest gifts. You have a natural talent for communication and inspire others with your optimism and artistic vision.",
    4: "You are practical, organized, and dependable. Your strong work ethic and attention to detail create solid foundations for lasting success.",
    5: "Freedom and adventure drive your spirit. Your adaptability and curiosity lead you to diverse experiences that enrich your understanding of life.",
    6: "You are nurturing, responsible, and family-oriented. Your sense of duty and ability to create harmony make you a pillar of support for those around you.",
    7: "You possess deep wisdom and analytical abilities. Your spiritual nature and quest for truth lead you to profound insights and understanding.",
    8: "You have natural business acumen and leadership abilities. Your ambition and organizational skills position you for material and professional success.",
    9: "You are compassionate, humanitarian, and selfless. Your wisdom and universal love inspire you to make a positive difference in the world."
  };

  const careerInsights = {
    1: "Leadership roles, entrepreneurship, and independent ventures suit you best. Consider careers in management, innovation, or starting your own business.",
    2: "Collaborative environments where you can use your diplomatic skills thrive. Consider counseling, human resources, or creative partnerships.",
    3: "Creative fields and communication-based careers align with your talents. Explore writing, performing arts, marketing, or teaching.",
    4: "Structured careers with clear progression suit your nature. Engineering, architecture, finance, or project management are excellent choices.",
    5: "Dynamic careers with variety and travel appeal to you. Sales, journalism, travel industry, or consulting offer the freedom you crave.",
    6: "Helping professions and creative arts resonate with you. Healthcare, education, design, or family counseling are fulfilling paths.",
    7: "Research, analysis, and spiritual pursuits match your depth. Academia, science, technology, or wellness industries are ideal.",
    8: "Business, finance, and executive roles harness your abilities. Corporate leadership, investment, or entrepreneurship bring success.",
    9: "Humanitarian work and creative expression fulfill you. Non-profits, arts, healing professions, or international work bring meaning."
  };

  const relationshipInsights = {
    1: "In relationships, you need a partner who respects your independence while providing emotional support. Avoid being too controlling and remember that partnership requires balance.",
    2: "You seek deep emotional connections and harmony. Your sensitivity is a gift—find partners who appreciate and reciprocate your nurturing nature.",
    3: "Your charm and wit attract many admirers. Seek partners who share your love of fun and creativity while providing emotional stability.",
    4: "Loyalty and stability are paramount in your relationships. You need a dependable partner who values commitment as much as you do.",
    5: "Freedom within relationships is essential. Find partners who understand your need for space and share your love of adventure.",
    6: "You are natural caregivers who thrive in committed relationships. Seek partners who appreciate your devotion and reciprocate your love.",
    7: "You need intellectual and spiritual connection with your partner. Find someone who respects your need for solitude and deep conversation.",
    8: "You seek partners who match your ambition and drive. Balance your focus on success with quality time and emotional intimacy.",
    9: "Your universal love extends to your relationships. Find partners who share your humanitarian values and support your giving nature."
  };

  const generateMockReport = (data) => {
    const dobParts = data.dob.split('-');
    const lifePathNumber = calculateLifePathNumber(
      parseInt(dobParts[0]),
      parseInt(dobParts[1]),
      parseInt(dobParts[2])
    );
    const destinyNumber = calculateDestinyNumber(data.name);

    return {
      lifePathNumber,
      destinyNumber,
      personality: `${data.name}, ${personalityTraits[lifePathNumber] || personalityTraits[1]} Your numerological profile reveals a unique combination of strengths that, when properly channeled, can lead to remarkable personal and professional fulfillment.`,
      career: careerInsights[destinyNumber] || careerInsights[1],
      relationships: relationshipInsights[lifePathNumber] || relationshipInsights[1],
      futureGuidance: `With Life Path ${lifePathNumber} and Destiny ${destinyNumber}, you are positioned for a journey of growth and self-discovery. The coming period is favorable for taking decisive action on long-held dreams. Trust your intuition and remain open to unexpected opportunities. Focus on aligning your daily actions with your deeper purpose.`
    };
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setUserName(formData.name);

    try {
      let reportData;

      if (DEMO_MODE) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        reportData = generateMockReport(formData);
      } else {
        const response = await generateNumerologyReport(formData);
        reportData = response.data;
      }

      setReport(reportData);

      // Scroll to report
      setTimeout(() => {
        document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReport = () => {
    setReport(null);
    setUserName('');
    setTimeout(() => {
      document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-cosmic-dark animate-fade-in">
      <Hero />
      <WhatIsNumerology />
      <WhyThisReport />
      <HowItWorks />

      {!report ? (
        <NumerologyForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      ) : (
        <ReportDisplay report={report} userName={userName} onNewReport={handleNewReport} />
      )}

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-status-error/90 text-white rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;

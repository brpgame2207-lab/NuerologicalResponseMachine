import { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AssessmentCenter from './pages/AssessmentCenter';
import TrainingArena from './pages/TrainingArena';
import AnalyticsPage from './pages/AnalyticsPage';
import HeatmapPage from './pages/HeatmapPage';
import ResearchCenter from './pages/ResearchCenter';

function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'assessments':
        return <AssessmentCenter />;
      case 'training':
        return <TrainingArena />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'heatmap':
        return <HeatmapPage />;
      case 'research':
        return <ResearchCenter />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ProgressProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderActivePage()}
      </Layout>
    </ProgressProvider>
  );
}

export default App;

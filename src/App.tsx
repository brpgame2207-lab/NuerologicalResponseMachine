import { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AssessmentCenter from './pages/AssessmentCenter';
import TrainingArena from './pages/TrainingArena';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  const [tabHistory, setTabHistory] = useState<string[]>(['landing']);
  const activeTab = tabHistory[tabHistory.length - 1] || 'landing';

  const setActiveTab = (tab: string) => {
    if (tab === activeTab) return;
    setTabHistory((prev) => [...prev, tab]);
  };

  const handleBack = () => {
    if (tabHistory.length > 1) {
      setTabHistory((prev) => prev.slice(0, -1));
    }
  };

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
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ProgressProvider>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onBack={tabHistory.length > 1 ? handleBack : undefined}
      >
        {renderActivePage()}
      </Layout>
    </ProgressProvider>
  );
}

export default App;

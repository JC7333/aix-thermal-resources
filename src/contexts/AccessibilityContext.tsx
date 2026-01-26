import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  easyReading: boolean;
  seniorMode: boolean;
  toggleEasyReading: () => void;
  toggleSeniorMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [easyReading, setEasyReading] = useState(() => {
    const saved = localStorage.getItem('easyReading');
    return saved === 'true';
  });

  const [seniorMode, setSeniorMode] = useState(() => {
    const saved = localStorage.getItem('seniorMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('easyReading', String(easyReading));
    if (easyReading) {
      document.documentElement.classList.add('easy-reading');
    } else {
      document.documentElement.classList.remove('easy-reading');
    }
  }, [easyReading]);

  useEffect(() => {
    localStorage.setItem('seniorMode', String(seniorMode));
    if (seniorMode) {
      document.documentElement.classList.add('senior-mode');
      // Si senior mode, on désactive easy-reading pour éviter le cumul
      document.documentElement.classList.remove('easy-reading');
    } else {
      document.documentElement.classList.remove('senior-mode');
    }
  }, [seniorMode]);

  const toggleEasyReading = () => {
    if (seniorMode) {
      setSeniorMode(false);
    }
    setEasyReading(!easyReading);
  };

  const toggleSeniorMode = () => {
    if (easyReading) {
      setEasyReading(false);
    }
    setSeniorMode(!seniorMode);
  };

  return (
    <AccessibilityContext.Provider value={{ easyReading, seniorMode, toggleEasyReading, toggleSeniorMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  easyReading: boolean;
  toggleEasyReading: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [easyReading, setEasyReading] = useState(() => {
    const saved = localStorage.getItem('easyReading');
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

  const toggleEasyReading = () => setEasyReading(!easyReading);

  return (
    <AccessibilityContext.Provider value={{ easyReading, toggleEasyReading }}>
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

// GradientChart.jsx
import React, { useState, useEffect } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const GradientChart = ({
  width = '60',
  height = 20,
  peakHeight = 4,
  direction = 'right',
  color = '#8b5cf6'
}) => {
  const midY = height / 2;
  const offset = direction === 'up' ? -peakHeight : peakHeight;

  const createPaths = () => {
    const points = [
      `M0 ${midY}`,
      `Q${width / 8} ${midY + offset}`,
      `${width / 3} ${midY}`,
      `T${width / 1.3} ${midY}`,
      `T${width} ${midY}`
    ];

    const linePath = points.join(' ');
    const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;

    return { linePath, areaPath };
  };

  const { linePath, areaPath } = createPaths();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const gradientId = `gradient2`;
  const lineGradientId = `lineGradient2`;

  return (
    <div style={{
      width: '100%',
     
   
      padding: '10px',
      borderRadius: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem' }}>
        <span
          style={{
            color: 'white',
            fontFamily:
              currentLanguage === 'ar'
                ? '"Droid Arabic Kufi", serif'
                : '"Airbnbcereal", sans-serif',
            position: 'relative',
            top: '-1px',
            fontSize: '1rem',
            display: 'inline-block',
            width: `${width}px`,
            textAlign: 'center',
          }}
        >
          {t('Novice')}
        </span>
      </div>
      <div style={{ width: `${width}px` }}>
        <svg
          width={width}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          style={{ transform: 'rotate(0deg)', marginTop: '-8px' }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="220%" y2="100%">
              <stop offset="10%" style={{ stopColor: color, stopOpacity: 0.5 }} />
              <stop offset="200%" style={{ stopColor: color, stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id={lineGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: color }} />
              <stop offset="100%" style={{ stopColor: color }} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path d={linePath} stroke={`url(#${lineGradientId})`} strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default GradientChart;
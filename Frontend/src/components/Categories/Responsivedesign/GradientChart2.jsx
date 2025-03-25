import React, { useState, useEffect } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const GradientChart2 = ({
  width = '70',
  height = 20,
  peakHeight = 8,
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

  // Generate unique IDs for this instance
  const gradientId = `gradient1`;
  const lineGradientId = `lineGradient1`;

  return (
    <div style={{ width: '100%',  padding: '5px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {/* Text container */}
        <div style={{ width: '100%', textAlign: 'center', marginBottom: '8px' }}>
          <span
            style={{
              color: 'white',
              fontFamily: currentLanguage === 'ar' ? '"Droid Arabic Kufi", serif' : '"Airbnbcereal", sans-serif',
              position: 'relative',
              top: '-1px',
              fontSize: '1rem',
              display: 'inline-block',
              width: `${width}px`, // Match the width of the chart
              textAlign: 'center',
            }}
          >
            {t('Novice')}
          </span>
        </div>
        <div style={{ width: `${width}px` }}>
          {/* Chart */}
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
    </div>
  );
};

export default GradientChart2;

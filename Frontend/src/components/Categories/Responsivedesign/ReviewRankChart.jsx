import React from 'react';

const ReviewRankChart = ({ rating  , maxRating }) => {
    // Calculate the percentage for the arc
    const percentage = (rating / maxRating) * 100;

    // SVG parameters
    const size = 200;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    // Calculate angles
    const startAngle = -180;
    const endAngle = 0;
    const angleRange = endAngle - startAngle;
    const ratingAngle = startAngle + (angleRange * percentage) / 100;

    // Calculate pointer coordinates
    const pointerLength = radius - 10;
    const pointerRad = (ratingAngle * Math.PI) / 180;
    const pointerX = center + pointerLength * Math.cos(pointerRad);
    const pointerY = center + pointerLength * Math.sin(pointerRad);

    // Create tick marks and labels
    const createTicksAndLabels = () => {
        const ticks = [];
        const tickCount = maxRating * 2; // Double the ticks for half points
        const tickLength = 12;
        const tickSpacing = angleRange / tickCount;
        const labelRadius = radius + strokeWidth / 2 + 22; // Position for labels

        for (let i = 0; i <= tickCount; i++) {
            const angle = startAngle + (tickSpacing * i);
            const rad = (angle * Math.PI) / 180;
            const outerRadius = radius + strokeWidth / 2 + 2;
            const innerRadius = radius + strokeWidth / 2 - tickLength;

            const x1 = center + outerRadius * Math.cos(rad);
            const y1 = center + outerRadius * Math.sin(rad);
            const x2 = center + innerRadius * Math.cos(rad);
            const y2 = center + innerRadius * Math.sin(rad);

            // Label position
            const labelX = center + labelRadius * Math.cos(rad);
            const labelY = center + labelRadius * Math.sin(rad);

            const value = (i / 2) + 1;
            const isMainTick = i % 2 === 0;

            // Add tick mark
            ticks.push(
                <line
                    key={`tick-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#6b7280"
                    strokeWidth={isMainTick ? 2 : 1}
                    strokeLinecap="round"
                />
            );

            // Add label with correct alignment and transformation
            if (value <= maxRating) {
                const label = Number.isInteger(value)
                    ? value
                    : `${Math.floor(value)}/${maxRating}`;

                ticks.push(
                    <text
                        key={`label-${i}`}
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${angle}, ${labelX}, ${labelY})`}
                        className="text-xs"
                        style={{
                            fontSize: '10px',
                            color: 'white', // Change this color as needed
                        }}
                    >
                        {label}
                    </text>
                );
            }
        }
        return ticks;
    };

    // Create the arc paths
    const createArc = (start, end) => {
        const startRad = (start * Math.PI) / 180;
        const endRad = (end * Math.PI) / 180;

        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);

        const largeArc = end - start <= 180 ? 0 : 1;

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
    };

    const backgroundArc = createArc(startAngle, endAngle);
    const ratingArc = createArc(startAngle, ratingAngle);

    return (
        <div className="flex flex-col items-center">
            <svg
                width={size}
                height={size / 2 + strokeWidth + 40}
                className="overflow-visible"
                style={{
                    transform: 'rotate(360deg)',
                    transformOrigin: '50% 50%',
                }}
            >
                {/* Background track */}
                <path
                    d={backgroundArc}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Rating arc */}
                <path
                    d={ratingArc}
                    fill="none"
                    stroke="rgb(91, 193, 253)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                {/* Tick marks and labels */}
          
                {/* Pointer base (circle) */}
                <circle
                    cx={center}
                    cy={center}
                    r={40}
                    fill="rgb(91, 193, 253)"
                    className="pointer-base"
                />
                {/* Moving pointer (needle) */}
                <line
                    x1={center}
                    y1={center}
                    x2={pointerX}
                    y2={pointerY}
                    stroke="rgb(91, 193, 253)"
                    strokeWidth={4}
                    strokeLinecap="round"
                    className="pointer"
                    style={{
                        transformOrigin: `${center}px ${center}px`,
                        transition: 'all 0.3s ease-out'
                    }}
                />

                {/* Use foreignObject for Typography */}
                <foreignObject
                    x={center - 40}
                    y={center - 25}
                    width={80}
                    height={50}
                >
                    <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'white',
                            fontFamily: 'Roboto, Arial, sans-serif',
                        }}
                    >
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {rating}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                            out of {maxRating}
                        </span>
                    </div>
                </foreignObject>
            </svg>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .pointer, .pointer-base {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ReviewRankChart;

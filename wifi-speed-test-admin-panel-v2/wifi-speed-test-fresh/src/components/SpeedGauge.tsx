interface SpeedGaugeProps {
  speed: number;
  maxSpeed?: number;
  phase: string;
  isRunning: boolean;
}

export function SpeedGauge({ speed, maxSpeed = 200, phase, isRunning }: SpeedGaugeProps) {
  // Calculate percentage (0-100)
  const percentage = Math.min((speed / maxSpeed) * 100, 100);

  // Determine color based on speed
  const getColor = () => {
    if (speed < 10) return '#00d4ff';
    if (speed < 50) return '#00e5ff';
    if (speed < 100) return '#00ff88';
    return '#b84dff';
  };

  const color = getColor();

  // SVG arc path for background
  const radius = 120;
  const cx = 150;
  const cy = 150;
  const startAngle = -225; // degrees, SVG coordinate system
  const endAngle = 45;
  const sweepAngle = 270;

  const polarToCartesian = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (startA: number, endA: number, r: number) => {
    const start = polarToCartesian(startA, r);
    const end = polarToCartesian(endA, r);
    const largeArc = Math.abs(endA - startA) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  // Progress arc
  const progressEndAngle = startAngle + (percentage / 100) * sweepAngle;
  const progressPath = describeArc(startAngle, progressEndAngle, radius);
  const bgPath = describeArc(startAngle, endAngle, radius);

  // Needle position
  const needleAngle = startAngle + (percentage / 100) * sweepAngle;
  const needleTip = polarToCartesian(needleAngle, radius - 10);
  const needleBase1 = polarToCartesian(needleAngle + 90, 8);
  const needleBase2 = polarToCartesian(needleAngle - 90, 8);

  // Tick marks
  const ticks = [];
  const tickCount = 10;
  for (let i = 0; i <= tickCount; i++) {
    const tAngle = startAngle + (i / tickCount) * sweepAngle;
    const inner = polarToCartesian(tAngle, radius - 18);
    const outer = polarToCartesian(tAngle, i % 2 === 0 ? radius - 2 : radius - 8);
    ticks.push(
      <line
        key={i}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke={i % 2 === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'}
        strokeWidth={i % 2 === 0 ? 2 : 1}
        strokeLinecap="round"
      />
    );
  }

  return (
    <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] mx-auto" role="img" aria-label={`Speed gauge showing ${speed.toFixed(1)} Mbps`}>
      <svg viewBox="0 0 300 300" className="w-full h-full" aria-hidden="true">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="needleGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx={cx} cy={cy} r="140" fill="url(#centerGlow)" />

        {/* Background track */}
        <path
          d={bgPath}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d={progressPath}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ transition: 'all 0.15s ease-out' }}
        />

        {/* Tick marks */}
        {ticks}

        {/* Inner ring decoration */}
        <circle cx={cx} cy={cy} r={radius - 30} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Needle */}
        <g style={{ transition: 'transform 0.15s ease-out' }}>
          <polygon
            points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
            fill={color}
            filter="url(#needleGlow)"
          />
        </g>

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="12" fill="#1a2234" stroke={color} strokeWidth="2" filter="url(#glow)" />
        <circle cx={cx} cy={cy} r="5" fill={color} />
      </svg>

      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
        <div
          className="text-5xl sm:text-6xl font-bold tracking-tight transition-colors duration-300"
          style={{ color: color, textShadow: `0 0 30px ${color}40` }}
        >
          {speed.toFixed(1)}
        </div>
        <div className="text-sm text-slate-400 font-medium tracking-widest uppercase mt-1">Mbps</div>
        <div className="text-xs text-slate-500 mt-3">
          {phase === 'ping' && '📡 Measuring Ping...'}
          {phase === 'download' && '📥 Testing Download...'}
          {phase === 'upload' && '📤 Testing Upload...'}
          {phase === 'done' && '✓ Test Complete'}
          {phase === 'idle' && !isRunning && 'Ready to Test'}
        </div>
      </div>
    </div>
  );
}

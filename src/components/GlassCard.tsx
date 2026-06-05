import React from 'react';

interface GlassCardProps {
  children: React.DataHTMLAttributes<HTMLDivElement>['children'];
  className?: string;
  glowColor?: 'cyan' | 'green' | 'purple' | 'none';
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  onClick,
  hoverEffect = true,
}) => {
  const getGlowStyles = () => {
    switch (glowColor) {
      case 'cyan':
        return 'border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(0,229,255,0.1)] hover:border-cyan-400/40 hover:shadow-[0_0_20px_-3px_rgba(0,229,255,0.25)]';
      case 'green':
        return 'border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.1)] hover:border-emerald-400/40 hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.25)]';
      case 'purple':
        return 'border-purple-500/20 shadow-[0_0_15px_-3px_rgba(124,58,237,0.1)] hover:border-purple-400/40 hover:shadow-[0_0_20px_-3px_rgba(124,58,237,0.25)]';
      default:
        return 'border-slate-800/80 shadow-black/40 hover:border-slate-700/80';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border bg-[#0f172a]/70 backdrop-blur-md p-6
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverEffect ? 'hover:-translate-y-1' : ''}
        ${getGlowStyles()}
        ${className}
      `}
    >
      {/* Dynamic ambient grid background line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      {/* Decorative colored orb corner effects */}
      {glowColor !== 'none' && (
        <div className={`
          absolute -top-12 -right-12 h-24 w-24 rounded-full blur-[40px] pointer-events-none opacity-20 transition-opacity duration-300
          ${glowColor === 'cyan' ? 'bg-cyan-500' : ''}
          ${glowColor === 'green' ? 'bg-emerald-500' : ''}
          ${glowColor === 'purple' ? 'bg-purple-500' : ''}
        `} />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
export default GlassCard;

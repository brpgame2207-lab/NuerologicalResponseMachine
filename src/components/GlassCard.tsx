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
  const getBrutalistStyles = () => {
    switch (glowColor) {
      case 'cyan':
        return 'border-black bg-[#16161a] shadow-[6px_6px_0px_#00E5FF] hover:shadow-[4px_4px_0px_#00E5FF] active:shadow-[1px_1px_0px_#00E5FF]';
      case 'green':
        return 'border-black bg-[#16161a] shadow-[6px_6px_0px_#00FF88] hover:shadow-[4px_4px_0px_#00FF88] active:shadow-[1px_1px_0px_#00FF88]';
      case 'purple':
        return 'border-black bg-[#16161a] shadow-[6px_6px_0px_#7C3AED] hover:shadow-[4px_4px_0px_#7C3AED] active:shadow-[1px_1px_0px_#7C3AED]';
      default:
        return 'border-black bg-[#16161a] shadow-[6px_6px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] active:shadow-[1px_1px_0px_#000000]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-none border-[3px] p-6
        transition-all duration-150 ease-in-out
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverEffect ? 'hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[5px] active:translate-y-[5px]' : ''}
        ${getBrutalistStyles()}
        ${className}
      `}
    >
      {/* Dynamic ambient grid background line for techy texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Decorative tiny neobrutalist badge/marker */}
      {glowColor !== 'none' && (
        <div className={`
          absolute top-0 right-0 w-8 h-8 border-b-[3px] border-l-[3px] border-black flex items-center justify-center font-mono text-[9px] font-bold text-black
          ${glowColor === 'cyan' ? 'bg-[#00E5FF]' : ''}
          ${glowColor === 'green' ? 'bg-[#00FF88]' : ''}
          ${glowColor === 'purple' ? 'bg-[#7C3AED] text-white' : ''}
        `}>
          //
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
export default GlassCard;

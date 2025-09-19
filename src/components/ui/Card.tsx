import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-105' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

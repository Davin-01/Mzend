import React from 'react';

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-xl rounded-lg ${className || ''}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`p-6 ${className || ''}`}>
      {children}
    </div>
  );
}

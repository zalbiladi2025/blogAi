
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-blue-500/20 mt-16">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} مدونة أدوات الذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
        <p className="text-sm mt-1">تم إنشاؤها باستخدام React, Tailwind CSS, و Gemini API.</p>
      </div>
    </footer>
  );
};

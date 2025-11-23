
import React from 'react';
import type { SeoPlan } from '../types';
import { SeoIcon } from './icons/SeoIcon';
import { DiscoverIcon } from './icons/DiscoverIcon';
import { SocialIcon } from './icons/SocialIcon';
import { KeywordIcon } from './icons/KeywordIcon';

interface StrategySectionProps {
  seoPlan: SeoPlan;
  keywords: string[];
}

const StrategyCard: React.FC<{ title: string; content: string; icon: React.ReactNode }> = ({ title, content, icon }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 backdrop-blur-sm">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-900/50 rounded-full mr-4">{icon}</div>
            <h3 className="text-xl font-bold text-blue-300">{title}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{content}</p>
    </div>
);

export const StrategySection: React.FC<StrategySectionProps> = ({ seoPlan, keywords }) => {
  return (
    <section className="my-16">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        خطة النمو وتحقيق الدخل
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <StrategyCard title="تحسين محركات البحث (SEO)" content={seoPlan.seo} icon={<SeoIcon className="w-6 h-6 text-blue-300"/>} />
        <StrategyCard title="الظهور في Google Discover" content={seoPlan.googleDiscover} icon={<DiscoverIcon className="w-6 h-6 text-blue-300"/>} />
        <StrategyCard title="التسويق عبر الشبكات الاجتماعية" content={seoPlan.socialMedia} icon={<SocialIcon className="w-6 h-6 text-blue-300"/>} />
      </div>
      
      <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-900/50 rounded-full mr-4"><KeywordIcon className="w-6 h-6 text-purple-300"/></div>
            <h3 className="text-xl font-bold text-purple-300">كلمات مفتاحية مستهدفة</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1.5 text-sm font-medium rounded-md">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

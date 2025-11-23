
import React from 'react';
import type { SummarizedContent } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { UsersIcon } from './icons/UsersIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { SeoIcon } from './icons/SeoIcon';

interface SummarizationModuleProps {
    input: string;
    onInputChange: (value: string) => void;
    onSummarize: () => void;
    summary: SummarizedContent | null;
    isLoading: boolean;
    error: string | null;
}

export const SummarizationModule: React.FC<SummarizationModuleProps> = ({
    input,
    onInputChange,
    onSummarize,
    summary,
    isLoading,
    error,
}) => {
    return (
        <section className="my-16 bg-gray-800/40 rounded-2xl p-8 border border-blue-500/20">
            <div className="text-center mb-8">
                <SparklesIcon className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    مولّد ملخصات أدوات الذكاء الاصطناعي
                </h2>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                    ألصق وصفًا مطولاً لأي أداة ذكاء اصطناعي، وسيقوم Gemini بتحليله وتوليد ملخص احترافي وجاهز للنشر.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <textarea
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="ألصق هنا مقالاً أو وصفاً لأداة ذكاء اصطناعي..."
                    className="w-full h-40 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none"
                    disabled={isLoading}
                />
                <button
                    onClick={onSummarize}
                    disabled={isLoading || !input.trim()}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                    {isLoading ? 'جاري التحليل...' : 'لخّص الآن'}
                </button>

                {error && <p className="text-red-400 text-center mt-4">{error}</p>}
            </div>

            {isLoading && (
                 <div className="mt-8">
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg text-gray-300">يقوم Gemini بتحليل المحتوى...</p>
                    </div>
                 </div>
            )}

            {summary && !isLoading && (
                <div className="mt-10 max-w-4xl mx-auto animate-fade-in">
                    <h3 className="text-2xl font-bold text-center mb-6 text-white">النتائج الملخصة</h3>
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-6">
                        <div>
                            <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-300 mb-3">
                                <SeoIcon className="w-5 h-5" />
                                ملخص SEO
                            </h4>
                            <p className="text-gray-300 bg-gray-800 p-3 rounded-md">{summary.seoSummary}</p>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-300 mb-3">
                                <CheckCircleIcon className="w-5 h-5" />
                                الميزات الرئيسية
                            </h4>
                            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
                                {summary.keyFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                        </div>

                         <div>
                            <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-300 mb-3">
                                <SparklesIcon className="w-5 h-5" />
                                الفوائد للمستخدم
                            </h4>
                            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
                                {summary.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-300 mb-3">
                                    <UsersIcon className="w-5 h-5" />
                                    الجمهور المستهدف
                                </h4>
                                <p className="text-gray-300">{summary.targetAudience}</p>
                            </div>
                             <div>
                                <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-300 mb-3">
                                    <DollarSignIcon className="w-5 h-5" />
                                    التسعير
                                </h4>
                                <p className="text-gray-300">{summary.pricing}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

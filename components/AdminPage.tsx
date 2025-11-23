import React from 'react';
import { StrategySection } from './StrategySection';
import { Header } from './Header';
import { Footer } from './Footer';
import type { SeoPlan } from '../types';

interface AdminPageProps {
    seoPlan: SeoPlan;
    keywords: string[];
}

export const AdminPage: React.FC<AdminPageProps> = ({ seoPlan, keywords }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header searchQuery="" onSearchChange={() => {}} />
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                        لوحة التحكم الإدارية
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-400">
                        مرحباً بك في صفحة إدارة خطط النمو للمدونة.
                    </p>
                </div>
                <StrategySection seoPlan={seoPlan} keywords={keywords} />
            </main>
            <Footer />
        </div>
    );
};
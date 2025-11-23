import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const AdSenseUnit: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="w-full h-full min-h-[250px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-700">
        {/* 
            هذا هو كود الوحدة الإعلانية من Google AdSense.
            - استبدل "ca-pub-XXXXXXXXXXXXXXXX" بمعرّف الناشر الخاص بك.
            - استبدل "YYYYYYYYYY" بمعرّف الوحدة الإعلانية (Slot ID) الخاص بك.
        */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="YYYYYYYYYY"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <span className="absolute">مساحة إعلانية</span>
    </div>
  );
};
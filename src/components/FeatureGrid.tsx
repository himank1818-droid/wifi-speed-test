import { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { InfoModal } from './InfoModal';

interface FeatureCardProps {
  icon: React.ReactNode;
  titleKey: string;
  onClick: () => void;
}

function FeatureCard({ icon, titleKey, onClick }: FeatureCardProps) {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/[0.05] transition-all duration-300 cursor-pointer hover:scale-105"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-[#00e5ff]/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-[#00d4ff] text-center group-hover:text-[#00e5ff] transition-colors">
        {t(titleKey)}
      </h3>
    </button>
  );
}

export function FeatureGrid() {
  const { t } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const featureInfo: Record<string, React.ReactNode> = {
    desktop: (
      <>
        <p className="text-lg">
          Download our powerful desktop applications for Windows, macOS, and Linux to get the most accurate speed test results.
        </p>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">🖥️ Available Platforms:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span>
            <span><strong>Windows</strong> - Windows 10/11 (64-bit)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span>
            <span><strong>macOS</strong> - macOS 10.14 or later</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span>
            <span><strong>Linux</strong> - Ubuntu, Debian, Fedora</span>
          </li>
        </ul>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">⚡ Features:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>More accurate results than browser-based tests</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Test without browser limitations</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Save and compare historical results</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Schedule automatic speed tests</span>
          </li>
        </ul>
        <div className="mt-6 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            💡 <strong>Pro Tip:</strong> Desktop apps can utilize more system resources for more accurate gigabit speed testing!
          </p>
        </div>
      </>
    ),
    troubleshoot: (
      <>
        <p className="text-lg">
          Having WiFi issues? Our troubleshooting guide helps you identify and fix common WiFi problems to get the best performance from your network.
        </p>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">🔧 Common WiFi Problems:</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">📶 Weak Signal</h4>
            <p className="text-sm">Move closer to your router or remove physical obstructions like walls and metal objects.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">📱 Too Many Devices</h4>
            <p className="text-sm">Disconnect unused devices or upgrade to a router that supports more simultaneous connections.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">📡 Interference</h4>
            <p className="text-sm">Switch to a less crowded WiFi channel or use 5GHz band instead of 2.4GHz.</p>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">✅ Quick Fixes:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-[#00ff88]">1.</span>
            <span>Restart your router and modem</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00ff88]">2.</span>
            <span>Update router firmware</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00ff88]">3.</span>
            <span>Reposition your router centrally</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00ff88]">4.</span>
            <span>Use Ethernet for critical devices</span>
          </li>
        </ul>
      </>
    ),
    outages: (
      <>
        <p className="text-lg">
          Check if there are any internet outages in your area before troubleshooting your own equipment. Save time by knowing if it's a provider issue!
        </p>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">🚨 How to Check for Outages:</h3>
        <ol className="space-y-3 list-decimal list-inside">
          <li className="pl-2"><strong>Visit your ISP's website</strong> - Most providers have an outage map or status page</li>
          <li className="pl-2"><strong>Check Downdetector</strong> - See real-time outage reports from other users</li>
          <li className="pl-2"><strong>Social Media</strong> - Check Twitter/X for your ISP's official account</li>
          <li className="pl-2"><strong>Call Customer Service</strong> - Automated systems often report outages</li>
        </ol>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">📊 Common Outage Causes:</h3>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-white/[0.05]">
            <div className="text-[#00d4ff] font-bold">Weather</div>
            <div className="text-xs text-slate-400">Storms, heavy rain, snow</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.05]">
            <div className="text-[#00d4ff] font-bold">Construction</div>
            <div className="text-xs text-slate-400">Damaged cables</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.05]">
            <div className="text-[#00d4ff] font-bold">Power Outage</div>
            <div className="text-xs text-slate-400">No electricity = no internet</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.05]">
            <div className="text-[#00d4ff] font-bold">Maintenance</div>
            <div className="text-xs text-slate-400">Scheduled upgrades</div>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            ⏱️ <strong>Average outage duration:</strong> 2-4 hours for most providers
          </p>
        </div>
      </>
    ),
    isp: (
      <>
        <p className="text-lg">
          Prepare for a productive conversation with your Internet Service Provider. Get the information you need to negotiate better speeds or resolve issues.
        </p>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">📋 What to Prepare:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-xl">📊</span>
            <div>
              <div className="font-bold text-white">Speed Test Results</div>
              <div className="text-sm text-slate-400">Run multiple tests at different times and save the results</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-xl">📅</span>
            <div>
              <div className="font-bold text-white">Timeline of Issues</div>
              <div className="text-sm text-slate-400">Note when problems started and how often they occur</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-xl">💰</span>
            <div>
              <div className="font-bold text-white">Current Plan Details</div>
              <div className="text-sm text-slate-400">Know your promised speeds and monthly cost</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-xl">🏆</span>
            <div>
              <div className="font-bold text-white">Competitor Offers</div>
              <div className="text-sm text-slate-400">Research other providers in your area for leverage</div>
            </div>
          </li>
        </ul>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">💬 What to Say:</h3>
        <div className="p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm italic">
            "I've been running speed tests and consistently getting [X] Mbps when I'm paying for [Y] Mbps. I've documented this over [time period]. What can you do to resolve this?"
          </p>
        </div>
      </>
    ),
    speed: (
      <>
        <p className="text-lg">
          Not sure how much internet speed you actually need? Here's a comprehensive guide to help you choose the right plan for your household.
        </p>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">📊 Speed Recommendations:</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#00d4ff]">📱 Basic (1-3 devices)</span>
              <span className="text-[#00ff88] font-bold">25-50 Mbps</span>
            </div>
            <p className="text-xs text-slate-400">Web browsing, email, social media, SD streaming</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#00d4ff]">📺 Standard (3-5 devices)</span>
              <span className="text-[#00ff88] font-bold">100-200 Mbps</span>
            </div>
            <p className="text-xs text-slate-400">HD streaming, video calls, online gaming, working from home</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#00d4ff]">🚀 Fast (5-8 devices)</span>
              <span className="text-[#00ff88] font-bold">300-500 Mbps</span>
            </div>
            <p className="text-xs text-slate-400">4K streaming, large file downloads, multiple users</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#00d4ff]">⚡ Ultra (8+ devices)</span>
              <span className="text-[#00ff88] font-bold">500 Mbps - 1 Gbps+</span>
            </div>
            <p className="text-xs text-slate-400">Heavy 4K/8K streaming, content creation, smart home</p>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">🎯 By Activity:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Netflix HD:</span>
            <span className="text-[#00ff88]">5 Mbps</span>
          </li>
          <li className="flex justify-between">
            <span>Netflix 4K:</span>
            <span className="text-[#00ff88]">25 Mbps</span>
          </li>
          <li className="flex justify-between">
            <span>Zoom Call:</span>
            <span className="text-[#00ff88]">3 Mbps</span>
          </li>
          <li className="flex justify-between">
            <span>Online Gaming:</span>
            <span className="text-[#00ff88]">3-5 Mbps</span>
          </li>
          <li className="flex justify-between">
            <span>YouTube 4K:</span>
            <span className="text-[#00ff88]">20 Mbps</span>
          </li>
        </ul>
      </>
    ),
    mobile: (
      <>
        <p className="text-lg">
          Take speed tests on the go with our mobile apps! Test your cellular and WiFi speeds anywhere, anytime.
        </p>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">📱 Available Apps:</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-4">
            <div className="text-4xl">🤖</div>
            <div>
              <div className="font-bold text-white">Android</div>
              <div className="text-sm text-slate-400">Android 6.0+</div>
              <div className="text-xs text-[#00ff88]">✓ 5G Support</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-4">
            <div className="text-4xl">🍎</div>
            <div>
              <div className="font-bold text-white">iOS</div>
              <div className="text-sm text-slate-400">iOS 13.0+</div>
              <div className="text-xs text-[#00ff88]">✓ iPhone & iPad</div>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mt-6 mb-3">✨ Mobile App Features:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Test cellular network speeds (4G/5G)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>GPS-tagged test locations</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Save unlimited test history</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Share results instantly</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Dark mode support</span>
          </li>
        </ul>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-center text-[#00d4ff]">
            📲 <strong>Coming Soon:</strong> Apple TV, Android TV, and Smart TV apps!
          </p>
        </div>
      </>
    ),
  };

  const handleCardClick = (featureKey: string) => {
    setSelectedFeature(featureKey);
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
  };

  return (
    <>
      <section aria-label="Additional tools and features" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {t('features.title')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click on any feature to learn more
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard
            icon={
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 7h2" />
                <path d="M7 11h4" />
              </svg>
            }
            titleKey="feature.desktop"
            onClick={() => handleCardClick('desktop')}
          />
          <FeatureCard
            icon={
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M12 12l2.5 2.5" />
                <path d="M12 8v4" />
                <circle cx="4" cy="4" r="1" fill="#00d4ff" />
                <circle cx="20" cy="4" r="1" fill="#b84dff" />
                <circle cx="4" cy="20" r="1" fill="#00ff88" />
                <circle cx="20" cy="20" r="1" fill="#00e5ff" />
              </svg>
            }
            titleKey="feature.troubleshoot"
            onClick={() => handleCardClick('troubleshoot')}
          />
          <FeatureCard
            icon={
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="9" />
                <path d="M3.6 9h16.8" />
                <path d="M3.6 15h16.8" />
                <path d="M11.5 3a17 17 0 0 0 0 18" />
                <path d="M12.5 3a17 17 0 0 1 0 18" />
                <circle cx="12" cy="12" r="2" fill="#00d4ff" />
                <circle cx="6" cy="8" r="1.5" fill="#b84dff" />
                <circle cx="18" cy="6" r="1.5" fill="#00e5ff" />
                <circle cx="18" cy="16" r="1.5" fill="#00ff88" />
              </svg>
            }
            titleKey="feature.outages"
            onClick={() => handleCardClick('outages')}
          />
          <FeatureCard
            icon={
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
                <path d="M12 6V4" />
                <path d="M8 4v2" />
                <path d="M16 4v2" />
                <circle cx="12" cy="12" r="3" stroke="#00d4ff" strokeWidth={2} />
                <path d="M12 9v6M9 12h6" stroke="#00ff88" strokeWidth={1.5} />
              </svg>
            }
            titleKey="feature.isp"
            onClick={() => handleCardClick('isp')}
          />
          <FeatureCard
            icon={
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="5" y="2" width="14" height="20" rx="2" transform="rotate(12 12 12)" />
                <path d="M9 18h6" />
                <circle cx="12" cy="6" r="1" fill="#00d4ff" />
                <path d="M16 8c1.5 2 2 4 1.5 6" stroke="#00e5ff" strokeWidth={1.5} strokeLinecap="round" />
                <path d="M17 6c2 3 3 6 2 9" stroke="#b84dff" strokeWidth={1.5} strokeLinecap="round" />
                <path d="M8 10c-1 2-1 4 0 6" stroke="#00ff88" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            }
            titleKey="feature.speed"
            onClick={() => handleCardClick('speed')}
          />
          <FeatureCard
            icon={
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 7h2v2H7z" fill="#00d4ff" />
                <path d="M11 7h2v2h-2z" />
                <path d="M15 7h2v2h-2z" />
                <path d="M7 11h2v2H7z" />
                <path d="M11 11h2v2h-2z" fill="#00d4ff" />
                <path d="M15 11h2v2h-2z" />
                <path d="M7 15h2v2H7z" />
                <path d="M11 15h2v2h-2z" />
                <path d="M15 15h2v2h-2z" fill="#b84dff" />
                <circle cx="17" cy="17" r="3" stroke="#00ff88" strokeWidth={1.5} />
              </svg>
            }
            titleKey="feature.mobile"
            onClick={() => handleCardClick('mobile')}
          />
        </div>
      </section>

      {/* Info Modal */}
      <InfoModal
        isOpen={selectedFeature !== null}
        onClose={handleCloseModal}
        title={selectedFeature ? t(`feature.${selectedFeature}`) : ''}
        content={selectedFeature ? featureInfo[selectedFeature] : null}
      />
    </>
  );
}

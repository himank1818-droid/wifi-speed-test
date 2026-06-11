import { InfoModal } from './InfoModal';

interface FooterModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string | null;
}

export function FooterModal({ isOpen, onClose, section }: FooterModalProps) {
  if (!isOpen || !section) return null;

  const content: Record<string, React.ReactNode> = {
    // SPEEDTEST Section
    account: (
      <>
        <p className="text-lg">
          Create a free SpeedCheck account to unlock premium features and save your speed test history across all your devices.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">✨ Account Benefits:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Unlimited Test History</div>
              <div className="text-sm text-slate-400">Save all your speed tests forever</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Multi-Device Sync</div>
              <div className="text-sm text-slate-400">Access your history from any device</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Advanced Analytics</div>
              <div className="text-sm text-slate-400">Detailed charts and insights</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Priority Support</div>
              <div className="text-sm text-slate-400">Get help faster when you need it</div>
            </div>
          </li>
        </ul>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff] text-center">
            🎉 <strong>Free Forever!</strong> No credit card required
          </p>
        </div>
      </>
    ),

    advertise: (
      <>
        <p className="text-lg">
          Reach millions of users who care about internet performance. Advertise with SpeedCheck and connect with tech-savvy audiences.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📈 Advertising Options:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">🖼️ Display Ads</h4>
            <p className="text-sm text-slate-400">Banner ads on high-traffic pages</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">🎯 Sponsored Content</h4>
            <p className="text-sm text-slate-400">Native advertising in our blog</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">📧 Newsletter</h4>
            <p className="text-sm text-slate-400">Reach our email subscribers</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">🤝 Partnerships</h4>
            <p className="text-sm text-slate-400">Co-marketing opportunities</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📊 Our Audience:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#00d4ff]">50M+</div>
            <div className="text-xs text-slate-400">Monthly Users</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#00ff88]">195+</div>
            <div className="text-xs text-slate-400">Countries</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#b84dff]">2.5M</div>
            <div className="text-xs text-slate-400">Daily Tests</div>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            📧 Contact: advertising@speedcheck.app
          </p>
        </div>
      </>
    ),

    awards: (
      <>
        <p className="text-lg">
          SpeedCheck has been recognized globally for excellence in internet speed testing and network performance analysis.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🏆 Recent Awards:</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#ffd700]/10 to-[#ffaa00]/10 border border-[#ffd700]/30">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🥇</span>
              <div>
                <div className="font-bold text-[#ffd700]">Best Speed Test Tool 2025</div>
                <div className="text-sm text-slate-400">TechReview Awards</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#c0c0c0]/10 to-[#a0a0a0]/10 border border-[#c0c0c0]/30">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🥈</span>
              <div>
                <div className="font-bold text-[#c0c0c0]">Innovation in Networking 2024</div>
                <div className="text-sm text-slate-400">Global Tech Awards</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#cd7f32]/10 to-[#b87333]/10 border border-[#cd7f32]/30">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🥉</span>
              <div>
                <div className="font-bold text-[#cd7f32]">Best User Experience 2024</div>
                <div className="text-sm text-slate-400">UX Design Awards</div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📰 Press Coverage:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>"The most accurate speed test available" - <strong>TechCrunch</strong></span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>"Fast, reliable, and free" - <strong>The Verge</strong></span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>"Industry standard for speed testing" - <strong>CNET</strong></span>
          </li>
        </ul>
      </>
    ),

    servers: (
      <>
        <p className="text-lg">
          Access our global network of 50,000+ speed test servers. Find the nearest server for the most accurate results.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🌍 Server Network:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#00d4ff]">50,000+</div>
            <div className="text-xs text-slate-400">Total Servers</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#00ff88]">195+</div>
            <div className="text-xs text-slate-400">Countries</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#b84dff]">8,000+</div>
            <div className="text-xs text-slate-400">Cities</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05]">
            <div className="text-2xl font-bold text-[#00e5ff]">99.9%</div>
            <div className="text-xs text-slate-400">Uptime</div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🖥️ Server Types:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">🏢</span>
            <div>
              <div className="font-bold text-white">Enterprise Servers</div>
              <div className="text-sm text-slate-400">High-capacity servers for accurate gigabit testing</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">🏠</span>
            <div>
              <div className="font-bold text-white">Community Servers</div>
              <div className="text-sm text-slate-400">User-hosted servers for better local coverage</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">☁️</span>
            <div>
              <div className="font-bold text-white">Cloud Servers</div>
              <div className="text-sm text-slate-400">Distributed cloud infrastructure for reliability</div>
            </div>
          </li>
        </ul>
        <div className="mt-6 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            🖥️ Want to host a server? Contact: servers@speedcheck.app
          </p>
        </div>
      </>
    ),

    directory: (
      <>
        <p className="text-lg">
          Browse our comprehensive directory of internet service providers, speed test results, and network performance data.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📂 Directory Categories:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">🌐 ISP Directory</h4>
            <p className="text-sm text-slate-400">Find ISPs in your area with ratings and reviews</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">📊 Speed Rankings</h4>
            <p className="text-sm text-slate-400">Compare speeds by country, city, and provider</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">📱 Mobile Networks</h4>
            <p className="text-sm text-slate-400">4G/5G performance by carrier and location</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">🏢 Business ISPs</h4>
            <p className="text-sm text-slate-400">Enterprise-grade internet providers</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🔍 Search Features:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Search by ZIP/postal code</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Filter by speed tier</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Compare multiple providers</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Read user reviews</span>
          </li>
        </ul>
      </>
    ),

    // ZIFF DAVIS Section
    ziff: (
      <>
        <p className="text-lg">
          Ziff Davis is a leading digital media and internet company. We own and operate some of the most trusted brands in technology, gaming, and entertainment.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🏢 About Ziff Davis:</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Founded</h4>
            <p className="text-sm text-slate-400">1927 (95+ years of excellence)</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Headquarters</h4>
            <p className="text-sm text-slate-400">New York City, USA</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Employees</h4>
            <p className="text-sm text-slate-400">2,500+ worldwide</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Stock</h4>
            <p className="text-sm text-slate-400">NASDAQ: ZD</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🌐 Ziff Davis Brands:</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/[0.05]">PCMag</div>
          <div className="p-3 rounded-lg bg-white/[0.05]">IGN</div>
          <div className="p-3 rounded-lg bg-white/[0.05]">Mashable</div>
          <div className="p-3 rounded-lg bg-white/[0.05]">Lifehacker</div>
          <div className="p-3 rounded-lg bg-white/[0.05]">ExtremeTech</div>
          <div className="p-3 rounded-lg bg-white/[0.05]">Speedtest</div>
        </div>
      </>
    ),

    // OOKLA BRANDS Section
    downdetector: (
      <>
        <p className="text-lg">
          Downdetector provides real-time status information about popular websites, services, and networks. Know when there's an outage before anyone else!
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🚨 What Downdetector Does:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#ff4444] text-lg">⚠️</span>
            <div>
              <div className="font-bold text-white">Real-Time Outage Detection</div>
              <div className="text-sm text-slate-400">Know immediately when services go down</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">📊</span>
            <div>
              <div className="font-bold text-white">User Reports</div>
              <div className="text-sm text-slate-400">Millions of users report issues daily</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">📍</span>
            <div>
              <div className="font-bold text-white">Outage Maps</div>
              <div className="text-sm text-slate-400">See problems in your area</div>
            </div>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📱 Covered Services:</h3>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="p-2 rounded bg-white/[0.05]">Internet Providers</div>
          <div className="p-2 rounded bg-white/[0.05]">Social Media</div>
          <div className="p-2 rounded bg-white/[0.05]">Streaming</div>
          <div className="p-2 rounded bg-white/[0.05]">Gaming</div>
          <div className="p-2 rounded bg-white/[0.05]">Cloud Services</div>
          <div className="p-2 rounded bg-white/[0.05]">Mobile Networks</div>
        </div>
      </>
    ),

    ekahau: (
      <>
        <p className="text-lg">
          Ekahau is the global leader in WiFi design and troubleshooting software. Professional-grade tools for network engineers and IT professionals.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4"> Ekahau Products:</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Ekahau Pro</h4>
            <p className="text-sm text-slate-400">WiFi design and survey software for professionals</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Ekahau Sidekick</h4>
            <p className="text-sm text-slate-400">Hardware survey tool for accurate measurements</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">Ekahau Cloud</h4>
            <p className="text-sm text-slate-400">Cloud-based WiFi management and analytics</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4"> For Professionals:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Network design and planning</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>WiFi troubleshooting</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Site surveys</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Heat mapping</span>
          </li>
        </ul>
      </>
    ),

    rootmetrics: (
      <>
        <p className="text-lg">
          RootMetrics provides independent, unbiased mobile network performance data. See which carrier really performs best in your area.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📱 What RootMetrics Measures:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">📶 Performance</h4>
            <p className="text-sm text-slate-400">Speed, reliability, and coverage</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">🌐 Network Types</h4>
            <p className="text-sm text-slate-400">4G LTE and 5G performance</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">📍 Locations</h4>
            <p className="text-sm text-slate-400">Nationwide, metro, and local areas</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <h4 className="font-bold text-[#00d4ff] mb-2">✈️ Travel</h4>
            <p className="text-sm text-slate-400">Airport and transportation hubs</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📊 RootMetrics Reports:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>RootScore Reports (biannual)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>5G Performance Analysis</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#00d4ff]">•</span>
            <span>Carrier Comparisons</span>
          </li>
        </ul>
      </>
    ),

    // APPS Section
    app_android: (
      <>
        <p className="text-lg">
          Download SpeedCheck for Android and test your internet speed on the go. Optimized for both WiFi and mobile networks.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🤖 Android App Features:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">5G Speed Testing</div>
              <div className="text-sm text-slate-400">Measure your 5G network performance</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">GPS Tagging</div>
              <div className="text-sm text-slate-400">Save test locations on a map</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Unlimited History</div>
              <div className="text-sm text-slate-400">Save all your tests locally</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Widget Support</div>
              <div className="text-sm text-slate-400">Quick test from home screen</div>
            </div>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📋 Requirements:</h3>
        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">Android Version</div>
              <div className="text-white font-bold">Android 6.0+</div>
            </div>
            <div>
              <div className="text-slate-400">Size</div>
              <div className="text-white font-bold">25 MB</div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff] text-center">
            ⭐ 4.8/5 stars on Google Play • 10M+ downloads
          </p>
        </div>
      </>
    ),

    app_appletv: (
      <>
        <p className="text-lg">
          Test your Apple TV's internet connection directly on your TV. Perfect for checking if your setup supports 4K streaming.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📺 Apple TV App Features:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">📺</span>
            <div>
              <div className="font-bold text-white">TV-Optimized Interface</div>
              <div className="text-sm text-slate-400">Navigate with Siri Remote</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">🎬</span>
            <div>
              <div className="font-bold text-white">Streaming Readiness</div>
              <div className="text-sm text-slate-400">Check if your speed supports 4K/HDR</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">📊</span>
            <div>
              <div className="font-bold text-white">Large Display Results</div>
              <div className="text-sm text-slate-400">Easy to read from your couch</div>
            </div>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📋 Requirements:</h3>
        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">tvOS Version</div>
              <div className="text-white font-bold">tvOS 14+</div>
            </div>
            <div>
              <div className="text-slate-400">Compatibility</div>
              <div className="text-white font-bold">Apple TV 4K, HD</div>
            </div>
          </div>
        </div>
      </>
    ),

    app_ios: (
      <>
        <p className="text-lg">
          SpeedCheck for iOS delivers accurate speed tests optimized for iPhone and iPad. Test WiFi and cellular networks with ease.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🍎 iOS App Features:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">5G Testing</div>
              <div className="text-sm text-slate-400">Measure 5G speeds on supported devices</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Widget Support</div>
              <div className="text-sm text-slate-400">iOS 14+ home screen widgets</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">iCloud Sync</div>
              <div className="text-sm text-slate-400">Sync history across Apple devices</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Siri Shortcuts</div>
              <div className="text-sm text-slate-400">Voice-activated speed tests</div>
            </div>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📋 Requirements:</h3>
        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">iOS Version</div>
              <div className="text-white font-bold">iOS 14.0+</div>
            </div>
            <div>
              <div className="text-slate-400">Size</div>
              <div className="text-white font-bold">45 MB</div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff] text-center">
            ⭐ 4.9/5 stars on App Store • Editor's Choice
          </p>
        </div>
      </>
    ),

    app_macos: (
      <>
        <p className="text-lg">
          SpeedCheck for macOS brings professional-grade speed testing to your Mac. Perfect for network professionals and power users.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">💻 macOS App Features:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Native Apple Silicon</div>
              <div className="text-sm text-slate-400">Optimized for M1/M2/M3 chips</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Menu Bar App</div>
              <div className="text-sm text-slate-400">Quick tests from menu bar</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Advanced Analytics</div>
              <div className="text-sm text-slate-400">Detailed network statistics</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Scheduled Tests</div>
              <div className="text-sm text-slate-400">Automated periodic testing</div>
            </div>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📋 Requirements:</h3>
        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">macOS Version</div>
              <div className="text-white font-bold">macOS 11.0+</div>
            </div>
            <div>
              <div className="text-slate-400">Size</div>
              <div className="text-white font-bold">65 MB</div>
            </div>
          </div>
        </div>
      </>
    ),

    app_windows: (
      <>
        <p className="text-lg">
          SpeedCheck for Windows delivers the most accurate speed tests on PC. Ideal for gamers, streamers, and remote workers.
        </p>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">🪟 Windows App Features:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Gigabit Testing</div>
              <div className="text-sm text-slate-400">Accurate tests up to 10 Gbps</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">System Tray App</div>
              <div className="text-sm text-slate-400">Quick access from taskbar</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Gaming Mode</div>
              <div className="text-sm text-slate-400">Optimized for low latency testing</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00ff88] text-lg">✓</span>
            <div>
              <div className="font-bold text-white">Export Reports</div>
              <div className="text-sm text-slate-400">Save results as PDF/CSV</div>
            </div>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white mt-6 mb-4">📋 Requirements:</h3>
        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">Windows Version</div>
              <div className="text-white font-bold">Windows 10/11</div>
            </div>
            <div>
              <div className="text-slate-400">Architecture</div>
              <div className="text-white font-bold">64-bit</div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff] text-center">
            🎮 Recommended by pro gamers worldwide
          </p>
        </div>
      </>
    ),
  };

  const titles: Record<string, string> = {
    account: '👤 Create Account',
    advertise: '📢 Advertise With Us',
    awards: '🏆 Speedtest Awards',
    servers: '🖥️ Speedtest Servers',
    directory: '📂 Performance Directory',
    ziff: '🏢 Ziff Davis',
    downdetector: '🚨 Downdetector',
    ekahau: '📡 Ekahau',
    rootmetrics: '📊 RootMetrics',
    app_android: '🤖 Android App',
    app_appletv: '📺 Apple TV App',
    app_ios: '🍎 iOS App',
    app_macos: '💻 macOS App',
    app_windows: '🪟 Windows App',
  };

  return (
    <InfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[section] || ''}
      content={content[section] || null}
    />
  );
}

"""
Full generation script for all 6 projects:
1. Study Tracker Lockon
2. NSFS ERP
3. Duragrit QR ERP
4. Insurance Tracker
5. Social Media Video App
6. Game Tracker (50+ Games)
"""
import os

os.makedirs("public/images/projects", exist_ok=True)

# 1. Study Tracker Lockon SVG
study_tracker_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="50%" stop-color="#1E1B4B"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1200" height="760" fill="url(#bgGrad)"/>
  <circle cx="200" cy="180" r="160" fill="#6366F1" opacity="0.15" filter="url(#glow)"/>
  <circle cx="1050" cy="580" r="200" fill="#A855F7" opacity="0.12" filter="url(#glow)"/>

  <!-- Window Chrome Header -->
  <rect x="30" y="30" width="1140" height="50" rx="14" fill="#0B0F19" stroke="#334155" stroke-width="1.2"/>
  <circle cx="60" cy="55" r="7" fill="#EF4444"/>
  <circle cx="82" cy="55" r="7" fill="#F59E0B"/>
  <circle cx="104" cy="55" r="7" fill="#10B981"/>
  
  <rect x="150" y="42" width="620" height="26" rx="7" fill="#1E293B" stroke="#475569" stroke-width="0.8"/>
  <text x="170" y="60" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12">https://app.lockonstudy.com/dashboard/focus-session</text>
  <rect x="740" y="47" width="16" height="16" rx="4" fill="#10B981" opacity="0.3"/>
  <circle cx="748" cy="55" r="3.5" fill="#10B981"/>

  <rect x="1000" y="42" width="150" height="26" rx="13" fill="#1E293B" stroke="#475569" stroke-width="0.8"/>
  <circle cx="1015" cy="55" r="8" fill="url(#accentGrad)"/>
  <text x="1030" y="60" fill="#F1F5F9" font-family="sans-serif" font-size="11" font-weight="600">Arjun Sharma (Rank #3)</text>

  <!-- Main Window Body -->
  <rect x="30" y="90" width="1140" height="640" rx="14" fill="#0B0F19" fill-opacity="0.95" stroke="#334155" stroke-width="1.2"/>

  <!-- Left Sidebar Navigation -->
  <rect x="40" y="100" width="220" height="620" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
  
  <rect x="60" y="125" width="36" height="36" rx="9" fill="url(#accentGrad)"/>
  <text x="70" y="150" fill="#FFFFFF" font-family="sans-serif" font-size="20">🎯</text>
  <text x="105" y="142" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold">LockOn Study</text>
  <text x="105" y="156" fill="#818CF8" font-family="sans-serif" font-size="10" font-weight="600">DEEP FOCUS ANALYTICS</text>

  <rect x="52" y="185" width="196" height="38" rx="8" fill="url(#accentGrad)"/>
  <text x="75" y="210" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">🎯 Deep Work Timer</text>

  <rect x="52" y="233" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="258" fill="#94A3B8" font-family="sans-serif" font-size="13">📊 Syllabus Mastery</text>

  <rect x="52" y="281" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="306" fill="#94A3B8" font-family="sans-serif" font-size="13">🔥 48-Day Streak Hub</text>

  <rect x="52" y="329" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="354" fill="#94A3B8" font-family="sans-serif" font-size="13">🛡️ Distraction Shield</text>

  <rect x="52" y="377" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="402" fill="#94A3B8" font-family="sans-serif" font-size="13">🏆 Leaderboard &amp; Cohort</text>

  <rect x="52" y="560" width="196" height="140" rx="10" fill="#1E1B4B" stroke="#4338CA" stroke-width="1"/>
  <text x="70" y="588" fill="#FDE047" font-family="sans-serif" font-size="12" font-weight="bold">🔥 STREAK UNBROKEN</text>
  <text x="70" y="625" fill="#FFFFFF" font-family="sans-serif" font-size="34" font-weight="900">48 <tspan font-size="14" fill="#A5B4FC">DAYS</tspan></text>
  <text x="70" y="650" fill="#94A3B8" font-family="sans-serif" font-size="11">Top 1% discipline ranking</text>
  <rect x="70" y="665" width="160" height="6" rx="3" fill="#312E81"/>
  <rect x="70" y="665" width="140" height="6" rx="3" fill="url(#timerGrad)"/>

  <!-- Top Stat Cards -->
  <g transform="translate(280, 110)">
    <rect x="0" y="0" width="280" height="110" rx="12" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <text x="20" y="32" fill="#94A3B8" font-family="sans-serif" font-size="11" font-weight="bold">TODAY'S DEEP FOCUS</text>
    <text x="20" y="72" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">5h 42m</text>
    <rect x="20" y="84" width="100" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
    <text x="26" y="97" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="600">+1.5h vs yesterday</text>
    <circle cx="235" cy="55" r="28" fill="#312E81" stroke="#6366F1" stroke-width="3"/>
    <text x="223" y="61" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold">82%</text>

    <rect x="300" y="0" width="280" height="110" rx="12" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <text x="320" y="32" fill="#94A3B8" font-family="sans-serif" font-size="11" font-weight="bold">SYLLABUS RETENTION</text>
    <text x="320" y="72" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">89.4%</text>
    <text x="320" y="97" fill="#A78BFA" font-family="sans-serif" font-size="11">142 of 160 Topics Cleared</text>

    <rect x="600" y="0" width="265" height="110" rx="12" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <text x="620" y="32" fill="#94A3B8" font-family="sans-serif" font-size="11" font-weight="bold">SHIELD PROTECTION</text>
    <text x="620" y="72" fill="#10B981" font-family="sans-serif" font-size="24" font-weight="bold">ACTIVE 🔒</text>
    <text x="620" y="97" fill="#6EE7B7" font-family="sans-serif" font-size="11">42 App Distractions Blocked</text>
  </g>

  <!-- Big Central Focus Timer -->
  <g transform="translate(280, 240)">
    <rect x="0" y="0" width="560" height="470" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.2"/>
    <text x="30" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="18" font-weight="bold">Active Lock-in Pomodoro Session</text>
    <text x="30" y="64" fill="#94A3B8" font-family="sans-serif" font-size="12">Subject: Advanced Organic Chemistry • Target: Reaction Mechanisms</text>
    
    <circle cx="280" cy="220" r="130" fill="#0B0F19" stroke="#1E293B" stroke-width="12"/>
    <circle cx="280" cy="220" r="130" fill="none" stroke="url(#accentGrad)" stroke-width="12" stroke-dasharray="816" stroke-dashoffset="240" stroke-linecap="round"/>
    
    <text x="180" y="215" fill="#FFFFFF" font-family="monospace" font-size="44" font-weight="bold">02:45:18</text>
    <text x="220" y="248" fill="#818CF8" font-family="sans-serif" font-size="12" font-weight="600">DEEP LOCK-IN PHASE</text>
    
    <rect x="180" y="280" width="200" height="42" rx="21" fill="url(#accentGrad)"/>
    <text x="230" y="306" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold">PAUSE LOCK-IN</text>

    <rect x="30" y="370" width="500" height="75" rx="10" fill="#1E293B" stroke="#334155" stroke-width="0.8"/>
    <text x="50" y="398" fill="#E2E8F0" font-family="sans-serif" font-size="12" font-weight="600">Study Intensity Breakdown (Last 7 Days)</text>
    
    <rect x="50" y="415" width="40" height="20" rx="3" fill="#4F46E5"/>
    <rect x="110" y="410" width="40" height="25" rx="3" fill="#6366F1"/>
    <rect x="170" y="405" width="40" height="30" rx="3" fill="#818CF8"/>
    <rect x="230" y="412" width="40" height="23" rx="3" fill="#4F46E5"/>
    <rect x="290" y="400" width="40" height="35" rx="3" fill="#A855F7"/>
    <rect x="350" y="395" width="40" height="40" rx="3" fill="#C084FC"/>
    <rect x="410" y="392" width="40" height="43" rx="3" fill="#F43F5E"/>
    <text x="460" y="420" fill="#F43F5E" font-family="sans-serif" font-size="11" font-weight="bold">9.2 hrs peak</text>
  </g>

  <!-- Right Side Analytics -->
  <g transform="translate(860, 240)">
    <rect x="0" y="0" width="285" height="470" rx="14" fill="#0F172A" stroke="#1E293B" stroke-width="1.2"/>
    <text x="25" y="38" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold">Subject Mastery Index</text>
    
    <text x="25" y="75" fill="#E2E8F0" font-family="sans-serif" font-size="12" font-weight="600">Theoretical Physics</text>
    <text x="220" y="75" fill="#34D399" font-family="sans-serif" font-size="12" font-weight="bold">94%</text>
    <rect x="25" y="85" width="235" height="8" rx="4" fill="#1E293B"/>
    <rect x="25" y="85" width="220" height="8" rx="4" fill="#10B981"/>

    <text x="25" y="125" fill="#E2E8F0" font-family="sans-serif" font-size="12" font-weight="600">Calculus &amp; Linear Algebra</text>
    <text x="220" y="125" fill="#60A5FA" font-family="sans-serif" font-size="12" font-weight="bold">88%</text>
    <rect x="25" y="135" width="235" height="8" rx="4" fill="#1E293B"/>
    <rect x="25" y="135" width="205" height="8" rx="4" fill="#3B82F6"/>

    <text x="25" y="175" fill="#E2E8F0" font-family="sans-serif" font-size="12" font-weight="600">Organic Chemistry</text>
    <text x="220" y="175" fill="#FBBF24" font-family="sans-serif" font-size="12" font-weight="bold">79%</text>
    <rect x="25" y="185" width="235" height="8" rx="4" fill="#1E293B"/>
    <rect x="25" y="185" width="185" height="8" rx="4" fill="#F59E0B"/>

    <text x="25" y="240" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold">National Rank Leaderboard</text>
    
    <rect x="20" y="260" width="245" height="42" rx="8" fill="#1E293B"/>
    <text x="35" y="286" fill="#FBBF24" font-family="sans-serif" font-size="12" font-weight="bold">#1</text>
    <circle cx="65" cy="281" r="10" fill="#F59E0B"/>
    <text x="85" y="286" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="600">Priya Nair (AIIMS)</text>
    <text x="210" y="286" fill="#A78BFA" font-family="sans-serif" font-size="11">68d streak</text>

    <rect x="20" y="310" width="245" height="42" rx="8" fill="#1E293B"/>
    <text x="35" y="336" fill="#94A3B8" font-family="sans-serif" font-size="12" font-weight="bold">#2</text>
    <circle cx="65" cy="331" r="10" fill="#94A3B8"/>
    <text x="85" y="336" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="600">Rohan Sengupta</text>
    <text x="210" y="336" fill="#A78BFA" font-family="sans-serif" font-size="11">54d streak</text>

    <rect x="20" y="360" width="245" height="42" rx="8" fill="#312E81" stroke="#6366F1" stroke-width="1"/>
    <text x="35" y="386" fill="#818CF8" font-family="sans-serif" font-size="12" font-weight="bold">#3</text>
    <circle cx="65" cy="381" r="10" fill="#6366F1"/>
    <text x="85" y="386" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">You (Arjun)</text>
    <text x="210" y="386" fill="#FDE047" font-family="sans-serif" font-size="11" font-weight="bold">48d streak</text>

    <rect x="20" y="415" width="245" height="40" rx="8" fill="#0B0F19" stroke="#334155" stroke-width="0.8"/>
    <text x="40" y="440" fill="#94A3B8" font-family="sans-serif" font-size="10">⚡ 120,000+ Active Students Enrolled</text>
  </g>
</svg>'''

# 2. NSFS ERP SVG (Educational Academy / School ERP)
nsfs_erp_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="100%" height="100%">
  <defs>
    <linearGradient id="nsfsBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064E3B"/>
      <stop offset="40%" stop-color="#062C24"/>
      <stop offset="100%" stop-color="#021C16"/>
    </linearGradient>
    <linearGradient id="nsfsGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
    <linearGradient id="nsfsEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="760" fill="url(#nsfsBg)"/>
  
  <rect x="30" y="30" width="1140" height="50" rx="14" fill="#03211B" stroke="#065F46" stroke-width="1.2"/>
  <circle cx="60" cy="55" r="7" fill="#EF4444"/>
  <circle cx="82" cy="55" r="7" fill="#F59E0B"/>
  <circle cx="104" cy="55" r="7" fill="#10B981"/>
  
  <rect x="150" y="42" width="620" height="26" rx="7" fill="#064E3B" stroke="#047857" stroke-width="0.8"/>
  <text x="170" y="60" fill="#A7F3D0" font-family="sans-serif" font-size="12">https://portal.nsfserp.org/admin/school-governance</text>
  <rect x="740" y="47" width="16" height="16" rx="4" fill="#10B981" opacity="0.3"/>
  <circle cx="748" cy="55" r="3.5" fill="#10B981"/>

  <rect x="980" y="42" width="170" height="26" rx="13" fill="#064E3B" stroke="#059669" stroke-width="0.8"/>
  <circle cx="995" cy="55" r="8" fill="url(#nsfsGold)"/>
  <text x="1010" y="60" fill="#FEF3C7" font-family="sans-serif" font-size="11" font-weight="600">Director Portal (NSFS)</text>

  <rect x="30" y="90" width="1140" height="640" rx="14" fill="#02211A" stroke="#065F46" stroke-width="1.2"/>

  <!-- Left Sidebar -->
  <rect x="40" y="100" width="230" height="620" rx="10" fill="#043228" stroke="#065F46" stroke-width="1"/>
  
  <rect x="60" y="125" width="38" height="38" rx="9" fill="url(#nsfsGold)"/>
  <text x="69" y="152" fill="#78350F" font-family="sans-serif" font-size="20" font-weight="bold">🏛️</text>
  <text x="108" y="142" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">NSFS ERP</text>
  <text x="108" y="156" fill="#FBBF24" font-family="sans-serif" font-size="10" font-weight="bold">EDUCATION SYSTEM</text>

  <rect x="52" y="185" width="206" height="38" rx="8" fill="url(#nsfsEmerald)"/>
  <text x="75" y="210" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">🎓 Student Directory (14.8k)</text>

  <rect x="52" y="233" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="258" fill="#A7F3D0" font-family="sans-serif" font-size="13">💰 Fee Collection &amp; Receipts</text>

  <rect x="52" y="281" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="306" fill="#A7F3D0" font-family="sans-serif" font-size="13">📅 Biometric Attendance</text>

  <rect x="52" y="329" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="354" fill="#A7F3D0" font-family="sans-serif" font-size="13">📑 Examination &amp; Report Cards</text>

  <rect x="52" y="377" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="402" fill="#A7F3D0" font-family="sans-serif" font-size="13">👨‍🏫 Faculty Timetables &amp; Payroll</text>

  <rect x="52" y="425" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="450" fill="#A7F3D0" font-family="sans-serif" font-size="13">📲 Parent SMS &amp; App Broadcast</text>

  <rect x="52" y="570" width="206" height="130" rx="10" fill="#064E3B" stroke="#059669" stroke-width="1"/>
  <text x="70" y="598" fill="#FBBF24" font-family="sans-serif" font-size="12" font-weight="bold">CAMPUS STATUS</text>
  <text x="70" y="630" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">98.4%</text>
  <text x="70" y="652" fill="#D1FAE5" font-family="sans-serif" font-size="11">Staff &amp; Students Clocked-In</text>
  <text x="70" y="680" fill="#34D399" font-family="sans-serif" font-size="11">● 6 Campuses Synced in Realtime</text>

  <!-- Top Metrics -->
  <g transform="translate(290, 110)">
    <rect x="0" y="0" width="265" height="110" rx="12" fill="#043228" stroke="#065F46" stroke-width="1"/>
    <text x="20" y="32" fill="#A7F3D0" font-family="sans-serif" font-size="11" font-weight="bold">TOTAL ENROLLED STUDENTS</text>
    <text x="20" y="72" fill="#FFFFFF" font-family="sans-serif" font-size="30" font-weight="bold">14,820</text>
    <text x="20" y="97" fill="#FBBF24" font-family="sans-serif" font-size="11">Across 6 Integrated Campuses</text>

    <rect x="285" y="0" width="275" height="110" rx="12" fill="#043228" stroke="#065F46" stroke-width="1"/>
    <text x="305" y="32" fill="#A7F3D0" font-family="sans-serif" font-size="11" font-weight="bold">TERM FEE RECOVERY RATE</text>
    <text x="305" y="72" fill="#34D399" font-family="sans-serif" font-size="30" font-weight="bold">₹1.42 Cr</text>
    <text x="305" y="97" fill="#6EE7B7" font-family="sans-serif" font-size="11">94.2% Collected via Auto-PG</text>

    <rect x="580" y="0" width="280" height="110" rx="12" fill="#043228" stroke="#065F46" stroke-width="1"/>
    <text x="600" y="32" fill="#A7F3D0" font-family="sans-serif" font-size="11" font-weight="bold">FACULTY PAYROLL AUTOMATION</text>
    <text x="600" y="72" fill="#FBBF24" font-family="sans-serif" font-size="30" font-weight="bold">100%</text>
    <text x="600" y="97" fill="#D1FAE5" font-family="sans-serif" font-size="11">Automated GST &amp; TDS Filing</text>
  </g>

  <!-- Big Central Table -->
  <g transform="translate(290, 240)">
    <rect x="0" y="0" width="860" height="470" rx="14" fill="#043228" stroke="#065F46" stroke-width="1.2"/>
    
    <text x="30" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="17" font-weight="bold">Live Student Roster &amp; Fee Ledger (Class XII - Science Cohort)</text>
    <text x="30" y="64" fill="#A7F3D0" font-family="sans-serif" font-size="12">Instant Biometric Logs • Multi-Branch Automatic Fee Reconciliation • Parent Portal Connected</text>

    <rect x="25" y="85" width="810" height="38" rx="8" fill="#064E3B"/>
    <text x="45" y="109" fill="#FBBF24" font-family="sans-serif" font-size="11" font-weight="bold">ROLL NO</text>
    <text x="140" y="109" fill="#FBBF24" font-family="sans-serif" font-size="11" font-weight="bold">STUDENT NAME</text>
    <text x="300" y="109" fill="#FBBF24" font-family="sans-serif" font-size="11" font-weight="bold">CAMPUS</text>
    <text x="420" y="109" fill="#FBBF24" font-family="sans-serif" font-size="11" font-weight="bold">ATTENDANCE</text>
    <text x="560" y="109" fill="#FBBF24" font-family="sans-serif" font-size="11" font-weight="bold">TERM FEE</text>
    <text x="700" y="109" fill="#FBBF24" font-family="sans-serif" font-size="11" font-weight="bold">ACTIONS</text>

    <!-- Row 1 -->
    <rect x="25" y="130" width="810" height="48" rx="6" fill="#03241C"/>
    <text x="45" y="160" fill="#E2E8F0" font-family="monospace" font-size="12">#NS-10482</text>
    <text x="140" y="160" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Aarav Singhania</text>
    <text x="300" y="160" fill="#A7F3D0" font-family="sans-serif" font-size="12">Sector 62 Campus</text>
    <rect x="420" y="145" width="90" height="22" rx="11" fill="#059669" fill-opacity="0.25"/>
    <text x="430" y="160" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">96.8% Present</text>
    <text x="560" y="160" fill="#34D399" font-family="sans-serif" font-size="12" font-weight="bold">₹48,000 (PAID)</text>
    <rect x="700" y="143" width="90" height="24" rx="6" fill="#059669"/>
    <text x="715" y="159" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Print Receipt</text>

    <!-- Row 2 -->
    <rect x="25" y="185" width="810" height="48" rx="6" fill="#021C16"/>
    <text x="45" y="215" fill="#E2E8F0" font-family="monospace" font-size="12">#NS-10483</text>
    <text x="140" y="215" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Meera Venkatesh</text>
    <text x="300" y="215" fill="#A7F3D0" font-family="sans-serif" font-size="12">North Central Campus</text>
    <rect x="420" y="200" width="90" height="22" rx="11" fill="#059669" fill-opacity="0.25"/>
    <text x="430" y="215" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">99.1% Present</text>
    <text x="560" y="215" fill="#34D399" font-family="sans-serif" font-size="12" font-weight="bold">₹48,000 (PAID)</text>
    <rect x="700" y="198" width="90" height="24" rx="6" fill="#059669"/>
    <text x="715" y="214" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Print Receipt</text>

    <!-- Row 3 -->
    <rect x="25" y="240" width="810" height="48" rx="6" fill="#03241C"/>
    <text x="45" y="270" fill="#E2E8F0" font-family="monospace" font-size="12">#NS-10484</text>
    <text x="140" y="270" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Kabir Malhotra</text>
    <text x="300" y="270" fill="#A7F3D0" font-family="sans-serif" font-size="12">Heritage Academy Wing</text>
    <rect x="420" y="255" width="80" height="22" rx="11" fill="#EF4444" fill-opacity="0.25"/>
    <text x="440" y="270" fill="#F87171" font-family="sans-serif" font-size="11" font-weight="bold">Absent</text>
    <text x="560" y="270" fill="#FBBF24" font-family="sans-serif" font-size="12" font-weight="bold">₹12,000 (DUE)</text>
    <rect x="700" y="253" width="90" height="24" rx="6" fill="#D97706"/>
    <text x="712" y="269" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Send SMS Alert</text>

    <!-- Row 4 -->
    <rect x="25" y="295" width="810" height="48" rx="6" fill="#021C16"/>
    <text x="45" y="325" fill="#E2E8F0" font-family="monospace" font-size="12">#NS-10485</text>
    <text x="140" y="325" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Ananya Deshmukh</text>
    <text x="300" y="325" fill="#A7F3D0" font-family="sans-serif" font-size="12">South Wing Campus</text>
    <rect x="420" y="310" width="90" height="22" rx="11" fill="#059669" fill-opacity="0.25"/>
    <text x="430" y="325" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">94.2% Present</text>
    <text x="560" y="325" fill="#34D399" font-family="sans-serif" font-size="12" font-weight="bold">₹48,000 (PAID)</text>
    <rect x="700" y="308" width="90" height="24" rx="6" fill="#059669"/>
    <text x="715" y="324" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Print Receipt</text>

    <!-- Bottom summary banner in table -->
    <rect x="25" y="365" width="810" height="80" rx="10" fill="#064E3B" stroke="#059669" stroke-width="1"/>
    <text x="45" y="398" fill="#FBBF24" font-family="sans-serif" font-size="13" font-weight="bold">AUTOMATED CBSE &amp; STATE BOARD AUDIT READY</text>
    <text x="45" y="424" fill="#D1FAE5" font-family="sans-serif" font-size="12">Encrypted PostgreSQL storage with role-based permissions for Principals, Accountants, Teachers, and Parents.</text>
    <rect x="670" y="388" width="145" height="34" rx="8" fill="url(#nsfsGold)"/>
    <text x="685" y="410" fill="#78350F" font-family="sans-serif" font-size="11" font-weight="bold">Export Full Audit PDF</text>
  </g>
</svg>'''

# 3. Duragrit QR ERP Model SVG (Industrial / Asset & Inventory QR Tracking ERP)
duragrit_qr_erp_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="100%" height="100%">
  <defs>
    <linearGradient id="duraBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181B"/>
      <stop offset="40%" stop-color="#09090B"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="duraAmber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EA580C"/>
      <stop offset="50%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#FB923C"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="760" fill="url(#duraBg)"/>

  <rect x="30" y="30" width="1140" height="50" rx="14" fill="#18181B" stroke="#3F3F46" stroke-width="1.2"/>
  <circle cx="60" cy="55" r="7" fill="#EF4444"/>
  <circle cx="82" cy="55" r="7" fill="#F59E0B"/>
  <circle cx="104" cy="55" r="7" fill="#10B981"/>
  
  <rect x="150" y="42" width="620" height="26" rx="7" fill="#27272A" stroke="#52525B" stroke-width="0.8"/>
  <text x="170" y="60" fill="#D4D4D8" font-family="sans-serif" font-size="12">https://erp.duragrit.com/manufacturing/qr-asset-ledger</text>
  <rect x="740" y="47" width="16" height="16" rx="4" fill="#F97316" opacity="0.3"/>
  <circle cx="748" cy="55" r="3.5" fill="#F97316"/>

  <rect x="960" y="42" width="190" height="26" rx="13" fill="#27272A" stroke="#52525B" stroke-width="0.8"/>
  <circle cx="975" cy="55" r="8" fill="url(#duraAmber)"/>
  <text x="990" y="60" fill="#FFEDD5" font-family="sans-serif" font-size="11" font-weight="600">Duragrit Plant Ops #4</text>

  <rect x="30" y="90" width="1140" height="640" rx="14" fill="#09090B" stroke="#3F3F46" stroke-width="1.2"/>

  <!-- Left Sidebar -->
  <rect x="40" y="100" width="230" height="620" rx="10" fill="#18181B" stroke="#27272A" stroke-width="1"/>
  
  <rect x="60" y="125" width="38" height="38" rx="9" fill="url(#duraAmber)"/>
  <text x="69" y="152" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold">⚙️</text>
  <text x="108" y="142" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">DURAGRIT</text>
  <text x="108" y="156" fill="#FB923C" font-family="sans-serif" font-size="10" font-weight="bold">QR INDUSTRIAL ERP</text>

  <rect x="52" y="185" width="206" height="38" rx="8" fill="url(#duraAmber)"/>
  <text x="75" y="210" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">📦 QR Inventory Scanner</text>

  <rect x="52" y="233" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="258" fill="#A1A1AA" font-family="sans-serif" font-size="13">🏷️ Batch QR Label Generator</text>

  <rect x="52" y="281" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="306" fill="#A1A1AA" font-family="sans-serif" font-size="13">🏭 Manufacturing Floor Ops</text>

  <rect x="52" y="329" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="354" fill="#A1A1AA" font-family="sans-serif" font-size="13">🚚 Dispatch &amp; Logistics Hub</text>

  <rect x="52" y="377" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="402" fill="#A1A1AA" font-family="sans-serif" font-size="13">🔧 Machine Asset Maintenance</text>

  <rect x="52" y="560" width="206" height="140" rx="10" fill="#27272A" stroke="#3F3F46" stroke-width="1"/>
  <text x="70" y="588" fill="#FB923C" font-family="sans-serif" font-size="12" font-weight="bold">QR SCANS TODAY</text>
  <text x="70" y="625" fill="#FFFFFF" font-family="sans-serif" font-size="32" font-weight="bold">48,250</text>
  <text x="70" y="650" fill="#A1A1AA" font-family="sans-serif" font-size="11">Zero duplicate serial errors</text>
  <text x="70" y="675" fill="#34D399" font-family="sans-serif" font-size="11">● 14 Thermal Printers Online</text>

  <!-- Top Metrics -->
  <g transform="translate(290, 110)">
    <rect x="0" y="0" width="265" height="110" rx="12" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <text x="20" y="32" fill="#A1A1AA" font-family="sans-serif" font-size="11" font-weight="bold">ACTIVE BATCH PRODUCTION</text>
    <text x="20" y="72" fill="#FFFFFF" font-family="sans-serif" font-size="30" font-weight="bold">142 Batches</text>
    <text x="20" y="97" fill="#FB923C" font-family="sans-serif" font-size="11">Industrial Grade Abrasives</text>

    <rect x="285" y="0" width="275" height="110" rx="12" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <text x="305" y="32" fill="#A1A1AA" font-family="sans-serif" font-size="11" font-weight="bold">ASSET UPTIME RELIABILITY</text>
    <text x="305" y="72" fill="#34D399" font-family="sans-serif" font-size="30" font-weight="bold">99.85%</text>
    <text x="305" y="97" fill="#6EE7B7" font-family="sans-serif" font-size="11">IoT Sensor Calibrations Active</text>

    <rect x="580" y="0" width="280" height="110" rx="12" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <text x="600" y="32" fill="#A1A1AA" font-family="sans-serif" font-size="11" font-weight="bold">DISPATCH SCAN VELOCITY</text>
    <text x="600" y="72" fill="#F97316" font-family="sans-serif" font-size="30" font-weight="bold">1.2 sec</text>
    <text x="600" y="97" fill="#A1A1AA" font-family="sans-serif" font-size="11">Per Pallet QR Verification</text>
  </g>

  <!-- Big Central Area -->
  <g transform="translate(290, 240)">
    <rect x="0" y="0" width="540" height="470" rx="14" fill="#18181B" stroke="#27272A" stroke-width="1.2"/>
    <text x="30" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="17" font-weight="bold">Live QR Asset Scanner &amp; Serialization Node</text>
    <text x="30" y="64" fill="#A1A1AA" font-family="sans-serif" font-size="12">Factory Floor Workstation #3 • Automatic Cloud Sync with GST E-Way Bill</text>

    <!-- Simulated QR Code Card -->
    <rect x="30" y="90" width="180" height="180" rx="12" fill="#FFFFFF"/>
    <rect x="45" y="105" width="40" height="40" fill="#000000"/>
    <rect x="51" y="111" width="28" height="28" fill="#FFFFFF"/>
    <rect x="57" y="117" width="16" height="16" fill="#000000"/>

    <rect x="155" y="105" width="40" height="40" fill="#000000"/>
    <rect x="161" y="111" width="28" height="28" fill="#FFFFFF"/>
    <rect x="167" y="117" width="16" height="16" fill="#000000"/>

    <rect x="45" y="215" width="40" height="40" fill="#000000"/>
    <rect x="51" y="221" width="28" height="28" fill="#FFFFFF"/>
    <rect x="57" y="227" width="16" height="16" fill="#000000"/>

    <rect x="100" y="115" width="15" height="15" fill="#000000"/>
    <rect x="125" y="130" width="12" height="12" fill="#000000"/>
    <rect x="95" y="160" width="50" height="12" fill="#000000"/>
    <rect x="155" y="165" width="15" height="30" fill="#000000"/>
    <rect x="105" y="195" width="30" height="20" fill="#000000"/>
    <rect x="145" y="215" width="35" height="15" fill="#000000"/>

    <g transform="translate(230, 90)">
      <rect x="0" y="0" width="280" height="180" rx="10" fill="#27272A" stroke="#3F3F46" stroke-width="1"/>
      <text x="18" y="28" fill="#FB923C" font-family="sans-serif" font-size="11" font-weight="bold">SCANNED QR PAYLOAD</text>
      <text x="18" y="52" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold">QR-DG-2026-X884</text>
      
      <text x="18" y="80" fill="#A1A1AA" font-family="sans-serif" font-size="11">Item: Duragrit Heavy Flap Disc 4.5"</text>
      <text x="18" y="100" fill="#A1A1AA" font-family="sans-serif" font-size="11">Batch: B-9941 (Alumina Zirconia)</text>
      <text x="18" y="120" fill="#A1A1AA" font-family="sans-serif" font-size="11">Manufacture Date: Nov 16, 2026</text>
      <text x="18" y="140" fill="#A1A1AA" font-family="sans-serif" font-size="11">Warehouse Bay: B-12 / Rack 4</text>
      
      <rect x="18" y="152" width="130" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
      <text x="24" y="166" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">✓ VERIFIED AUTHENTIC</text>
    </g>

    <rect x="30" y="290" width="480" height="155" rx="10" fill="#27272A" stroke="#3F3F46" stroke-width="0.8"/>
    <text x="45" y="318" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Realtime Factory Floor Ingestion Feed</text>
    
    <text x="45" y="348" fill="#34D399" font-family="monospace" font-size="11">[14:02:18] QR-DG-884: Scanned at Pack Bay #2 (Pallet 14)</text>
    <text x="45" y="372" fill="#34D399" font-family="monospace" font-size="11">[14:01:55] QR-DG-883: Scanned at Quality Check Station (PASSED)</text>
    <text x="45" y="396" fill="#34D399" font-family="monospace" font-size="11">[14:00:22] QR-DG-882: Scanned at Oven Annealing Bay #4</text>
    <text x="45" y="420" fill="#FB923C" font-family="monospace" font-size="11">[13:58:10] QR-DG-881: Dispatched on Vehicle DL-1Z-9042</text>
  </g>

  <!-- Right Side Panel -->
  <g transform="translate(850, 240)">
    <rect x="0" y="0" width="300" height="470" rx="14" fill="#18181B" stroke="#27272A" stroke-width="1.2"/>
    <text x="25" y="38" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold">Warehouse Bay Utilization</text>
    
    <rect x="25" y="65" width="250" height="55" rx="8" fill="#27272A"/>
    <text x="40" y="90" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Bay 1: Raw Silicon Carbide</text>
    <text x="40" y="108" fill="#FB923C" font-family="sans-serif" font-size="11">Capacity: 92% (1,840 kg)</text>

    <rect x="25" y="130" width="250" height="55" rx="8" fill="#27272A"/>
    <text x="40" y="155" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Bay 2: Resin Bond Discs</text>
    <text x="40" y="173" fill="#34D399" font-family="sans-serif" font-size="11">Capacity: 76% (8,200 units)</text>

    <rect x="25" y="195" width="250" height="55" rx="8" fill="#27272A"/>
    <text x="40" y="220" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Bay 3: Finished Packaging</text>
    <text x="40" y="238" fill="#60A5FA" font-family="sans-serif" font-size="11">Capacity: 64% (Ready Dispatch)</text>

    <text x="25" y="290" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Connected Plant Modules</text>
    <rect x="25" y="310" width="250" height="35" rx="6" fill="#27272A"/>
    <text x="35" y="332" fill="#E4E4E7" font-family="sans-serif" font-size="11">✓ GST E-Way Bill Auto-Generation</text>

    <rect x="25" y="355" width="250" height="35" rx="6" fill="#27272A"/>
    <text x="35" y="377" fill="#E4E4E7" font-family="sans-serif" font-size="11">✓ Zebra &amp; TSC Industrial Printer API</text>

    <rect x="25" y="400" width="250" height="48" rx="8" fill="url(#duraAmber)"/>
    <text x="45" y="428" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Trigger Thermal Batch Print</text>
  </g>
</svg>'''

# 4. Insurance Tracker Suite SVG
insurance_tracker_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="100%" height="100%">
  <defs>
    <linearGradient id="insBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B192C"/>
      <stop offset="50%" stop-color="#1E3E62"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="insCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#0EA5E9"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="760" fill="url(#insBg)"/>

  <rect x="30" y="30" width="1140" height="50" rx="14" fill="#0A1828" stroke="#1E3E62" stroke-width="1.2"/>
  <circle cx="60" cy="55" r="7" fill="#EF4444"/>
  <circle cx="82" cy="55" r="7" fill="#F59E0B"/>
  <circle cx="104" cy="55" r="7" fill="#10B981"/>
  
  <rect x="150" y="42" width="620" height="26" rx="7" fill="#162D4A" stroke="#2B5885" stroke-width="0.8"/>
  <text x="170" y="60" fill="#BAE6FD" font-family="sans-serif" font-size="12">https://portal.insurancetracker.io/claims/live-underwriting-hub</text>
  <rect x="740" y="47" width="16" height="16" rx="4" fill="#38BDF8" opacity="0.3"/>
  <circle cx="748" cy="55" r="3.5" fill="#38BDF8"/>

  <rect x="970" y="42" width="180" height="26" rx="13" fill="#162D4A" stroke="#2B5885" stroke-width="0.8"/>
  <circle cx="985" cy="55" r="8" fill="url(#insCyan)"/>
  <text x="1000" y="60" fill="#F0F9FF" font-family="sans-serif" font-size="11" font-weight="600">Underwriter: Dr. Sen</text>

  <rect x="30" y="90" width="1140" height="640" rx="14" fill="#071424" stroke="#1E3E62" stroke-width="1.2"/>

  <!-- Left Sidebar -->
  <rect x="40" y="100" width="230" height="620" rx="10" fill="#0B1B30" stroke="#1E3E62" stroke-width="1"/>
  
  <rect x="60" y="125" width="38" height="38" rx="9" fill="url(#insCyan)"/>
  <text x="69" y="152" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold">🛡️</text>
  <text x="108" y="142" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold">InsureTracker</text>
  <text x="108" y="156" fill="#38BDF8" font-family="sans-serif" font-size="10" font-weight="bold">ENTERPRISE CLAIMS</text>

  <rect x="52" y="185" width="206" height="38" rx="8" fill="url(#insCyan)"/>
  <text x="75" y="210" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">📋 Active Policy Registry</text>

  <rect x="52" y="233" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="258" fill="#93C5FD" font-family="sans-serif" font-size="13">⚡ Instant Claims Pipeline</text>

  <rect x="52" y="281" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="306" fill="#93C5FD" font-family="sans-serif" font-size="13">🤖 Underwriting Risk AI</text>

  <rect x="52" y="329" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="354" fill="#93C5FD" font-family="sans-serif" font-size="13">🔄 Renewal &amp; WhatsApp Alerts</text>

  <rect x="52" y="377" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="402" fill="#93C5FD" font-family="sans-serif" font-size="13">📊 IRDAI Compliance Reports</text>

  <rect x="52" y="560" width="206" height="140" rx="10" fill="#132B47" stroke="#1E3E62" stroke-width="1"/>
  <text x="70" y="588" fill="#38BDF8" font-family="sans-serif" font-size="12" font-weight="bold">SETTLEMENT SPEED</text>
  <text x="70" y="625" fill="#FFFFFF" font-family="sans-serif" font-size="32" font-weight="bold">2.4 <tspan font-size="16" fill="#7DD3FC">HOURS</tspan></text>
  <text x="70" y="650" fill="#BAE6FD" font-family="sans-serif" font-size="11">Down from 7 business days</text>
  <text x="70" y="675" fill="#34D399" font-family="sans-serif" font-size="11">● 99.4% Automated Settlement</text>

  <!-- Top Metrics -->
  <g transform="translate(290, 110)">
    <rect x="0" y="0" width="265" height="110" rx="12" fill="#0B1B30" stroke="#1E3E62" stroke-width="1"/>
    <text x="20" y="32" fill="#93C5FD" font-family="sans-serif" font-size="11" font-weight="bold">ACTIVE POLICIES MANAGED</text>
    <text x="20" y="72" fill="#FFFFFF" font-family="sans-serif" font-size="30" font-weight="bold">34,200</text>
    <text x="20" y="97" fill="#38BDF8" font-family="sans-serif" font-size="11">Health, Auto &amp; Commercial</text>

    <rect x="285" y="0" width="275" height="110" rx="12" fill="#0B1B30" stroke="#1E3E62" stroke-width="1"/>
    <text x="305" y="32" fill="#93C5FD" font-family="sans-serif" font-size="11" font-weight="bold">CLAIMS SETTLED (YTD)</text>
    <text x="305" y="72" fill="#34D399" font-family="sans-serif" font-size="30" font-weight="bold">₹8.42 Cr</text>
    <text x="305" y="97" fill="#6EE7B7" font-family="sans-serif" font-size="11">Direct Bank Account NEFT</text>

    <rect x="580" y="0" width="280" height="110" rx="12" fill="#0B1B30" stroke="#1E3E62" stroke-width="1"/>
    <text x="600" y="32" fill="#93C5FD" font-family="sans-serif" font-size="11" font-weight="bold">FRAUD DETECTION SHIELD</text>
    <text x="600" y="72" fill="#FBBF24" font-family="sans-serif" font-size="30" font-weight="bold">99.7%</text>
    <text x="600" y="97" fill="#BAE6FD" font-family="sans-serif" font-size="11">AI Metadata &amp; OCR Verification</text>
  </g>

  <!-- Big Central Area -->
  <g transform="translate(290, 240)">
    <rect x="0" y="0" width="860" height="470" rx="14" fill="#0B1B30" stroke="#1E3E62" stroke-width="1.2"/>
    <text x="30" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="17" font-weight="bold">Live Fast-Track Claims Processing Queue</text>
    <text x="30" y="64" fill="#93C5FD" font-family="sans-serif" font-size="12">Instant Hospital Cashless Approval • OCR Medical Bill Parsing • Policyholder Self-Service Status</text>

    <rect x="25" y="85" width="810" height="38" rx="8" fill="#132B47"/>
    <text x="45" y="109" fill="#38BDF8" font-family="sans-serif" font-size="11" font-weight="bold">CLAIM ID</text>
    <text x="140" y="109" fill="#38BDF8" font-family="sans-serif" font-size="11" font-weight="bold">POLICYHOLDER</text>
    <text x="300" y="109" fill="#38BDF8" font-family="sans-serif" font-size="11" font-weight="bold">CATEGORY</text>
    <text x="430" y="109" fill="#38BDF8" font-family="sans-serif" font-size="11" font-weight="bold">CLAIM AMOUNT</text>
    <text x="570" y="109" fill="#38BDF8" font-family="sans-serif" font-size="11" font-weight="bold">AI RISK SCORE</text>
    <text x="710" y="109" fill="#38BDF8" font-family="sans-serif" font-size="11" font-weight="bold">STATUS</text>

    <!-- Row 1 -->
    <rect x="25" y="130" width="810" height="48" rx="6" fill="#071424"/>
    <text x="45" y="160" fill="#E2E8F0" font-family="monospace" font-size="12">#CLM-94021</text>
    <text x="140" y="160" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Rajeshwar Varma</text>
    <text x="300" y="160" fill="#93C5FD" font-family="sans-serif" font-size="12">Health Cashless (Max Hosp)</text>
    <text x="430" y="160" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">₹1,85,000</text>
    <rect x="570" y="145" width="95" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
    <text x="580" y="160" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">Low Risk (98%)</text>
    <rect x="710" y="143" width="90" height="24" rx="6" fill="#0284C7"/>
    <text x="720" y="159" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Auto-Approved</text>

    <!-- Row 2 -->
    <rect x="25" y="185" width="810" height="48" rx="6" fill="#0B1A2C"/>
    <text x="45" y="215" fill="#E2E8F0" font-family="monospace" font-size="12">#CLM-94022</text>
    <text x="140" y="215" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Shalini Iyer</text>
    <text x="300" y="215" fill="#93C5FD" font-family="sans-serif" font-size="12">Motor Comprehensive (Hyundai)</text>
    <text x="430" y="215" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">₹42,500</text>
    <rect x="570" y="200" width="95" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
    <text x="580" y="215" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">Low Risk (94%)</text>
    <rect x="710" y="198" width="90" height="24" rx="6" fill="#0284C7"/>
    <text x="720" y="214" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Auto-Approved</text>

    <!-- Row 3 -->
    <rect x="25" y="240" width="810" height="48" rx="6" fill="#071424"/>
    <text x="45" y="270" fill="#E2E8F0" font-family="monospace" font-size="12">#CLM-94023</text>
    <text x="140" y="270" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">Gaurav Kapoor</text>
    <text x="300" y="270" fill="#93C5FD" font-family="sans-serif" font-size="12">Commercial Cargo Transit</text>
    <text x="430" y="270" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">₹6,20,000</text>
    <rect x="570" y="255" width="95" height="22" rx="11" fill="#F59E0B" fill-opacity="0.2"/>
    <text x="580" y="270" fill="#FBBF24" font-family="sans-serif" font-size="10" font-weight="bold">Surveyor Review</text>
    <rect x="710" y="253" width="90" height="24" rx="6" fill="#D97706"/>
    <text x="720" y="269" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Under Review</text>

    <!-- Bottom summary banner in table -->
    <rect x="25" y="325" width="810" height="120" rx="10" fill="#132B47" stroke="#1E3E62" stroke-width="1"/>
    <text x="45" y="358" fill="#38BDF8" font-family="sans-serif" font-size="13" font-weight="bold">IRDAI DIGITAL COMPLIANCE &amp; REINSURANCE AUDIT SUITE</text>
    <text x="45" y="384" fill="#BAE6FD" font-family="sans-serif" font-size="12">Connected with WhatsApp for Business API for instantaneous claim tracking, digital policy issuance &amp; payment gateway.</text>
    
    <rect x="45" y="405" width="160" height="26" rx="6" fill="#0B1B30"/>
    <text x="55" y="422" fill="#34D399" font-family="sans-serif" font-size="11">✓ Aadhaar eKYC Enabled</text>

    <rect x="220" y="405" width="160" height="26" rx="6" fill="#0B1B30"/>
    <text x="230" y="422" fill="#38BDF8" font-family="sans-serif" font-size="11">✓ DigiLocker Integration</text>

    <rect x="395" y="405" width="180" height="26" rx="6" fill="#0B1B30"/>
    <text x="405" y="422" fill="#FBBF24" font-family="sans-serif" font-size="11">✓ UPI AutoPay 24/7 Renewals</text>
  </g>
</svg>'''

# 5. Social Media Video App SVG
social_video_app_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="100%" height="100%">
  <defs>
    <linearGradient id="vidBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#180026"/>
      <stop offset="50%" stop-color="#3B0764"/>
      <stop offset="100%" stop-color="#020005"/>
    </linearGradient>
    <linearGradient id="neonPink" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EC4899"/>
      <stop offset="50%" stop-color="#D946EF"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="feedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4C1D95"/>
      <stop offset="50%" stop-color="#1E1B4B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="760" fill="url(#vidBg)"/>

  <rect x="30" y="30" width="1140" height="50" rx="14" fill="#150020" stroke="#581C87" stroke-width="1.2"/>
  <circle cx="60" cy="55" r="7" fill="#EF4444"/>
  <circle cx="82" cy="55" r="7" fill="#F59E0B"/>
  <circle cx="104" cy="55" r="7" fill="#10B981"/>
  
  <rect x="150" y="42" width="620" height="26" rx="7" fill="#2E1065" stroke="#6B21A8" stroke-width="0.8"/>
  <text x="170" y="60" fill="#E9D5FF" font-family="sans-serif" font-size="12">https://pulseplay.tv/creator-studio/analytics</text>
  <rect x="740" y="47" width="16" height="16" rx="4" fill="#D946EF" opacity="0.3"/>
  <circle cx="748" cy="55" r="3.5" fill="#D946EF"/>

  <rect x="970" y="42" width="180" height="26" rx="13" fill="#2E1065" stroke="#6B21A8" stroke-width="0.8"/>
  <circle cx="985" cy="55" r="8" fill="url(#neonPink)"/>
  <text x="1000" y="60" fill="#FAF5FF" font-family="sans-serif" font-size="11" font-weight="600">@neha_dancer (Verified)</text>

  <rect x="30" y="90" width="1140" height="640" rx="14" fill="#0C0014" stroke="#581C87" stroke-width="1.2"/>

  <!-- Left Sidebar -->
  <rect x="40" y="100" width="220" height="620" rx="10" fill="#1F0430" stroke="#581C87" stroke-width="1"/>
  
  <rect x="60" y="125" width="38" height="38" rx="9" fill="url(#neonPink)"/>
  <text x="69" y="152" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold">▶️</text>
  <text x="108" y="142" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">PulsePlay</text>
  <text x="108" y="156" fill="#F472B6" font-family="sans-serif" font-size="10" font-weight="bold">VIDEO ECOSYSTEM</text>

  <rect x="52" y="185" width="196" height="38" rx="8" fill="url(#neonPink)"/>
  <text x="75" y="210" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">🔥 Trending Short Feed</text>

  <rect x="52" y="233" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="258" fill="#D8B4FE" font-family="sans-serif" font-size="13">📡 Live Video Streaming</text>

  <rect x="52" y="281" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="306" fill="#D8B4FE" font-family="sans-serif" font-size="13">💎 Creator Monetization</text>

  <rect x="52" y="329" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="354" fill="#D8B4FE" font-family="sans-serif" font-size="13">🎶 Music &amp; Audio Library</text>

  <rect x="52" y="377" width="196" height="38" rx="8" fill="transparent"/>
  <text x="75" y="402" fill="#D8B4FE" font-family="sans-serif" font-size="13">⚙️ Video Transcoding CDN</text>

  <rect x="52" y="560" width="196" height="140" rx="10" fill="#3B0764" stroke="#7E22CE" stroke-width="1"/>
  <text x="70" y="588" fill="#F472B6" font-family="sans-serif" font-size="12" font-weight="bold">STREAMING LATENCY</text>
  <text x="70" y="625" fill="#FFFFFF" font-family="sans-serif" font-size="32" font-weight="bold">120 <tspan font-size="16" fill="#E9D5FF">MS</tspan></text>
  <text x="70" y="650" fill="#D8B4FE" font-family="sans-serif" font-size="11">Global edge POP distribution</text>
  <text x="70" y="675" fill="#34D399" font-family="sans-serif" font-size="11">● 4K Transcode Active</text>

  <!-- Mobile Mockup -->
  <g transform="translate(280, 110)">
    <rect x="0" y="0" width="280" height="600" rx="36" fill="#000000" stroke="#7E22CE" stroke-width="4"/>
    <rect x="90" y="10" width="100" height="22" rx="11" fill="#180026"/>
    <circle cx="170" cy="21" r="4" fill="#3B0764"/>

    <rect x="10" y="40" width="260" height="545" rx="26" fill="url(#feedGrad)"/>
    
    <circle cx="140" cy="220" r="45" fill="#F472B6" opacity="0.4"/>
    <path d="M140 160 Q 155 240, 140 320" stroke="#EC4899" stroke-width="4" fill="none"/>
    <path d="M110 210 Q 140 230, 170 200" stroke="#A855F7" stroke-width="4" fill="none"/>
    <text x="70" y="270" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">#CyberFunk Dance Challenge</text>
    
    <circle cx="235" cy="300" r="16" fill="#1E1B4B" stroke="#A855F7" stroke-width="1"/>
    <text x="228" y="306" fill="#EC4899" font-size="14">❤️</text>
    <text x="224" y="326" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold">428K</text>

    <circle cx="235" cy="350" r="16" fill="#1E1B4B" stroke="#A855F7" stroke-width="1"/>
    <text x="228" y="356" fill="#60A5FA" font-size="14">💬</text>
    <text x="224" y="376" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold">18.4K</text>

    <circle cx="235" cy="400" r="16" fill="#1E1B4B" stroke="#A855F7" stroke-width="1"/>
    <text x="228" y="406" fill="#FBBF24" font-size="14">⚡</text>
    <text x="226" y="426" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold">Tip</text>

    <rect x="20" y="480" width="240" height="90" rx="14" fill="#000000" fill-opacity="0.6"/>
    <text x="32" y="505" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">@neha_dancer</text>
    <text x="32" y="525" fill="#E9D5FF" font-family="sans-serif" font-size="10">Original Sound - Beats by Tokyo #dance</text>
    <rect x="32" y="538" width="80" height="20" rx="10" fill="url(#neonPink)"/>
    <text x="50" y="552" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">Follow</text>
  </g>

  <!-- Creator Studio & Stream Telemetry -->
  <g transform="translate(580, 110)">
    <rect x="0" y="0" width="180" height="100" rx="12" fill="#1F0430" stroke="#581C87" stroke-width="1"/>
    <text x="15" y="28" fill="#D8B4FE" font-family="sans-serif" font-size="10" font-weight="bold">DAILY ACTIVE VIEWERS</text>
    <text x="15" y="65" fill="#FFFFFF" font-family="sans-serif" font-size="24" font-weight="bold">1.2M</text>
    <text x="15" y="85" fill="#34D399" font-family="sans-serif" font-size="10">+28% this week</text>

    <rect x="195" y="0" width="180" height="100" rx="12" fill="#1F0430" stroke="#581C87" stroke-width="1"/>
    <text x="210" y="28" fill="#D8B4FE" font-family="sans-serif" font-size="10" font-weight="bold">CREATOR PAYOUTS</text>
    <text x="210" y="65" fill="#F472B6" font-family="sans-serif" font-size="24" font-weight="bold">$485,000</text>
    <text x="210" y="85" fill="#E9D5FF" font-family="sans-serif" font-size="10">Live Coins &amp; Ads</text>

    <rect x="390" y="0" width="180" height="100" rx="12" fill="#1F0430" stroke="#581C87" stroke-width="1"/>
    <text x="405" y="28" fill="#D8B4FE" font-family="sans-serif" font-size="10" font-weight="bold">AI MODERATION</text>
    <text x="405" y="65" fill="#34D399" font-family="sans-serif" font-size="24" font-weight="bold">99.98%</text>
    <text x="405" y="85" fill="#A7F3D0" font-family="sans-serif" font-size="10">Zero Hate Speech Pass</text>

    <!-- Analytics Chart -->
    <rect x="0" y="120" width="570" height="480" rx="14" fill="#1F0430" stroke="#581C87" stroke-width="1.2"/>
    <text x="25" y="152" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">Global Video Stream Ingestion &amp; CDN Edge Throughput</text>
    <text x="25" y="174" fill="#D8B4FE" font-family="sans-serif" font-size="11">Real-time WebSocket Concurrent Connections &amp; Bitrate Adaptation</text>

    <path d="M 25 350 Q 80 260, 140 290 T 260 210 T 380 250 T 500 180 T 560 160" fill="none" stroke="url(#neonPink)" stroke-width="4"/>
    <path d="M 25 350 Q 80 260, 140 290 T 260 210 T 380 250 T 500 180 T 560 160 L 560 400 L 25 400 Z" fill="#D946EF" fill-opacity="0.15"/>

    <circle cx="260" cy="210" r="6" fill="#F472B6" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="500" cy="180" r="6" fill="#F472B6" stroke="#FFFFFF" stroke-width="2"/>

    <rect x="25" y="420" width="520" height="150" rx="10" fill="#2E1065" stroke="#7E22CE" stroke-width="0.8"/>
    <text x="45" y="448" fill="#F472B6" font-family="sans-serif" font-size="13" font-weight="bold">NEXT-GEN VIDEO STACK CAPABILITIES</text>
    <text x="45" y="475" fill="#E9D5FF" font-family="sans-serif" font-size="11">● Multi-bitrate HLS / LL-HLS Adaptive Bitrate Streaming (1080p, 720p, 480p, 360p)</text>
    <text x="45" y="500" fill="#E9D5FF" font-family="sans-serif" font-size="11">● Redis Vector Recommendation Engine: 45ms Personalized Video Feed Tailoring</text>
    <text x="45" y="525" fill="#E9D5FF" font-family="sans-serif" font-size="11">● WebRTC Sub-Second Live Streaming with Virtual Gifts and In-App Stripe Payments</text>
    <text x="45" y="550" fill="#34D399" font-family="sans-serif" font-size="11">● Native iOS &amp; Android Apps with GPU Shaders &amp; Realtime Beauty AR Filters</text>
  </g>
</svg>'''

# 6. Game Tracker Project SVG (Tracking 50+ Games)
game_tracker_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="100%" height="100%">
  <defs>
    <linearGradient id="gameBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#022C22"/>
      <stop offset="50%" stop-color="#064E3B"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="gameNeon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="760" fill="url(#gameBg)"/>

  <rect x="30" y="30" width="1140" height="50" rx="14" fill="#04221A" stroke="#047857" stroke-width="1.2"/>
  <circle cx="60" cy="55" r="7" fill="#EF4444"/>
  <circle cx="82" cy="55" r="7" fill="#F59E0B"/>
  <circle cx="104" cy="55" r="7" fill="#10B981"/>
  
  <rect x="150" y="42" width="620" height="26" rx="7" fill="#064E3B" stroke="#059669" stroke-width="0.8"/>
  <text x="170" y="60" fill="#A7F3D0" font-family="sans-serif" font-size="12">https://gametracker.network/hub/50-games-portfolio/telemetry</text>
  <rect x="740" y="47" width="16" height="16" rx="4" fill="#10B981" opacity="0.3"/>
  <circle cx="748" cy="55" r="3.5" fill="#10B981"/>

  <rect x="960" y="42" width="190" height="26" rx="13" fill="#064E3B" stroke="#059669" stroke-width="0.8"/>
  <circle cx="975" cy="55" r="8" fill="url(#gameNeon)"/>
  <text x="990" y="60" fill="#ECFDF5" font-family="sans-serif" font-size="11" font-weight="600">Game Studios Director</text>

  <rect x="30" y="90" width="1140" height="640" rx="14" fill="#011812" stroke="#047857" stroke-width="1.2"/>

  <!-- Left Sidebar -->
  <rect x="40" y="100" width="230" height="620" rx="10" fill="#032D23" stroke="#047857" stroke-width="1"/>
  
  <rect x="60" y="125" width="38" height="38" rx="9" fill="url(#gameNeon)"/>
  <text x="69" y="152" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold">🎮</text>
  <text x="108" y="142" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold">GameTracker</text>
  <text x="108" y="156" fill="#34D399" font-family="sans-serif" font-size="10" font-weight="bold">50+ GAMES TELEMETRY</text>

  <rect x="52" y="185" width="206" height="38" rx="8" fill="url(#gameNeon)"/>
  <text x="75" y="210" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">🕹️ 50+ Games Catalog</text>

  <rect x="52" y="233" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="258" fill="#A7F3D0" font-family="sans-serif" font-size="13">👥 Live Concurrent Players</text>

  <rect x="52" y="281" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="306" fill="#A7F3D0" font-family="sans-serif" font-size="13">🏆 Global Match Leaderboards</text>

  <rect x="52" y="329" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="354" fill="#A7F3D0" font-family="sans-serif" font-size="13">💰 IAP &amp; Virtual Economy</text>

  <rect x="52" y="377" width="206" height="38" rx="8" fill="transparent"/>
  <text x="75" y="402" fill="#A7F3D0" font-family="sans-serif" font-size="13">🛡️ Anti-Cheat &amp; Bans Engine</text>

  <rect x="52" y="560" width="206" height="140" rx="10" fill="#064E3B" stroke="#059669" stroke-width="1"/>
  <text x="70" y="588" fill="#FDE047" font-family="sans-serif" font-size="12" font-weight="bold">TOTAL GAMES ACTIVE</text>
  <text x="70" y="625" fill="#FFFFFF" font-family="sans-serif" font-size="34" font-weight="bold">54 <tspan font-size="16" fill="#A7F3D0">TITLES</tspan></text>
  <text x="70" y="650" fill="#D1FAE5" font-family="sans-serif" font-size="11">Created &amp; Managed 24/7</text>
  <text x="70" y="675" fill="#34D399" font-family="sans-serif" font-size="11">● 86,400 Players Online Now</text>

  <!-- Top Metrics -->
  <g transform="translate(290, 110)">
    <rect x="0" y="0" width="265" height="110" rx="12" fill="#032D23" stroke="#047857" stroke-width="1"/>
    <text x="20" y="32" fill="#A7F3D0" font-family="sans-serif" font-size="11" font-weight="bold">CONCURRENT ACTIVE GAMERS</text>
    <text x="20" y="72" fill="#34D399" font-family="sans-serif" font-size="30" font-weight="bold">86,420</text>
    <text x="20" y="97" fill="#6EE7B7" font-family="sans-serif" font-size="11">Across Mobile, Steam &amp; Web</text>

    <rect x="285" y="0" width="275" height="110" rx="12" fill="#032D23" stroke="#047857" stroke-width="1"/>
    <text x="305" y="32" fill="#A7F3D0" font-family="sans-serif" font-size="11" font-weight="bold">TOTAL IN-GAME COMMERCE</text>
    <text x="305" y="72" fill="#FBBF24" font-family="sans-serif" font-size="30" font-weight="bold">$3.25M</text>
    <text x="305" y="97" fill="#FEF08A" font-family="sans-serif" font-size="11">Skins, Season Passes, Upgrades</text>

    <rect x="580" y="0" width="280" height="110" rx="12" fill="#032D23" stroke="#047857" stroke-width="1"/>
    <text x="600" y="32" fill="#A7F3D0" font-family="sans-serif" font-size="11" font-weight="bold">DAY-30 RETENTION RATE</text>
    <text x="600" y="72" fill="#38BDF8" font-family="sans-serif" font-size="30" font-weight="bold">48.6%</text>
    <text x="600" y="97" fill="#BAE6FD" font-family="sans-serif" font-size="11">Industry Benchmark: 22%</text>
  </g>

  <!-- Big Central Area: 50+ Games Grid -->
  <g transform="translate(290, 240)">
    <rect x="0" y="0" width="860" height="470" rx="14" fill="#032D23" stroke="#047857" stroke-width="1.2"/>
    <text x="30" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="17" font-weight="bold">50+ Multi-Genre Game Portfolio Operations &amp; Real-time Match Telemetry</text>
    <text x="30" y="64" fill="#A7F3D0" font-family="sans-serif" font-size="12">Hypercasual, Action RPG, Multiplayer Arena, Strategy, Puzzle &amp; Simulator Games</text>

    <!-- Mini Game Tiles Grid -->
    <g transform="translate(30, 85)">
      <!-- Game 1 -->
      <rect x="0" y="0" width="185" height="150" rx="10" fill="#043C2F" stroke="#059669" stroke-width="1"/>
      <rect x="10" y="10" width="165" height="70" rx="6" fill="#064E3B"/>
      <text x="25" y="48" fill="#FBBF24" font-size="22">⚔️</text>
      <text x="60" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">CyberStrike 3D</text>
      <text x="60" y="58" fill="#34D399" font-family="sans-serif" font-size="10">FPS Arena</text>
      <text x="15" y="105" fill="#E2E8F0" font-family="sans-serif" font-size="11" font-weight="bold">Players: 28,400 live</text>
      <text x="15" y="125" fill="#FBBF24" font-family="sans-serif" font-size="10">Rating: 4.8 ★ (1.2M dl)</text>

      <!-- Game 2 -->
      <rect x="205" y="0" width="185" height="150" rx="10" fill="#043C2F" stroke="#059669" stroke-width="1"/>
      <rect x="215" y="10" width="165" height="70" rx="6" fill="#064E3B"/>
      <text x="230" y="48" fill="#38BDF8" font-size="22">🏎️</text>
      <text x="265" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">NitroDrift Pro</text>
      <text x="265" y="58" fill="#38BDF8" font-family="sans-serif" font-size="10">Racing Simulator</text>
      <text x="220" y="105" fill="#E2E8F0" font-family="sans-serif" font-size="11" font-weight="bold">Players: 19,250 live</text>
      <text x="220" y="125" fill="#FBBF24" font-family="sans-serif" font-size="10">Rating: 4.7 ★ (850k dl)</text>

      <!-- Game 3 -->
      <rect x="410" y="0" width="185" height="150" rx="10" fill="#043C2F" stroke="#059669" stroke-width="1"/>
      <rect x="420" y="10" width="165" height="70" rx="6" fill="#064E3B"/>
      <text x="435" y="48" fill="#F472B6" font-size="22">🏰</text>
      <text x="470" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">Kingdom Clash</text>
      <text x="470" y="58" fill="#F472B6" font-family="sans-serif" font-size="10">RTS Strategy</text>
      <text x="425" y="105" fill="#E2E8F0" font-family="sans-serif" font-size="11" font-weight="bold">Players: 22,800 live</text>
      <text x="425" y="125" fill="#FBBF24" font-family="sans-serif" font-size="10">Rating: 4.9 ★ (2.1M dl)</text>

      <!-- Game 4 -->
      <rect x="615" y="0" width="185" height="150" rx="10" fill="#043C2F" stroke="#059669" stroke-width="1"/>
      <rect x="625" y="10" width="165" height="70" rx="6" fill="#064E3B"/>
      <text x="640" y="48" fill="#34D399" font-size="22">🧩</text>
      <text x="675" y="42" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">+47 More Games</text>
      <text x="675" y="58" fill="#34D399" font-family="sans-serif" font-size="10">Hypercasual / Web</text>
      <text x="630" y="105" fill="#E2E8F0" font-family="sans-serif" font-size="11" font-weight="bold">Total Pool: 54 Titles</text>
      <text x="630" y="125" fill="#FBBF24" font-family="sans-serif" font-size="10">Cross-Platform Sync</text>
    </g>

    <!-- Telemetry Real-time Stream -->
    <rect x="30" y="260" width="800" height="180" rx="10" fill="#021C16" stroke="#047857" stroke-width="1"/>
    <text x="48" y="292" fill="#34D399" font-family="sans-serif" font-size="13" font-weight="bold">REALTIME GAME TELEMETRY &amp; MULTI-REGION MATCHMAKING ENGINE</text>
    <text x="48" y="318" fill="#A7F3D0" font-family="sans-serif" font-size="11">● WebSocket Tick Rate: 60Hz dedicated authoritative server infrastructure</text>
    <text x="48" y="342" fill="#A7F3D0" font-family="sans-serif" font-size="11">● Automated Anti-Cheat Detection: 0.02% false positive rate across 50M game matches</text>
    <text x="48" y="366" fill="#A7F3D0" font-family="sans-serif" font-size="11">● Dynamic Economy Balancer: Live adjustment of in-game rewards, seasonal battle passes &amp; drops</text>
    <text x="48" y="390" fill="#A7F3D0" font-family="sans-serif" font-size="11">● Unity, Unreal Engine 5 &amp; HTML5 WebGL seamless SDK integrations</text>

    <rect x="48" y="405" width="220" height="25" rx="5" fill="#064E3B"/>
    <text x="58" y="422" fill="#FDE047" font-family="sans-serif" font-size="11" font-weight="bold">⚡ 50+ Custom Games Deployed</text>
  </g>
</svg>'''

with open("public/images/projects/study-tracker-lockon.svg", "w", encoding="utf-8") as f:
    f.write(study_tracker_svg.strip())

with open("public/images/projects/nsfs-erp.svg", "w", encoding="utf-8") as f:
    f.write(nsfs_erp_svg.strip())

with open("public/images/projects/duragrit-qr-erp.svg", "w", encoding="utf-8") as f:
    f.write(duragrit_qr_erp_svg.strip())

with open("public/images/projects/insurance-tracker.svg", "w", encoding="utf-8") as f:
    f.write(insurance_tracker_svg.strip())

with open("public/images/projects/social-video-app.svg", "w", encoding="utf-8") as f:
    f.write(social_video_app_svg.strip())

with open("public/images/projects/game-tracker.svg", "w", encoding="utf-8") as f:
    f.write(game_tracker_svg.strip())

print("Successfully created all 6 project UI screenshot SVGs in public/images/projects/!")

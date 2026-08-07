(function(){
  const iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'><circle cx='160' cy='160' r='160' fill='%23050C18'/><circle cx='160' cy='160' r='156' fill='none' stroke='%231E7FCC' stroke-width='4'/><circle cx='160' cy='160' r='131' fill='none' stroke='%230C2848' stroke-width='0.5'/><circle cx='160' cy='160' r='156' fill='none' stroke='%23163860' stroke-width='1.5' stroke-dasharray='1 7' stroke-linecap='round'/><circle cx='160' cy='160' r='106' fill='%2307101E' stroke='%230F2C50' stroke-width='1.2'/><circle cx='160' cy='100' r='32' fill='%23060E1C' stroke='%231A5F9E' stroke-width='1.4'/><line x1='160' y1='80' x2='160' y2='120' stroke='%231E7FCC' stroke-width='3'/><line x1='140' y1='100' x2='180' y2='100' stroke='%231E7FCC' stroke-width='3'/><circle cx='150' cy='90' r='3.5' fill='%233FA0E8'/><circle cx='170' cy='90' r='3.5' fill='%233FA0E8'/><circle cx='150' cy='110' r='3.5' fill='%233FA0E8'/><circle cx='170' cy='110' r='3.5' fill='%233FA0E8'/><circle cx='160' cy='100' r='8' fill='none' stroke='%235BB8FF' stroke-width='2'/><text x='160' y='155' text-anchor='middle' font-family='Segoe UI,Arial,sans-serif' font-weight='800' font-size='19' fill='%23D8EEFF' letter-spacing='3'>AMIRHOSIN</text><line x1='90' y1='163' x2='230' y2='163' stroke='%230D2540' stroke-width='0.7'/><circle cx='90' cy='163' r='2' fill='%231E7FCC'/><circle cx='230' cy='163' r='2' fill='%231E7FCC'/><text x='160' y='179' text-anchor='middle' font-family='Segoe UI,Arial,sans-serif' font-weight='300' font-size='9' fill='%233A80C0' letter-spacing='6'>SEKHAVATFAR</text><text x='160' y='196' text-anchor='middle' font-family='Segoe UI,Arial,sans-serif' font-weight='500' font-size='7.5' fill='%231B5A90' letter-spacing='2.5'>AUTOMATION ENGINEER</text><rect x='117' y='208' width='26' height='13' rx='4' fill='%231A5F9E'/><text x='130' y='218.5' text-anchor='middle' font-family='Segoe UI,Arial,sans-serif' font-size='7' font-weight='700' fill='%2304090F'>PLC</text><rect x='147' y='208' width='34' height='13' rx='4' fill='%23134880'/><text x='164' y='218.5' text-anchor='middle' font-family='Segoe UI,Arial,sans-serif' font-size='7' font-weight='700' fill='%2304090F'>ESP32</text><rect x='185' y='208' width='26' height='13' rx='4' fill='%230D3262'/><text x='198' y='218.5' text-anchor='middle' font-family='Segoe UI,Arial,sans-serif' font-size='7' font-weight='700' fill='%2304090F'>IoT</text></svg>`;
  const iconUrl = 'data:image/svg+xml,' + iconSvg;
  const manifest = {
    name: 'Amir Hosin Sekhavatfar',
    short_name: 'AHS.dev',
    description: 'Electrical Engineering | PLC | IoT | Automation',
    start_url: './',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0A0E14',
    theme_color: '#FF7A1A',
    categories: ['portfolio','technology'],
    icons: [
      { src: iconUrl, sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: iconUrl, sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
    ],
    shortcuts: [
      { name: 'Projects', short_name: 'Projects', url: './#projects', description: 'View engineering projects' },
      { name: 'Contact', short_name: 'Contact', url: './#contact', description: 'Get in touch' }
    ]
  };
  const blob = new Blob([JSON.stringify(manifest)], {type:'application/json'});
  document.getElementById('pwa-manifest').href = URL.createObjectURL(blob);
})();

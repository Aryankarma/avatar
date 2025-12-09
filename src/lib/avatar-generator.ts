// Avatar generator utility
// Generates deterministic SVG avatars based on email

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generateColor(seed: number, saturation: number = 70, lightness: number = 50): string {
  const hue = seed % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateInitials(email: string): string {
  const parts = email.split('@')[0].split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
}

export function generateAvatarSVG(email: string, size: number = 200): string {
  const hash = hashString(email);
  const bgColor = generateColor(hash, 70, 45);
  const textColor = generateColor(hash + 100, 80, 90);
  const initials = generateInitials(email);
  
  // Use hash to determine pattern style
  const patternType = hash % 3;
  
  let patternSVG = '';
  
  if (patternType === 0) {
    // Circles pattern
    const circles = [];
    for (let i = 0; i < 3; i++) {
      const x = (hash + i * 100) % size;
      const y = (hash + i * 150) % size;
      const radius = 20 + (hash + i * 50) % 30;
      circles.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="${textColor}" opacity="0.3"/>`);
    }
    patternSVG = circles.join('');
  } else if (patternType === 1) {
    // Squares pattern
    const squares = [];
    for (let i = 0; i < 4; i++) {
      const x = (hash + i * 80) % (size - 40);
      const y = (hash + i * 120) % (size - 40);
      const sizeSquare = 15 + (hash + i * 30) % 25;
      squares.push(`<rect x="${x}" y="${y}" width="${sizeSquare}" height="${sizeSquare}" fill="${textColor}" opacity="0.2" transform="rotate(${(hash + i * 45) % 360} ${x + sizeSquare/2} ${y + sizeSquare/2})"/>`);
    }
    patternSVG = squares.join('');
  } else {
    // Lines pattern
    const lines = [];
    for (let i = 0; i < 3; i++) {
      const x1 = (hash + i * 60) % size;
      const y1 = (hash + i * 80) % size;
      const x2 = (hash + i * 90) % size;
      const y2 = (hash + i * 110) % size;
      lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${textColor}" stroke-width="3" opacity="0.3"/>`);
    }
    patternSVG = lines.join('');
  }
  
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      ${patternSVG}
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.4}" 
        font-weight="bold" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="central"
      >${initials}</text>
    </svg>
  `.trim();
}

export function generateAvatarDataURL(email: string, size: number = 200): string {
  const svg = generateAvatarSVG(email, size);
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml,${encoded}`;
}


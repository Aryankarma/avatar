import { NextResponse } from 'next/server';
import { generateAvatarSVG } from '@/lib/avatar-generator';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const size = parseInt(searchParams.get('size') || '200');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  // Validate size
  if (isNaN(size) || size < 50 || size > 1000) {
    return NextResponse.json(
      { error: 'Size must be between 50 and 1000' },
      { status: 400 }
    );
  }

  try {
    const svg = generateAvatarSVG(email, size);
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate avatar' },
      { status: 500 }
    );
  }
}


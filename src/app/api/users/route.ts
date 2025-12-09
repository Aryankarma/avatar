import { NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export async function GET() {
  return NextResponse.json({ 
    users: mockUsers,
    count: mockUsers.length
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
    };

    // In a real app, you would save to database here
    mockUsers.push(newUser);

    return NextResponse.json({ 
      message: 'User created successfully',
      user: newUser
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}


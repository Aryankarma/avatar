import { NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const userIndex = mockUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    // Update user
    if (name) mockUsers[userIndex].name = name;
    if (email) mockUsers[userIndex].email = email;

    return NextResponse.json({ 
      message: 'User updated successfully',
      user: mockUsers[userIndex]
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const userIndex = mockUsers.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  const deletedUser = mockUsers.splice(userIndex, 1)[0];

  return NextResponse.json({ 
    message: 'User deleted successfully',
    user: deletedUser
  });
}


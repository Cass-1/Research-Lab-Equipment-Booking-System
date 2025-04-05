import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  // Check authentication and authorization
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }

  try {
    // Parse request body
    const { name, description, imageUrl } = await req.json();

    // Validate input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { message: 'Lab name is required' },
        { status: 400 }
      );
    }

    // Create the lab in the database
    const lab = await prisma.lab.create({
      data: {
        name,
        description,
        imageUrl,
        // Add the current user as an admin of the lab
        users: {
          create: {
            userId: session.user.id,
            role: 'ADMIN'
          }
        }
      },
    });

    return NextResponse.json(lab, { status: 201 });
  } catch {
    console.log('Error creating lab:');
    return NextResponse.json(
      { message: 'Failed to create lab' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint would return all labs (for admin listing)
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }

  const labs = await prisma.lab.findMany({
    include: {
      _count: {
        select: { users: true, equipment: true }
      }
    }
  });

  return NextResponse.json(labs);
}
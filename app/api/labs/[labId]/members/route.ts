import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import { auth } from '@/auth';

// Add a member to a lab
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ labId: string }> }
) {
  const { labId } = await params;
  const session = await auth();
  
  // Check authorization
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  try {
    const { email, role } = await req.json();
    
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found with that email' },
        { status: 404 }
      );
    }
    
    // Check if user is already in the lab
    const existingMember = await prisma.userLab.findUnique({
      where: {
        userId_labId: {
          userId: user.id,
          labId,
        }
      }
    });
    
    if (existingMember) {
      return NextResponse.json(
        { message: 'User is already a member of this lab' },
        { status: 400 }
      );
    }
    
    // Add user to lab
    const userLab = await prisma.userLab.create({
      data: {
        userId: user.id,
        labId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        }
      }
    });
    
    return NextResponse.json(userLab, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Error adding lab member' },
      { status: 500 }
    );
  }
}
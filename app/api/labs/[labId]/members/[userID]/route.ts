import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import { auth } from '@/auth';

// Update a lab member's role
export async function PUT(
  req: NextRequest,
  { params }: { params: { labId: string, userId: string } }
) {
  const { labId, userId } = params;
  const session = await auth();
  
  // Check authorization
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  try {
    const { role } = await req.json();
    
    // Update the user's role in the lab
    const updatedUserLab = await prisma.userLab.update({
      where: {
        userId_labId: {
          userId,
          labId,
        }
      },
      data: { role },
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
    
    return NextResponse.json(updatedUserLab);
  } catch {
    return NextResponse.json(
      { message: 'Error updating lab member' },
      { status: 500 }
    );
  }
}

// Remove a member from a lab
export async function DELETE(
  req: NextRequest,
  { params }: { params: { labId: string, userId: string } }
) {
  const { labId, userId } = params;
  const session = await auth();
  
  // Check authorization
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  try {
    // Remove the user from the lab
    await prisma.userLab.delete({
      where: {
        userId_labId: {
          userId,
          labId,
        }
      }
    });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: 'Error removing lab member' },
      { status: 500 }
    );
  }
}
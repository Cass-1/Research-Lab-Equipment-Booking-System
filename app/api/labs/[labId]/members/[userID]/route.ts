import { NextRequest, NextResponse } from 'next/server';
import { prisma, Role } from '@/app/_lib/prisma';
import { auth } from '@/auth';

// Update a lab member's role
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ labId: string; userId: string }> }
) {
  const { labId, userId } = await context.params;
  const session = await auth();

  // Check authorization
  if (!session?.user || session.user.role !== Role.LAB_MANAGER) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }

  try {
    const { role } = await req.json();

    const updatedUser = await prisma.user.update({

      where: { id: userId },
      data: { role },
    });
    // Update the user's role in the lab
    const updatedUserLab = await prisma.userLab.update({
      where: {
        userId_labId: {
          userId,
          labId,
        }
      },
      data: {},
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
  context: { params: Promise<{ labId: string; userId: string }> }
) {
  const { labId, userId } = await context.params;
  const session = await auth();

  // Check authorization
  if (!session?.user || session.user.role !== Role.LAB_MANAGER) {
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
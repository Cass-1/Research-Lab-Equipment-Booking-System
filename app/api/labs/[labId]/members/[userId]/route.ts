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
  if (!session?.user) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }
  // Check if user is admin
  const isAdmin = await prisma.user.findUnique({
    where: {
      id: userId,
      role: Role.ADMIN
    }
  });

  if (isAdmin) {
    return NextResponse.json(
      { message: 'User is admin' },
      { status: 400 }
    );
  }

  try {
    const { role } = await req.json();
    const validRole = role as Role;

    const updatedUser = await prisma.user.update({

      where: { id: userId },
      data: { role: validRole },
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
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error updating lab member' },
      { status: 500 }
    );
  }
}

// Remove a member from a lab
export async function DELETE(
  req: NextRequest,
  context: { params: { labId: string; userId: string } }
) {
  const { labId, userId } = context.params;
  const session = await auth();

  // Check authorization
  if (!session?.user) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 403 }
    );
  }
  // Check if user is admin
  const isAdmin = await prisma.user.findUnique({
    where: {
      id: userId,
      role: Role.ADMIN
    }
  });

  if (isAdmin) {
    return NextResponse.json(
      { message: 'User is admin' },
      { status: 400 }
    );
  }

  try {
    // Remove the user from the lab
    await prisma.userLab.delete({
      where: {
        userId_labId: {
          userId: userId,
          labId: labId
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: `Error removing lab member` },
      { status: 500 }
    );
  }
}
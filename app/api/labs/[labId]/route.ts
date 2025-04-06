import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import { auth } from '@/auth';

// Get a single lab
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ labId: string }> }
) {
  const { labId } = await params;
  
  try {
    const lab = await prisma.lab.findUnique({
      where: { id: labId },
      include: {
        users: {
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
        },
        equipment: true,
      }
    });
    
    if (!lab) {
      return NextResponse.json(
        { message: 'Lab not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(lab);
  } catch {
    return NextResponse.json(
      { message: 'Error fetching lab' },
      { status: 500 }
    );
  }
}

// Update a lab
export async function PUT(
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
    const { name, description, imageUrl } = await req.json();
    
    // Validate input
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { message: 'Lab name is required' },
        { status: 400 }
      );
    }
    
    // Update the lab
    const updatedLab = await prisma.lab.update({
      where: { id: labId },
      data: {
        name,
        description,
        imageUrl,
      }
    });
    
    return NextResponse.json(updatedLab);
  } catch {
    return NextResponse.json(
      { message: 'Error updating lab' },
      { status: 500 }
    );
  }
}

// Delete a lab
export async function DELETE(
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
    console.log("The id is: " + labId);
    // Delete the lab
    await prisma.lab.delete({
      where: { id: labId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error deleting lab';
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
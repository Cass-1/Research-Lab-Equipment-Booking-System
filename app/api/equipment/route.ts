import { NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { labId, name } = body;

  if (!labId || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await prisma.equipment.create({
      data: {
        name,
        labId
      },
    });

    return NextResponse.json({ message: 'Equipment added successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to add equipment' }, { status: 500 });
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json({ message: 'API is working' }, { status: 200 });
}
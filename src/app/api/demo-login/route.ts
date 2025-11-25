import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// Minimal API to test sign-in & data retrieval
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 1. Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        organisation: true,
        memberships: {
          include: {
            membershipTier: true,
          },
        },
        membershipDashboardMember: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 2. Check password
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Pull membership info
    const membership = user.memberships.at(0); // You seeded exactly one membership per user
    if (!membership) {
      return NextResponse.json(
        { error: 'User has no membership record.' },
        { status: 404 }
      );
    }

    const tier = membership.membershipTier?.label ?? 'Unknown tier';

    const redeemedCodes =
      user.membershipDashboardMember?.redeemedBenefitCodes ?? [];

    // 4. Build a personalised greeting
    const message = [
      `Hello ${user.firstName},`,
      `Welcome back to the Alliances Platform.`,
      ``,
      `Organisation: ${user.organisation?.name ?? 'Unknown'}`,
      `Membership Tier: ${tier}`,
      `Redeemed Benefits: ${redeemedCodes.length ? redeemedCodes.join(', ') : 'None'}`,
    ].join('\n');

    return NextResponse.json({
      ok: true,
      message,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        organisation: user.organisation?.name,
        membershipTier: tier,
        redeemedBenefits: redeemedCodes,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Unexpected server error.' },
      { status: 500 }
    );
  }
}

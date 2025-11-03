import { db } from "@/database/drizzle";
import { collaboratorInvitations, weddingUsers } from "@/drizzle/schema";
import { extractWeddingId } from "@/lib/extractWeddingId";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { sessionClaims } = await auth();
  const weddingId = extractWeddingId(sessionClaims as CustomJwtSessionClaims);
  if (!weddingId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;

  const [permissions, invitations] = await Promise.all([
    // get all the collaborators that are part of the wedding
    db.query.weddingUsers.findMany({
      where: and(eq(weddingUsers.weddingId, weddingId)),
    }),
    // get all the invitations that are part of the wedding
    db.query.collaboratorInvitations.findMany({
      where: and(eq(collaboratorInvitations.weddingId, weddingId)),
    }),
  ]);

  const currentUserPermission = permissions.find(
    (p) => p.clerkUserId === user.id
  );

  return NextResponse.json({
    currentUser: {
      email: userEmail,
      role: currentUserPermission?.role,
    },
    invitations: invitations.map((p) => ({
      id: p.id,
      email: p.invitedEmail,
      role: p.role,
      status: p.status,
      message: p.message,
      sentAt: p.sentAt,
    })),
  });
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionClaims } = await auth();
  const weddingId = extractWeddingId(sessionClaims as CustomJwtSessionClaims);
  if (!weddingId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { email, role, message } = body;

  if (!email || !role) {
    return NextResponse.json(
      { error: "Email and role are required" },
      { status: 400 }
    );
  }

  const validRoles = ["spouse", "family", "planner"];
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const existingInvitation = await db.query.collaboratorInvitations.findFirst({
    where: and(
      eq(collaboratorInvitations.weddingId, weddingId),
      eq(collaboratorInvitations.invitedEmail, email)
    ),
  });

  if (existingInvitation) {
    return NextResponse.json(
      { error: "An invitation already exists for this email" },
      { status: 409 }
    );
  }

  const userName =
    user.firstName || user.emailAddresses[0]?.emailAddress || "Someone";

  const [newInvitation] = await db
    .insert(collaboratorInvitations)
    .values({
      weddingId,
      invitedEmail: email,
      invitedByName: userName,
      role,
      message: message || null,
      status: "pending",
    })
    .returning();

  return NextResponse.json(
    {
      success: true,
      invitation: {
        id: newInvitation.id,
        email: newInvitation.invitedEmail,
        role: newInvitation.role,
        status: newInvitation.status,
        message: newInvitation.message,
        sentAt: newInvitation.sentAt,
      },
    },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    data: {
      message: "TODO",
      ...body,
    },
  });
}

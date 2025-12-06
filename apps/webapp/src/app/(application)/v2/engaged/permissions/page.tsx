"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ApplicationDashboardLayout,
  ApplicationTeamPermissions,
  type Collaborator,
  type Role,
  DashboardUserData,
  DashboardWeddingData,
} from "component-shelf";

const currentUser = {
  email: "6matbub@gmail.com",
  role: "spouse" as Role,
};

const initialCollaborators: Collaborator[] = [
  {
    id: "1",
    email: "matthew.yulissa@gmail.com",
    role: "family_member",
    joinedAt: "Nov 4, 2025",
  },
];

export default function PermissionsPage() {
  const pathname = usePathname();
  const [collaborators, setCollaborators] =
    useState<Collaborator[]>(initialCollaborators);

  const handleInvite = (email: string, role: Role) => {
    const newCollaborator: Collaborator = {
      id: `collab-${Date.now()}`,
      email,
      role,
      joinedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setCollaborators([...collaborators, newCollaborator]);
  };

  const handleRemove = (collaboratorId: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== collaboratorId));
  };

  const handleRoleChange = (collaboratorId: string, newRole: Role) => {
    setCollaborators(
      collaborators.map((c) =>
        c.id === collaboratorId ? { ...c, role: newRole } : c
      )
    );
  };

  const handleUserRoleChange = (newRole: Role) => {
    // TODO: Implement API call to update user role
    console.log("User role changed to:", newRole);
  };

  return (
    <ApplicationDashboardLayout Link={Link} pathname={pathname}>
      <ApplicationTeamPermissions
        currentUser={currentUser}
        collaborators={collaborators}
        onInvite={handleInvite}
        onRemove={handleRemove}
        onRoleChange={handleRoleChange}
        onUserRoleChange={handleUserRoleChange}
      />
    </ApplicationDashboardLayout>
  );
}

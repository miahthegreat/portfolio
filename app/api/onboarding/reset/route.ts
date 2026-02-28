import { TaskStatus, TaskOwner } from "@prisma/client";
import { prisma } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";

/**
 * Reset onboarding demo data to seed state.
 */
export async function POST() {
  await prisma.onboardingTask.deleteMany({});

  const sunrise = await prisma.property.findUnique({ where: { slug: "sunrise-towers" } });
  const harbor = await prisma.property.findUnique({ where: { slug: "harbor-view" } });
  if (!sunrise || !harbor) {
    return apiSuccess({ reset: true });
  }

  const residents = await prisma.resident.findMany({
    where: {
      propertyId: { in: [sunrise.id, harbor.id] },
      email: { in: ["alex.rivera@example.com", "jordan.chen@example.com", "maria.santos@example.com"] },
    },
  });
  const categories = await prisma.taskCategory.findMany({ orderBy: { sortOrder: "asc" } });
  if (categories.length < 4) return apiSuccess({ reset: true });

  const alex = residents.find((r: { email: string; id: string }) => r.email === "alex.rivera@example.com");
  const jordan = residents.find((r: { email: string; id: string }) => r.email === "jordan.chen@example.com");
  const maria = residents.find((r: { email: string; id: string }) => r.email === "maria.santos@example.com");

  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const [lease, utilities, community, docs] = categories;

  const data: Array<{
    residentId: string;
    categoryId: string;
    title: string;
    status: TaskStatus;
    owner: TaskOwner;
    dueDate?: Date;
    completedAt?: Date;
  }> = [];
  if (alex) {
    data.push(
      { residentId: alex.id, categoryId: lease.id, title: "Sign lease agreement", status: TaskStatus.DONE, owner: TaskOwner.RESIDENT, completedAt: now },
      { residentId: alex.id, categoryId: lease.id, title: "Pick up keys and fob", status: TaskStatus.IN_PROGRESS, owner: TaskOwner.PM, dueDate: nextWeek },
      { residentId: alex.id, categoryId: utilities.id, title: "Set up electricity", status: TaskStatus.TODO, owner: TaskOwner.RESIDENT, dueDate: nextWeek },
      { residentId: alex.id, categoryId: utilities.id, title: "Connect internet", status: TaskStatus.TODO, owner: TaskOwner.SYSTEM, dueDate: nextWeek },
      { residentId: alex.id, categoryId: community.id, title: "Complete community orientation", status: TaskStatus.TODO, owner: TaskOwner.PM, dueDate: nextWeek },
      { residentId: alex.id, categoryId: docs.id, title: "Upload ID and proof of income", status: TaskStatus.DONE, owner: TaskOwner.RESIDENT, completedAt: now }
    );
  }
  if (jordan) {
    data.push(
      { residentId: jordan.id, categoryId: lease.id, title: "Sign lease agreement", status: TaskStatus.TODO, owner: TaskOwner.RESIDENT, dueDate: nextWeek },
      { residentId: jordan.id, categoryId: utilities.id, title: "Set up utilities", status: TaskStatus.TODO, owner: TaskOwner.RESIDENT, dueDate: nextWeek }
    );
  }
  if (maria) {
    data.push({ residentId: maria.id, categoryId: lease.id, title: "Sign lease agreement", status: TaskStatus.IN_PROGRESS, owner: TaskOwner.PM, dueDate: nextWeek });
  }

  if (data.length) await prisma.onboardingTask.createMany({ data });
  return apiSuccess({ reset: true });
}

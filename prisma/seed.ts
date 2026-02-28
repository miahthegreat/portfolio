import { PrismaClient, TaskStatus, TaskOwner } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Properties
  const [sunrise, harbor, crest] = await Promise.all([
    prisma.property.upsert({
      where: { slug: "sunrise-towers" },
      create: {
        name: "Sunrise Towers",
        slug: "sunrise-towers",
        address: "100 Main St",
      },
      update: {},
    }),
    prisma.property.upsert({
      where: { slug: "harbor-view" },
      create: {
        name: "Harbor View",
        slug: "harbor-view",
        address: "200 Harbor Dr",
      },
      update: {},
    }),
    prisma.property.upsert({
      where: { slug: "crestwood" },
      create: {
        name: "Crestwood",
        slug: "crestwood",
        address: "300 Oak Ave",
      },
      update: {},
    }),
  ]);

  // Categories for onboarding
  const categories = await Promise.all([
    prisma.taskCategory.upsert({
      where: { name: "Lease & keys" },
      create: { name: "Lease & keys", sortOrder: 0 },
      update: {},
    }),
    prisma.taskCategory.upsert({
      where: { name: "Utilities & setup" },
      create: { name: "Utilities & setup", sortOrder: 1 },
      update: {},
    }),
    prisma.taskCategory.upsert({
      where: { name: "Community" },
      create: { name: "Community", sortOrder: 2 },
      update: {},
    }),
    prisma.taskCategory.upsert({
      where: { name: "Documents" },
      create: { name: "Documents", sortOrder: 3 },
      update: {},
    }),
  ]);

  // Residents per property (delete first so we can re-seed cleanly)
  await prisma.onboardingTask.deleteMany({});
  await prisma.resident.deleteMany({});

  const alex = await prisma.resident.create({
    data: {
      propertyId: sunrise.id,
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
    },
  });
  const jordan = await prisma.resident.create({
    data: {
      propertyId: sunrise.id,
      name: "Jordan Chen",
      email: "jordan.chen@example.com",
    },
  });
  const _sam = await prisma.resident.create({
    data: {
      propertyId: sunrise.id,
      name: "Sam Taylor",
      email: "sam.taylor@example.com",
    },
  });

  // Harbor View residents
  const maria = await prisma.resident.create({
    data: {
      propertyId: harbor.id,
      name: "Maria Santos",
      email: "maria.santos@example.com",
    },
  });
  await prisma.resident.create({
    data: {
      propertyId: harbor.id,
      name: "James Wu",
      email: "james.wu@example.com",
    },
  });

  // Crestwood: one resident
  await prisma.resident.create({
    data: {
      propertyId: crest.id,
      name: "Casey Brown",
      email: "casey.brown@example.com",
    },
  });

  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  await prisma.onboardingTask.createMany({
    data: [
      { residentId: alex.id, categoryId: categories[0].id, title: "Sign lease agreement", status: TaskStatus.DONE, owner: TaskOwner.RESIDENT, completedAt: now },
      { residentId: alex.id, categoryId: categories[0].id, title: "Pick up keys and fob", status: TaskStatus.IN_PROGRESS, owner: TaskOwner.PM, dueDate: nextWeek },
      { residentId: alex.id, categoryId: categories[1].id, title: "Set up electricity", status: TaskStatus.TODO, owner: TaskOwner.RESIDENT, dueDate: nextWeek },
      { residentId: alex.id, categoryId: categories[1].id, title: "Connect internet", status: TaskStatus.TODO, owner: TaskOwner.SYSTEM, dueDate: nextWeek },
      { residentId: alex.id, categoryId: categories[2].id, title: "Complete community orientation", status: TaskStatus.TODO, owner: TaskOwner.PM, dueDate: nextWeek },
      { residentId: alex.id, categoryId: categories[3].id, title: "Upload ID and proof of income", status: TaskStatus.DONE, owner: TaskOwner.RESIDENT, completedAt: now },
      { residentId: jordan.id, categoryId: categories[0].id, title: "Sign lease agreement", status: TaskStatus.TODO, owner: TaskOwner.RESIDENT, dueDate: nextWeek },
      { residentId: jordan.id, categoryId: categories[1].id, title: "Set up utilities", status: TaskStatus.TODO, owner: TaskOwner.RESIDENT, dueDate: nextWeek },
      { residentId: maria.id, categoryId: categories[0].id, title: "Sign lease agreement", status: TaskStatus.IN_PROGRESS, owner: TaskOwner.PM, dueDate: nextWeek },
    ],
  });

  // Marketplace: services catalog
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.service.deleteMany({});

  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "Premium Internet",
        description: "High-speed fiber, 500 Mbps",
        category: "Utilities",
        priceCents: 5999,
        enabled: true,
      },
    }),
    prisma.service.create({
      data: {
        name: "Storage Unit (5x5)",
        description: "On-site storage locker",
        category: "Add-ons",
        priceCents: 4999,
        enabled: true,
      },
    }),
    prisma.service.create({
      data: {
        name: "Gym & Fitness Pass",
        description: "Access to building gym and classes",
        category: "Amenities",
        priceCents: 2999,
        enabled: true,
      },
    }),
    prisma.service.create({
      data: {
        name: "Monthly Cleaning",
        description: "One deep clean per month",
        category: "Add-ons",
        priceCents: 12999,
        enabled: true,
      },
    }),
    prisma.service.create({
      data: {
        name: "Covered Parking",
        description: "One reserved covered spot",
        category: "Parking",
        priceCents: 15000,
        enabled: true,
      },
    }),
  ]);

  const order1 = await prisma.order.create({
    data: { residentId: alex.id },
  });
  const [internet, , gym, cleaning] = services;
  await prisma.orderItem.createMany({
    data: [
      { orderId: order1.id, serviceId: internet.id, quantity: 1, priceCents: internet.priceCents },
      { orderId: order1.id, serviceId: gym.id, quantity: 1, priceCents: gym.priceCents },
    ],
  });

  const order2 = await prisma.order.create({
    data: { residentId: maria.id },
  });
  await prisma.orderItem.createMany({
    data: [
      { orderId: order2.id, serviceId: internet.id, quantity: 1, priceCents: internet.priceCents },
      { orderId: order2.id, serviceId: cleaning.id, quantity: 1, priceCents: cleaning.priceCents },
    ],
  });

  // Analytics: daily metrics for the last 90 days (platform-wide)
  await prisma.dailyMetric.deleteMany({});
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const metricsData: Array<{ date: Date; adoptionRate: number; revenue: number; attachRate: number; churnRate: number }> = [];
  let rev = 12000;
  let adopt = 0.62;
  let attach = 0.38;
  let churn = 0.04;
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    // Slight trend: adoption and attach up, churn down, revenue up with some noise
    adopt = Math.min(0.92, Math.max(0.5, adopt + (Math.random() - 0.45) * 0.008));
    attach = Math.min(0.65, Math.max(0.2, attach + (Math.random() - 0.48) * 0.006));
    churn = Math.max(0.01, Math.min(0.08, churn + (Math.random() - 0.52) * 0.002));
    rev = Math.max(8000, rev + (Math.random() - 0.4) * 800);
    metricsData.push({
      date: d,
      adoptionRate: Math.round(adopt * 1000) / 1000,
      revenue: Math.round(rev * 100) / 100,
      attachRate: Math.round(attach * 1000) / 1000,
      churnRate: Math.round(churn * 1000) / 1000,
    });
  }
  await prisma.dailyMetric.createMany({ data: metricsData });

  console.log("Seed complete: properties, residents, onboarding tasks, marketplace services & orders, analytics metrics.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

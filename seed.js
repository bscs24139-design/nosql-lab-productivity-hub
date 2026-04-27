const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const { connect, getDb } = require("./db/connection");

async function seed() {
  await connect();
  const db = getDb();

  console.log("Connected to DB");

  // CLEAR OLD DATA
  await db.collection("users").deleteMany({});
  await db.collection("projects").deleteMany({});
  await db.collection("tasks").deleteMany({});
  await db.collection("notes").deleteMany({});

  // this will ensure duplicate emails are rejected by Query 1.
  await db.collection("users").createIndex({ email: 1 }, { unique: true });

  // USERS
  const passwordHash = await bcrypt.hash("123456", 10);

  const users = await db.collection("users").insertMany([
    {
      _id: new ObjectId(),
      name: "Ali",
      email: "ali@example.com",
      passwordHash: passwordHash,
      createdAt: new Date("2026-04-20T08:00:00Z")
    },
    {
      _id: new ObjectId(),
      name: "Sara",
      email: "sara@example.com",
      passwordHash: passwordHash,
      createdAt: new Date("2026-04-21T08:00:00Z")
    }
  ]);

  const user1 = users.insertedIds[0];
  const user2 = users.insertedIds[1];

  // PROJECTS
  const projects = await db.collection("projects").insertMany([
    {
      _id: new ObjectId(),
      name: "Web App",
      description: "Personal productivity frontend improvements",
      ownerId: user1,
      archived: false,
      createdAt: new Date("2026-04-22T09:00:00Z")
    },
    {
      _id: new ObjectId(),
      name: "AI System",
      description: "Model experiments and API integration",
      ownerId: user1,
      archived: false,
      createdAt: new Date("2026-04-23T09:00:00Z")
    },
    {
      _id: new ObjectId(),
      name: "Mobile App",
      description: "Cross-platform app prototype",
      ownerId: user2,
      archived: false,
      createdAt: new Date("2026-04-24T09:00:00Z")
    },
    {
      _id: new ObjectId(),
      name: "Portfolio",
      description: "Career portfolio refresh",
      ownerId: user2,
      archived: false,
      createdAt: new Date("2026-04-25T09:00:00Z")
    }
  ]);

  const projectIds = Object.values(projects.insertedIds);

  // TASKS
  await db.collection("tasks").insertMany([
    {
      _id: new ObjectId(),
      ownerId: user1,
      title: "Setup frontend",
      projectId: projectIds[0],
      status: "todo",
      priority: 2,
      tags: ["frontend"],
      subtasks: [
        { title: "Design UI", done: false },
        { title: "Setup React", done: false }
      ],
      createdAt: new Date("2026-04-25T10:00:00Z")
    },
    {
      _id: new ObjectId(),
      ownerId: user1,
      title: "Build API",
      projectId: projectIds[0],
      status: "in-progress",
      priority: 4,
      tags: ["backend", "api"],
      subtasks: [
        { title: "Create routes", done: false }
      ],
      createdAt: new Date("2026-04-25T11:00:00Z")
    },
    {
      _id: new ObjectId(),
      ownerId: user1,
      title: "Train model",
      projectId: projectIds[1],
      status: "todo",
      priority: 5,
      tags: ["ml", "research"],
      subtasks: [
        { title: "Collect data", done: false }
      ],
      createdAt: new Date("2026-04-25T12:00:00Z")
    },
    {
      _id: new ObjectId(),
      ownerId: user2,
      title: "Deploy app",
      projectId: projectIds[2],
      status: "todo",
      priority: 3,
      tags: ["devops"],
      subtasks: [
        { title: "Setup server", done: false }
      ],
      createdAt: new Date("2026-04-25T13:00:00Z")
    },
    {
      _id: new ObjectId(),
      ownerId: user2,
      title: "Write documentation",
      projectId: projectIds[3],
      status: "done",
      priority: 1,
      tags: ["docs"],
      subtasks: [
        { title: "API docs", done: true }
      ],
      createdAt: new Date("2026-04-25T14:00:00Z")
    }
  ]);

  // NOTES
  await db.collection("notes").insertMany([
    {
      _id: new ObjectId(),
      title: "System Architecture Notes",
      body: "General idea for system design and deployment topology.",
      tags: ["ideas", "architecture"],
      ownerId: user1,
      createdAt: new Date("2026-04-25T15:00:00Z")
    },
    {
      _id: new ObjectId(),
      title: "Web App Meeting",
      body: "Project meeting notes and action items for sprint 2.",
      tags: ["meeting", "frontend"],
      projectId: projectIds[0],
      ownerId: user1,
      createdAt: new Date("2026-04-25T16:00:00Z")
    },
    {
      _id: new ObjectId(),
      title: "AI Experiment Ideas",
      body: "Model tuning ideas and baseline evaluation metrics.",
      tags: ["ideas", "ml"],
      projectId: projectIds[1],
      ownerId: user1,
      createdAt: new Date("2026-04-25T17:00:00Z")
    },
    {
      _id: new ObjectId(),
      title: "Mobile UX Improvements",
      body: "Improve onboarding flow and reduce first-screen clutter.",
      tags: ["ux", "mobile"],
      projectId: projectIds[2],
      ownerId: user2,
      createdAt: new Date("2026-04-25T18:00:00Z")
    },
    {
      _id: new ObjectId(),
      title: "Standalone Brain Dump",
      body: "Random standalone note for future planning.",
      tags: ["ideas"],
      ownerId: user2,
      createdAt: new Date("2026-04-25T19:00:00Z")
    }
  ]);

  console.log("Seed completed successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

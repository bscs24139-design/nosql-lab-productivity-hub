// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const { connect, getDb } = require("./db/connection");

async function seed() {
  await connect();
  const db = getDb();

  console.log("Connected to DB");
  //clearing old data 
  await db.collection("users").deleteMany({});
  await db.collection("projects").deleteMany({});
  await db.collection("tasks").deleteMany({});
  await db.collection("notes").deleteMany({});

  // this will ensure duplicate emails are rejected by Query 1.
  await db.collection("users").createIndex({ email: 1 }, { unique: true });

  //users
  const passwordHash = await bcrypt.hash("123456", 10);
  const users = await db.collection("users").insertMany([
    {
      _id: new ObjectId(),
      name: "Ali",
      email: "ali@gmail.com",
      passwordHash: passwordHash
      createdAt: new Date("2026-04-20T08:00:00Z")
    },
    {
      _id: new ObjectId(),
      name: "Sara",
      email: "sara@gmail.com",
      passwordHash: passwordHash
      createdAt: new Date("2026-04-21T08:00:00Z")
    }
  ]);

  const user1 = users.insertedIds[0];
  const user2 = users.insertedIds[1];

  //projects 
   const projects = await db.collection("projects").insertMany([
    { _id: new ObjectId(), name: "Web App", ownerId: user1 },
    { _id: new ObjectId(), name: "AI System", ownerId: user1 },
    { _id: new ObjectId(), name: "Mobile App", ownerId: user2 },
    { _id: new ObjectId(), name: "Portfolio", ownerId: user2 }
  ]);

  const projectIds = Object.values(projects.insertedIds);

  //tasks
  await db.collection("tasks").insertMany([
    {
      title: "Setup frontend",
      projectId: projectIds[0],
      status: "todo",
      priority: 1,
      tags: ["frontend"],
      subtasks: [
        { title: "Design UI", done: false },
        { title: "Setup React", done: false }
      ]
    },
    {
      title: "Build API",
      projectId: projectIds[0],
      status: "in-progress",
      priority: 2,
      tags: ["backend"],
      subtasks: [
        { title: "Create routes", done: false }
      ]
    },
    {
      title: "Train model",
      projectId: projectIds[1],
      status: "todo",
      priority: 3,
      tags: ["ml"],
      subtasks: [
        { title: "Collect data", done: false }
      ]
    },
    {
      title: "Deploy app",
      projectId: projectIds[2],
      status: "todo",
      priority: 2,
      tags: ["devops"],
      subtasks: [
        { title: "Setup server", done: false }
      ]
    },
    {
      title: "Write documentation",
      projectId: projectIds[3],
      status: "done",
      priority: 1,
      tags: ["docs"],
      subtasks: [
        { title: "API docs", done: true }
      ]
    }
  ]);

  //notes
  await db.collection("notes").insertMany([
    {
      text: "General idea for system design",
      ownerId: user1
    },
    {
      text: "Project meeting notes",
      projectId: projectIds[0],
      ownerId: user1
    },
    {
      text: "AI model ideas",
      projectId: projectIds[1],
      ownerId: user1
    },
    {
      text: "Mobile UX improvements",
      projectId: projectIds[2],
      ownerId: user2
    },
    {
      text: "Random standalone note"
    }
  ]);

  console.log("Seed completed successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

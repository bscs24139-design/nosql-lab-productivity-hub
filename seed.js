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

  //users
  const passwordHash = await bcrypt.hash("123456", 10);
  const users = await db.collection("users").insertMany([
    {
      _id: new ObjectId(),
      name: "Ali",
      email: "ali@gmail.com",
      passwordHash: passwordHash
    },
    {
      _id: new ObjectId(),
      name: "Sara",
      email: "sara@gmail.com",
      passwordHash: passwordHash
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
}

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  // await db.collection('users').deleteMany({});
  // await db.collection('projects').deleteMany({});
  // await db.collection('tasks').deleteMany({});
  // await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================

  console.log('TODO: implement seed.js');
  process.exit(0);
})();

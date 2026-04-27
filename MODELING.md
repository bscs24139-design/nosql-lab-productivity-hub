# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** — This collection is used to store user accounts which inlcudes login credentials.Every user owns projects , tasks and notes.
- **projects** — THis collection represents a collection of tasks which actually belongs to the user and these projects can be archived rather than be deleted.
- **tasks** — This stores individual work which is linked to a project including status,priority taks.
- **notes** —This will store textual notes created by user . Notes can also be linked to a project but it is not necessary.

---

## 2. Document Shapes
  
For each collection, write the document shape (field name + type + required/optional):

### users

{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}


### projects
{
  _id: ObjectId,
  ownerId: ObjectId (required),
  name: string (required),
  description: string (optional),
  archived: boolean (required, default: false),
  createdAt: Date (required)
}

### tasks
'''
{
  _id: ObjectId,
  ownerId: ObjectId (required),
  projectId: ObjectId (required),
  title: string (required),
  status: string (required, "todo" | "in-progress" | "done"),
  priority: number (optional, default: 1),
  tags: [string] (optional, default: []),
  subtasks: [
    {
      title: string,
      done: boolean
    }
  ] (optional, default: []),
  createdAt: Date (required)
}
'''

### notes
{
  _id: ObjectId,
  text: string (required),
  ownerId: ObjectId (optional but recommended),
  projectId: ObjectId (optional),
  createdAt: Date (optional)
}

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |  Embed              |Because subtasks are tightly coupled with a task and always accessed together |
| Tags on a task                    |  Embed              |Tags are small , simple and can belong to any task      |
| Project → Task ownership          |  Reference          |Tasks can be high in number so if we store them sepraretly it will avoid large documents      |
| Note → optional Project link      |  Reference          |It is not necessary for notes to belong to a project , it is optional      |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

projectId in notes is a flexible field.

SOme notes have projectId which is linked to a project.
Some notes do not have it and they are standalone notes.

> _Your answer here._

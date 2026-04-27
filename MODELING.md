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
```
TODO
```

### tasks
```
TODO
```

### notes
```
TODO
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |                     |      |
| Tags on a task                    |                     |      |
| Project → Task ownership          |                     |      |
| Note → optional Project link      |                     |      |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> _Your answer here._

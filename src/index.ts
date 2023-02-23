import { Hono } from "hono";
import { Kysely } from "kysely";

import { D1Dialect } from "./D1Dialect";

import type { Schema } from "./schema";

const app = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();
let qb: Kysely<Schema>;

app.use(async (c, next) => {
  qb = new Kysely<Schema>({
    dialect: new D1Dialect({ database: c.env.DB }),
  });
  await next();
});

app.get("/:id", async (c) => {
  const user = await qb
    .selectFrom("users")
    .selectAll()
    .where("id", "=", Number(c.req.param("id")))
    .executeTakeFirst();
  if (!user) return c.notFound();
  else return c.jsonT(user);
});

app.get("/", async (c) => {
  const [limit, offset] = [c.req.query("limit"), c.req.query("offset")];
  const users = await qb
    .selectFrom("users")
    .selectAll()
    .limit(limit ? Number(limit) : 20)
    .offset(offset ? Number(offset) : 0)
    .execute();
  return c.jsonT(users);
});

app.post("/", async (c) => {
  const result = await qb
    .insertInto("users")
    .values(await c.req.json()) // Need Validation
    .execute();
  return c.jsonT(result);
});

export default app;

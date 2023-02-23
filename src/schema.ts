import { Generated, ColumnType } from "kysely";

export interface Schema {
  users: {
    id: Generated<number>;
    name: string;
    email: string;
    password: string;
    created_at: ColumnType<string, never, never>;
    updated_at: ColumnType<string, never, string>;
  };
}

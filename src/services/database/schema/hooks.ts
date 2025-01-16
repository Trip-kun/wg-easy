import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { wgInterface } from './interface';

export const hooks = sqliteTable('hooks_table', {
  id: int()
    .primaryKey({ autoIncrement: true })
    .references(() => wgInterface.id),
  preUp: text('pre_up').notNull(),
  postUp: text('post_up').notNull(),
  preDown: text('pre_down').notNull(),
  postDown: text('post_down').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

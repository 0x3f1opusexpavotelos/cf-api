import { sql } from 'drizzle-orm';
import { time } from 'drizzle-orm/mysql-core';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  // id is set on insert, incrementing
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  authorId: text("author_id")
    .notNull()
    .references(() => accounts.id),
  title: text('title', { length: 256 }).notNull(),
  content: text('content', { length: 256 }).notNull(),
  createAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});


export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export const generateId = () =>
         new Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
            .join("-");





// export const session = sqliteTable("session",{


//   expiredAt: integer('expired_at').notNull
//   refreshedAt:
//   lastSignInAt
// })


export const accounts = sqliteTable('accounts',{
  id: text('id')
  .primaryKey()
  .notNull()
  .$defaultFn(() => generateId()),
  payidId: text('payid_id'),
  lastSignInAt: text("lastSignin"),


  invitedAt: text('invited_at'),
  email: text('email').notNull().unique(),
  encryptedPassword: text('encrypted_password'),
  emailConfirmedAt: text('email_confirmed_at'),
  emailOtp: text("email_otp"),

  phone: text('phone'),
  phoneConfirmedAt: text('phone_confirmed_at'),

  confirmationToken: text('confirmation_token'),
  confirmationSentAt: text('confirmation_sent_at'),
  verificationType: text('verification_type'),

  recoveryToken: text('recovery_token'),
  recoverySentAt: text('recovery_sent_at'),

  emailChangeTokenNew: text('email_change_token_new'),
  emailChangeSentAt: text('email_change_sent_at'),
  emailChangeConfirmStatus: text('email_change_confirm_status'),

  phoneChangeToken: text('phone_change_token'),
  phoneChangeSentAt: text('phone_change_sent_at'),
})


export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;



export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().notNull(),
  accountId: text('account_id')
    .notNull()
    .references(() => accounts.id),
  expiresAt: integer('expires_at').notNull(),
});

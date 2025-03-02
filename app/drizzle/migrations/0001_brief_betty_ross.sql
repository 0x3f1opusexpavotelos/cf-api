ALTER TABLE `posts` RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`payid_id` text,
	`lastSignin` text,
	`invited_at` text,
	`email` text NOT NULL,
	`encrypted_password` text,
	`email_confirmed_at` text,
	`email_otp` text,
	`phone` text,
	`phone_confirmed_at` text,
	`confirmation_token` text,
	`confirmation_sent_at` text,
	`verification_type` text,
	`recovery_token` text,
	`recovery_sent_at` text,
	`email_change_token_new` text,
	`email_change_sent_at` text,
	`email_change_confirm_status` text,
	`phone_change_token` text,
	`phone_change_sent_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `posts` ADD `author_id` text NOT NULL REFERENCES accounts(id);
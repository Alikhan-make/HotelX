CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `created_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `platform_admins` (
  `user_id` text PRIMARY KEY NOT NULL,
  `created_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `hotels` (
  `id` text PRIMARY KEY NOT NULL,
  `owner_user_id` text,
  `name` text NOT NULL,
  `verification_status` text NOT NULL DEFAULT 'PENDING',
  `created_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE TABLE `hotel_memberships` (
  `user_id` text NOT NULL,
  `hotel_id` text NOT NULL,
  `role` text NOT NULL,
  `status` text NOT NULL DEFAULT 'ACTIVE',
  `created_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `hotel_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `verification_requests` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text,
  `hotel_id` text,
  `hotel_name` text NOT NULL,
  `applicant_name` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL DEFAULT '',
  `website` text NOT NULL DEFAULT '',
  `rooms_count` integer NOT NULL DEFAULT 0,
  `country` text NOT NULL DEFAULT 'Казахстан',
  `status` text NOT NULL DEFAULT 'PENDING',
  `submitted_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at` text,
  `reviewed_by` text,
  `review_note` text,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE TABLE `membership_permissions` (
  `user_id` text NOT NULL,
  `hotel_id` text NOT NULL,
  `permission` text NOT NULL,
  `allowed` integer NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`, `hotel_id`, `permission`),
  FOREIGN KEY (`user_id`, `hotel_id`) REFERENCES `hotel_memberships`(`user_id`, `hotel_id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `verification_documents` (
  `verification_id` text NOT NULL,
  `kind` text NOT NULL,
  `object_key` text NOT NULL,
  `content_type` text NOT NULL,
  `size_bytes` integer NOT NULL,
  `uploaded_by` text NOT NULL,
  `uploaded_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`verification_id`, `kind`),
  FOREIGN KEY (`verification_id`) REFERENCES `verification_requests`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);

CREATE TABLE `bookings` (
  `id` text PRIMARY KEY NOT NULL,
  `guest_user_id` text NOT NULL,
  `hotel_id` text NOT NULL,
  `room_id` text NOT NULL,
  `room_type` text NOT NULL,
  `check_in` text NOT NULL,
  `check_out` text NOT NULL,
  `guests` integer NOT NULL,
  `nights` integer NOT NULL,
  `total` integer NOT NULL,
  `status` text NOT NULL DEFAULT 'CONFIRMED',
  `created_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`guest_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE restrict
);

CREATE TABLE `room_inventory` (
  `hotel_id` text NOT NULL,
  `room_id` text NOT NULL,
  `check_in` text NOT NULL,
  `check_out` text NOT NULL,
  `capacity` integer NOT NULL,
  `booked` integer NOT NULL DEFAULT 0,
  PRIMARY KEY (`hotel_id`, `room_id`, `check_in`, `check_out`),
  FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TRIGGER `room_inventory_capacity_guard`
BEFORE UPDATE OF `booked` ON `room_inventory`
WHEN NEW.`booked` > OLD.`capacity`
BEGIN
  SELECT RAISE(ABORT, 'ROOM_SOLD_OUT');
END;

CREATE TABLE `price_overrides` (
  `hotel_id` text NOT NULL,
  `room_type` text NOT NULL,
  `from_date` text NOT NULL,
  `to_date` text NOT NULL,
  `price` integer NOT NULL,
  `updated_by` text NOT NULL,
  `updated_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hotel_id`, `room_type`, `from_date`, `to_date`),
  FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);

CREATE TABLE `audit_events` (
  `id` text PRIMARY KEY NOT NULL,
  `actor_user_id` text NOT NULL,
  `hotel_id` text,
  `action` text NOT NULL,
  `resource_type` text NOT NULL,
  `resource_id` text,
  `metadata_json` text NOT NULL DEFAULT '{}',
  `created_at` text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict,
  FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX `bookings_guest_idx` ON `bookings` (`guest_user_id`, `created_at`);
CREATE INDEX `verification_status_idx` ON `verification_requests` (`status`, `submitted_at`);
CREATE INDEX `audit_actor_idx` ON `audit_events` (`actor_user_id`, `created_at`);

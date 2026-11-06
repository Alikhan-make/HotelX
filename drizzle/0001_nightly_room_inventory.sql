DROP TRIGGER IF EXISTS `room_inventory_capacity_guard`;
DROP TABLE IF EXISTS `room_inventory`;

CREATE TABLE `room_inventory` (
  `hotel_id` text NOT NULL,
  `room_id` text NOT NULL,
  `stay_date` text NOT NULL,
  `capacity` integer NOT NULL,
  `booked` integer NOT NULL DEFAULT 0,
  PRIMARY KEY (`hotel_id`, `room_id`, `stay_date`),
  FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TRIGGER `room_inventory_capacity_guard`
BEFORE UPDATE OF `booked` ON `room_inventory`
WHEN NEW.`booked` > OLD.`capacity`
BEGIN
  SELECT RAISE(ABORT, 'ROOM_SOLD_OUT');
END;

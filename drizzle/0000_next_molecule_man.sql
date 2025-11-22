CREATE TABLE `mentors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`campus` enum('ANTONIO_VARAS','VINA_DEL_MAR','CONCEPCION') NOT NULL,
	`career` enum('CIVIL_ENGINEERING','COMPUTER_ENGINEERING','ELECTRICAL_ENGINEERING','INDUSTRIAL_ENGINEERING') NOT NULL,
	`specialty_subject` enum('CALCULUS_I','LINEAR_ALGEBRA','PHYSICS','PROGRAMMING','ELECTRONICS') NOT NULL,
	`language` enum('SPANISH','ENGLISH','SPANISH_ENGLISH') NOT NULL,
	`modality` enum('IN_PERSON','ONLINE') NOT NULL,
	`bio` text NOT NULL,
	`availability` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mentors_id` PRIMARY KEY(`id`),
	CONSTRAINT `mentors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`campus` enum('ANTONIO_VARAS','VINA_DEL_MAR','CONCEPCION') NOT NULL,
	`career` enum('CIVIL_ENGINEERING','COMPUTER_ENGINEERING','ELECTRICAL_ENGINEERING','INDUSTRIAL_ENGINEERING') NOT NULL,
	`subject` enum('CALCULUS_I','LINEAR_ALGEBRA','PHYSICS','PROGRAMMING','ELECTRONICS') NOT NULL,
	`current_year` int NOT NULL,
	`language` enum('SPANISH','ENGLISH','SPANISH_ENGLISH') NOT NULL,
	`modality` enum('IN_PERSON','ONLINE') NOT NULL,
	`request` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `students_id` PRIMARY KEY(`id`),
	CONSTRAINT `students_email_unique` UNIQUE(`email`)
);

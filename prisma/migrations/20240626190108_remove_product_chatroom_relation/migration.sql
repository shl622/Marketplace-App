/*
  Warnings:

  - You are about to drop the column `productId` on the `ChatRoom` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_ChatRoom" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - Added the required column `productId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ChatRoom_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoom" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

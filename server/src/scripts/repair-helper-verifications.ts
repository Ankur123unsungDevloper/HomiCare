import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
throw new Error("DATABASE_URL is missing from the environment variables.");
}

const prisma = new PrismaClient({
adapter: new PrismaPg({ connectionString }),
});

const requiredVerifications = [
{ type: "IDENTITY", evidenceRequired: true },
{ type: "PHONE", evidenceRequired: false },
{ type: "ADDRESS", evidenceRequired: true },
{ type: "BACKGROUND", evidenceRequired: true },
{ type: "EXPERIENCE", evidenceRequired: true },
{ type: "REFERENCES", evidenceRequired: true },
] as const;

async function main() {
const applicationId = process.argv[2];

if (!applicationId) {
throw new Error(
"Provide the existing application ID as the first argument.",
);
}

await prisma.$transaction(async (tx) => {
const application = await tx.helperApplication.findUnique({
where: { id: applicationId },
select: {
id: true,
status: true,
verifications: {
select: { type: true },
},
},
});

  
if (!application) {
  throw new Error("The specified helper application was not found.");
}

if (application.status !== "PENDING") {
  throw new Error(
    `Expected PENDING status, received ${application.status}. No changes made.`,
  );
}

const existingTypes = new Set(
  application.verifications.map((verification) => verification.type),
);

const missing = requiredVerifications.filter(
  (verification) => !existingTypes.has(verification.type),
);

for (const verification of missing) {
  await tx.helperVerification.create({
    data: {
      applicationId: application.id,
      type: verification.type,
      evidenceRequired: verification.evidenceRequired,
    },
  });
}

console.log({
  applicationId: application.id,
  status: application.status,
  previouslyExisting: application.verifications.length,
  created: missing.map((verification) => verification.type),
  message: "Verification repair completed.",
});

});
}

main()
.catch((error) => {
console.error("Verification repair failed:", error);
process.exitCode = 1;
})
.finally(async () => {
await prisma.$disconnect();
});

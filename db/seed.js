import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const employees = [
  { name: "Bridgette Summers", birthday: "1991-07-01", salary: 72000 },
  { name: "Cody Anderson", birthday: "1993-04-22", salary: 85000 },
  { name: "Courtney Satella", birthday: "1990-11-18", salary: 92000 },
  { name: "DJ Benson", birthday: "1988-06-20", salary: 104000 },
  { name: "Duncan Tarun", birthday: "1991-03-09", salary: 61000 },
  { name: "Gwen Ingrid", birthday: "1992-12-23", salary: 97000 },
  { name: "Heather Kasuga", birthday: "1990-06-01", salary: 73000 },
  { name: "Izzy Connelly", birthday: "1992-10-31", salary: 89000 },
  { name: "Justin Batofel", birthday: "1989-09-15", salary: 68000 },
  { name: "Leshawna Olongala", birthday: "1987-08-17", salary: 99000 }
];


  for (const employee of employees) {
    await createEmployee(employee);
  }
}


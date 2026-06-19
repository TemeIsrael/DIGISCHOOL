import { Admin } from "../db/models";

async function run() {
  const admins = await Admin.findAll();
  console.log(JSON.stringify(admins, null, 2));
  process.exit();
}

run();

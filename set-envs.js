import { writeFileSync, mkdirSync } from "fs";
require("dotenv").config();

const envDirectory = "./src/environments";
const targetDevPath = `${envDirectory}/environment.ts`;

const envConfigFile = ` export const environment = {
  mapbox_key: "${process.env.MAPBOX_KEY}"
}
`;

mkdirSync(`${envDirectory}`, { recursive: true });

writeFileSync(targetDevPath, envConfigFile);

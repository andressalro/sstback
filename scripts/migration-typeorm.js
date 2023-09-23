#!/usr/bin/env node

const yargs = require("yargs");
const { execSync } = require("child_process");

const {
  _: [name],
  path,
} = yargs.argv;

const migrationPath = `src/infrastructure/db/migration/${name}`;

execSync(`typeorm migration:create ${migrationPath}`, { stdio: "inherit" });

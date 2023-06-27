#!/usr/bin/env node

const { program } = require('commander');
const createBackendEnvironment = require('./template');

program.version('1.0.0');

// 'create' command
program
  .command('create lemon-pie')
  .description('Create a new backend environment')
  .action(createBackendEnvironment);

program.parse(process.argv);
#!/usr/bin/env node

const { program } = require('commander');
const createBackendEnvironment = require('./template');

program.version('1.0.2');

// 'create' command
program
  .command('create')
  .description('Create a new backend environment')
  .action(createBackendEnvironment);

program.parse(process.argv);
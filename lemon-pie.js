#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');

program.version('1.1.7');

program
	.command('create')
	.description('Creates a new backend environment')
	.action(() => {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'orm',
					message: 'Choose the ORM for the environment: ',
					choices: ['Sequelize', 'Prisma']
				},
			])
      .then((answers) => {
        if (answers.orm === 'Prisma') {
          const createPrismaEnvironment = require('./prisma-template');
          createPrismaEnvironment();
        } else if (answers.orm === 'Sequelize') {
          const createSequelizeEnvironment = require('./sequelize-template');
          createSequelizeEnvironment();
        } else {
          console.error('Invalid ORM choice');
        }
      })
	});

program.parse(process.argv);
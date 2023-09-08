#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');

program.version('1.1.13');

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
				{
          type: 'input',
          name: 'projectName',
          message: 'Enter a name for your project:',
          default: 'myproject',
        },
			])
      .then((answers) => {
        if (answers.orm === 'Prisma') {
          const createPrismaEnvironment = require('./prisma-template');
          createPrismaEnvironment(answers.projectName);
        } else if (answers.orm === 'Sequelize') {
          const createSequelizeEnvironment = require('./sequelize-template');
          createSequelizeEnvironment(answers.projectName);
        } else {
          console.error('Invalid ORM choice');
        }
      })
	});

program.parse(process.argv);
#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');

program.version('1.0.4');

program
	.command('create')
	.description('Create a new backend environment')
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
				const templatePath = answers.orm === 'prisma' ? './prisma-template' : './sequelize-template';
				const createEnvironment = require(templatePath);
				createEnvironment();
			})
	});

program.parse(process.argv);
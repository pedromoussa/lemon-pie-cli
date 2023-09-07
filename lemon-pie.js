#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');

program.version('1.1.6');

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
				const templatePath = answers.orm === 'Prisma' ? './prisma-template' : './sequelize-template';
				const createEnvironment = require(templatePath);
				createEnvironment();
			})
	});

program.parse(process.argv);
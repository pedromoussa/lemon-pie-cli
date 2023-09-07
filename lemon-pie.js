#!/usr/bin/env node

import program from './commonjs-module.js';
import inquirer from 'inquirer';

program.version('1.0.11');

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
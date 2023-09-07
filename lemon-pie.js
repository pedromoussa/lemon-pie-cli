#!/usr/bin/env node

import commonjsModule from './commonjs-module.cjs';
import inquirer from 'inquirer';

commonjsModule.program.version('1.0.17');

commonjsModule.program
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
				// const createEnvironment = require(templatePath);
				// createEnvironment();
				commonjsModule.createEnvironment(templatePath);
			})
	});

commonjsModule.program.parse(process.argv);
const fs = require('fs').promises;
const path = require('path');

const createAllDirectories = async () => {
  try {
    await fs.mkdir('templates/', { recursive: true });
    await fs.mkdir('src/config/', { recursive: true });
    await fs.mkdir('src/controllers/', { recursive: true });
    await fs.mkdir('src/database/seeders/', { recursive: true });
    await fs.mkdir('src/middlewares/', { recursive: true });
    await fs.mkdir('src/models/', { recursive: true });
    await fs.mkdir('src/routes/', { recursive: true });
    await fs.mkdir('uploads/', { recursive: true });
    console.log("All directories have been created successfully.");
  } catch (err) {
    console.error(err);
  }
};

const createAllFiles = async () => {
  try {
    const environment = `# ENV
APP_NAME=Example
NODE_ENV=development
PORT=3333
APP_URL=http://localhost:3333

# DATABASE
DB_CONNECTION=sqlite
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=database.sqlite

# KEYS
PRIVATE_KEY=
PUBLIC_KEY=

# MAIL
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=

# AWS PRODUCTION
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
`;

    const gitignoreFromUploads = `# Ignore everything in this directory
*
# Except this file
!.gitignore
`;

    const gitignoreDefault = `node_modules/
.DS_Store
*.sqlite
*.png
*.jpg
.env
.idea
id_rsa_priv.pem
`;

    const dotEnvFile = `module.exports = function configDotenv() {
  const result = require('dotenv').config();
  if (result.error) { throw result.error; }
}
`;

    const sequelizeFile = `const { Sequelize } = require("sequelize");

const sequelize = (process.env.DB_CONNECTION === 'sqlite') ?
  new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_HOST + process.env.DB_DATABASE
  }) :
  new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_CONNECTION,
      models: [__dirname + "/../models"]
    }
  );

module.exports = sequelize;

//require('../models/');

for (mod in sequelize.models) {
  if (sequelize.models[mod].associate instanceof Function) {
    sequelize.models[mod].associate(sequelize.models);
  }
}
`;

    const seedFile = `require('../../config/dotenv')();
require('../../config/sequelize');

//const seedModel = require('./Model');

(async () => {
  try {
    //await seedModel();

  } catch (err) { console.log(err) }
})();
`;

    const migrateFile = `require('../config/dotenv')();
const sequelize = require('../config/sequelize');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  }
  catch (error) { console.log(error) };
})();
`;

    const appFile = `const express = require('express');
require('./src/config/dotenv')();
//require('./src/config/sequelize');

const app = express();
const port = process.env.PORT;
//const cors = require('cors');
//const routes = require('./src/routes/routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(\`${process.env.APP_NAME} app listening at http://localhost:\${port}\`);
});
`;

    await fs.writeFile('.env.example', environment);
    await fs.writeFile('.gitignore', gitignoreDefault);
    await fs.writeFile('uploads/.gitignore', gitignoreFromUploads);
    await fs.writeFile('src/config/dotenv.js', dotEnvFile);
    await fs.writeFile('src/config/sequelize.js', sequelizeFile);
    await fs.writeFile('src/database/migrate.js', migrateFile);
    await fs.writeFile('templates/.gitkeep', '\n', 'utf8');
    await fs.writeFile('src/controllers/.gitkeep', '\n', 'utf8');
    await fs.writeFile('src/database/seeders/seeder.js', seedFile);
    await fs.writeFile('src/middlewares/.gitkeep', '\n', 'utf8');
    await fs.writeFile('src/models/.gitkeep', '\n', 'utf8');
    await fs.writeFile('src/routes/routes.js', '\n', 'utf8');
    await fs.writeFile('server.js', appFile);
    console.log("All files have been created successfully.");
  } catch (err) {
    console.error(err);
  }
};

const createSequelizeEnvironment = async (projectName) => {
  console.log(`Creating backend environment for ${projectName}...`);

  exec("npm init -y");
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(await fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.name = projectName;

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  await createAllDirectories();
  await createAllFiles();
};

module.exports = createSequelizeEnvironment;
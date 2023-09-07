const { exec } = require("child_process");
const fsPromise = require('fs').promises;
const path = require('path');

const createAllDirectories = async () => {
  try {
    await fsPromise.mkdir('templates/', { recursive: true });
    await fsPromise.mkdir('src/config/', { recursive: true });
    await fsPromise.mkdir('src/controllers/', { recursive: true });
    await fsPromise.mkdir('src/middlewares/', { recursive: true });
    await fsPromise.mkdir('src/routes/', { recursive: true });
    await fsPromise.mkdir('uploads/', { recursive: true });
    console.log("Todas as pastas foram criadas com sucesso");
  } catch (err) {
    console.log(err + "!");
  }
  return;
}

const createAllFiles = async () => {
  try {
    const environment = new Uint8Array(Buffer.from(`
    DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE?schema=public"

    # ENV
    APP_NAME=Example
    NODE_ENV=development
    PORT=3333
    APP_URL=http://localhost:3333
    `));

    const gitignoreFromUploads = new Uint8Array(Buffer.from(`# Ignore everything in this directory
    *
    # Except this file
    !.gitignore
    `));

    const gitignoreDefault = new Uint8Array(Buffer.from(`node_modules/
    .DS_Store
    *.sqlite
    *.png
    *.jpg
    .env
    .idea
    id_rsa_priv.pem
    `));

    const dotEnvFile = new Uint8Array(Buffer.from(`export default function configDotenv() {
  const result = require('dotenv').config();
  if (result.error) { throw result.error; }
}
    `));

    const appFile = new Uint8Array(Buffer.from(`import express from 'express';
import configDotenv from './src/config/dotenv';
// import cors from 'cors';
// import routes from './src/routes/routes';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
//app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
console.log(\`\${process.env.APP_NAME} app listening at http://localhost:\${port}\`);
});
    `));

    await fsPromise.writeFile('.env.example', environment);
    await fsPromise.writeFile('.gitignore', gitignoreDefault);
    await fsPromise.writeFile('uploads/.gitignore', gitignoreFromUploads);
    await fsPromise.writeFile('src/config/dotenv.ts', dotEnvFile);
    await fsPromise.writeFile('templates/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/controllers/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/middlewares/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/routes/routes.ts', '\n', 'utf8');
    await fsPromise.writeFile('server.ts', appFile);
    console.log("Todos os arquivos foram criados");
  } catch (err) {
    console.log(err + "!");
  }
  return
}

const createPrismaEnvironment = async (projectName) => {
  console.log(`Creating Prisma environment for ${projectName}...`);

  await createAllDirectories();
  exec("npm init -y");
  exec("npm i express dotenv prisma cors @prisma/client typescript ts-node @types/express --save-dev");
  exec("npx tsc --init");
  exec("cd ./src && npx prisma init");
  exec("cp .env.example .env");
  await createAllFiles();

  try {
    await fsPromise.unlink(path.join(__dirname, "template.js"));
  } catch (err) {
    console.error(err);
  }
};

module.exports = createPrismaEnvironment;
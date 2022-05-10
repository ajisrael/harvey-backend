import bcrypt from 'bcryptjs';
import db from '../utilities/db.js';
import { userTableName } from '../constants/tableNames.js';

const queryParams = 'id, name, email, isAdmin';

function createUserTable() {
  return db.run(
    `CREATE TABLE ${userTableName}( ` +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'name TEXT, ' +
      'email TEXT, ' +
      'password BLOB, ' +
      'isAdmin INTEGER, ' +
      'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ' +
      '); ',
    {}
  );
}

function deleteUserData() {
  return db.run(`DELETE FROM ${userTableName};`, {});
}

function getUserData() {
  const data = db.query(`SELECT ${queryParams} FROM ${userTableName}`, {});

  return {
    data,
  };
}

function getUserDataById(id) {
  const data = db.query(
    `SELECT ${queryParams} FROM ${userTableName} WHERE id = '${id} LIMIT 1'`,
    {}
  );

  return data[0];
}

function getUserDataByEmail(email) {
  const data = db.query(
    `SELECT ${queryParams} FROM ${userTableName} WHERE email = '${email}' LIMIT 1`,
    {}
  );

  return data[0];
}

function getPasswordByEmail(email) {
  const data = db.query(
    `SELECT password FROM ${userTableName} WHERE email = '${email}' LIMIT 1`,
    {}
  );

  return data[0];
}

function matchPassword(email, password) {
  return bcrypt.compare(getPasswordByEmail(email).password, password);
}

function saveUserData(userData) {
  const { name, email, password, isAdmin } = userData;

  const passwordHash = bcrypt.hashSync(password, 10);

  const result = db.run(
    `INSERT INTO ${userTableName} (name, email, password, isAdmin) VALUES (@name, @email, @passwordHash, @isAdmin)`,
    { name, email, passwordHash, isAdmin }
  );

  let message = 'Error in saving user data';
  if (result.changes) {
    message = 'User data saved successfully';
  }

  return { message };
}

function saveUserDataAndReturnUser(name, email, password, isAdmin = 0) {
  const userData = { name, email, password, isAdmin };
  saveUserData(userData);
  return userData;
}

function updateUserName(id, name) {
  const result = db.run(
    `UPDATE ${userTableName} SET name = ${name} WHERE id = '${id}';`,
    {}
  );
}

function updateUserEmail(id, email) {
  const result = db.run(
    `UPDATE ${userTableName} SET email = ${email} WHERE id = '${id}';`,
    {}
  );
}

function updateUserPassword(id, password) {
  const result = db.run(
    `UPDATE ${userTableName} SET password = ${password} WHERE id = '${id}';`,
    {}
  );
}

function updateUserIsAdmin(id, isAdmin) {
  const result = db.run(
    `UPDATE ${userTableName} SET isAdmin = ${isAdmin} WHERE id = '${id}';`,
    {}
  );
}

export {
  createUserTable,
  deleteUserData,
  getUserData,
  getUserDataById,
  getUserDataByEmail,
  matchPassword,
  saveUserData,
  saveUserDataAndReturnUser,
  updateUserEmail,
  updateUserIsAdmin,
  updateUserName,
  updateUserPassword,
};

// 1. Id const  2. Name  3. Email
// 1. Create a user 2. Read a user 3. Update a user 4. Delete a user

const fs = require("fs");
const chalk = require("chalk");
const { v4: uuidv4 } = require("uuid");
const getUsers = () => {
  return "users..";
};

const loadUsers = () => {
  //helper func to extract from JSON
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []; //in case we don't have yet the users.json
  }
};
saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJSON);
};

const addUser = (name, email) => {
  console.log("reach addUser");
  const users = loadUsers();
  const duplicated = users.find((usr) => /*usr.id === id && usr.email === email*/ usr.email === email);
  if (!duplicated) {
    users.push({
      id: uuidv4(),
      name: name,
      email: email,
    });
    saveUsers(users);
    console.log(chalk.inverse.red("user successfully  added"));
  } else {
    console.log(chalk.inverse.red("user already exist"));
  }
};

const removeUser = (id) => {
  const users = loadUsers();
  const newUsers = users.filter((usr) => {
    return usr.id !== id;
  });

  if (users.length === newUsers.length) {
    console.log(chalk.inverse.red("User not found"));
  } else {
    saveUsers(newUsers);
    console.log(chalk.inverse.green("User deleted"));
  }
};
const getUser = (id) => {
  const users = loadUsers();
  const userToGet = users.find((usr) => usr.id === id);
  if (!userToGet) {
    console.log(chalk.red("User not found"));
  } else {
    console.log(chalk.inverse.green("User Name: " + userToGet.name));
    console.log(chalk.inverse.green("User Email: " + userToGet.email));
  }
};

const updateUser = (id, name, email) => {
  const users = loadUsers();
  const userToUpdate = users.find((user) => user.id === id);
  if (!userToUpdate) {
    console.log(chalk.red("User not found"));
  } else {
    if (name) {
      userToUpdate.userName = name;
    }
    if (email) {
      userToUpdate.email = email;
    }
    saveUsers(users);
    console.log(chalk.inverse.green("User updated"));
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
  getUser,
  updateUser,
};

import { createConnection } from "mysql";
import fs from "fs";

let connection = createConnection({
  host: "localhost",
  user: "JavaScript",
  password: "akwasi0556446613",
  database: "JavaScriptDB",
});

function connectToDB() {
  connection.connect((err) => {
    if (err) {
      console.error(`Couldn't connect to DB, error: ${err}`);
    } else console.log(`Connected successfully`);
  });
}

function insertIntoDB() {
  connection.query(
    "INSERT INTO EMPLOYEE (Name, Sex) VALUES ('Vivian Akuoko', 'F'), ('Yaw Akuoko', 'M')",
    (err, results) => {
      if (err) {
        console.error(`Couldn't insert values into DB, error: ${err}`);
      } else {
        console.log(`Values inserted successfully, results: ${results}`);
      }
    }
  );
}

function queryResultsAndStore() {
  connection.query("SELECT * FROM EMPLOYEE", (err, results) => {
    if (err) {
      console.error(`Couldn't query results, error: ${err}`);
    } else {
      let employees = JSON.stringify(results);
      employees = JSON.parse(employees);
      for (const keys in employees) {
        console.log(keys, employees[keys]);
      }
      employees = JSON.stringify(employees, null, 2);
      fs.writeFile("employees-1.json", employees, (err) => {
        if (err) throw err;
        else console.log("File written successfully");
      });
    }
  });
}

function closeDB() {
  connection.end((err) => {
    if (err) {
      console.error(`Connection not closed, error: ${err}`);
    } else {
      console.log(`DB disconnected successfully`);
    }
  });
}

connectToDB();
// insertIntoDB();
queryResultsAndStore();
closeDB();

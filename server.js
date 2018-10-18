// 数据迁移
const mongodb = require('mongodb');
const customers = require('./customer-data.json');
const customerAddresses= require('./customer-address-db.json');
const async = require('async');
const url = 'mongodb://localhost:27017/customer-db';

let tasks = [];
const limit = parseInt(process.argv[2], 10) || 1000;
mongodb.MongoClient.connect(url, {
      useNewUrlParser: true
    }, function (error, db) {
  if (error) {
    return process.exit(1);
  }
  const dataBase = db.db('customer-address-db');
  customers.forEach((customer, index, list) => {
    customers[index] = Object.assign(customer, customerAddresses[index]);
    if (index % limit == 0) {
      const start = index;
      const end = (start + limit > customers.length) ? customers.length - 1 : start +limit;
      tasks.push((done) => {
        dataBase.collection('customers').insert(customers.slice(start, end), (error, results) => {
          done(error, results);
        });
      });
    }
  });
  
  console.log(`Launching ${tasks.length} paraller task(s)`);
  const startTime = Date.now();
  async.parallel(tasks, (error, results) => {
    if (error) {
      console.error(error);
    }
    const endTime = Date.now();
    console.log(`Execution time: ${endTime - startTime}`);;
    console.log(results);
    
  });
})
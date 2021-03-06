/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Problem from '../api/problem/problem.model';
import User from '../api/user/user.model';

Problem.find({}).removeAsync()
  .then(() => {
    Problem.create({
      name: 'Fizzbuzz',
      info: 'Write a function called fizzbuzz that accepts a single argument n. fizzbuzz should return "Fizz" if n is a multiple of 3, "Buzz" if n is a multiple of 5, “FizzBuzz” if n is a multiple of both 3 and 5, and n if n is a multiple of neither 3 nor 5.'
    }, {
      name: 'Even Fibonacci',
      info: 'Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ... By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.'
    }, {
      name: 'Smallest Multiple',
      info: '2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder. What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

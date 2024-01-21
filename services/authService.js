const Auth = require(`../models/auth`);
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const cookie = require('cookie-parser');

app.use(cookie());


class AuthService {

  // this async create function with await so it will wait for the response and then it invoke create().........

  //Registration services.................................................................................................
  async create(req, res) {
    try {
      const { username, password, role, auth } = req.body;                          //fetch the user details
      const encryptedPassword = await bcrypt.hash(password, 10);        //encrypting
      const user = await Auth.findOne({ username }                      //validateif already exist or not 
      );
      if (user) {
        res.status(404).send('USER ALREADY EXIST');
      }
      // Create token
      const token = await jwt.sign({ userid: Auth.username, role: Auth.role }, process.env.ACCESS_TOKEN, { expiresIn: "2h" }, (err, token) => {
        console.log({ token });
      }
      );

      // save user token
      Auth.token = token;

      //Encrypt user password
      return await Auth.create({
        username: username, password: encryptedPassword, role: role ,auth: auth
      });

    } catch (error) {
      throw error;
    }
  }

  //Login API Service..................................................................................
  async validate(req, res) {

    const { username, password } = req.body;
    const user = await Auth.findOne({ username });
    const userRole = user.role;

    if (!user) { res.status(404).send('USER NOT FOUND'); }

    else if (user && (await bcrypt.compare(password, user.password))) {
      if (userRole === 'admin') {
        console.log("YOU HAVE ADMIN ACCESS");

        //ADMIN access token
        const privatekey = process.env.ACCESS_TOKEN;
        const token = jwt.sign(
          { userid: user.username, role: user.role , auth :user.auth }, privatekey, { expiresIn: "2h" },
        );
        user.token = token;

        //ADMIN refresh token...........
        const refreshToken = jwt.sign({
          userid: user.username,
          role: user.role
        },
          process.env.REFRESH_TOKEN,
          { expiresIn: "1d" });

        //setting cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        console.log("Admin Refresh Token :");
        console.log({ refreshToken });
        res.status(201).json({ user });

      }
      else if (userRole === 'guest') {

        //normal token
        const privatekey2 = process.env.ACCESS_TOKEN;
        const token = jwt.sign(
          { userid: user.username,  role: user.role , auth :user.auth }, privatekey2, { expiresIn: "2h" },
        );
        user.token = token;

        //refresh token...........
        const refreshToken2 = jwt.sign({
          userid: user.username,
          role: user.role
        },
          process.env.REFRESH_TOKEN,
          { expiresIn: "1d" });

        //setting cookie
        res.cookie('jwt', refreshToken2, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        console.log("Guest Refresh Token :");
        console.log({ refreshToken2 });
        res.status(201).json({ user });


      }
      else {
        res.status(404).json("USER MUST ENTER CORRECT AUTHORITY LEVEL");
      }


    }
    else { res.status(400).send("Invalid Password"); }


  }

  //refresh api

  async refresh(req, res) {

    const fetchToken = req.cookies.jwt;
    console.log(fetchToken);
    jwt.verify(fetchToken, process.env.REFRESH_TOKEN, (err, decoded) => {

      if (err) {

        res.status(406).json({ message: "invalid refresh token" });

      }
      //new access token genarated...
      else {
        const accessToken = jwt.sign({
          user: Auth.username
        }, process.env.ACCESS_TOKEN, {
          expiresIn: '2h'
        });
        res.status(200).json({ accessToken });
      };
    })

  }
  catch(err) {
    throw err;
  };

  //this is for getting all the entry [find() method].....
  async findAll() {
    try {
      return await Auth.find();
    } catch (error) {
      console.log("Im in 12357890");
      throw error;
    }
  }

  //mongoose have findOne() to fetch the details from the Database from the defined parameter like find a certain using name or country etc......
  //in findOne we pass the argument in curly bracks as a object as a search parameter...using which the mongoose provide with that particular detail.....
  async findOne({ username }) {
    try {
      return await Auth.findOne({ username });
    } catch (error) {
      console.log("Im in 12357890");
      throw error;
    }
  }
}

module.exports = new AuthService();



/**
 *  //access token
      const privatekey = process.env.ACCESS_TOKEN;
      const token = jwt.sign(
        { userid: user.username , role: user.role }, privatekey, { expiresIn: "2h" },
      );
      user.token = token;

      //refresh token...........
      const refreshToken = jwt.sign({
        userid: user.username,
        role: user.role
      },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" });

      //setting cookie
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      console.log("Refresh Token :");
      console.log({ refreshToken });
      res.status(201).json({ user });
 */

const express = require('express');
const axios = require('axios')
var cors = require('cors');
require('console-stamp')(console, '[HH:MM:ss.l]');
const app = express();

// Alert and Notification scheduler requirements
const startScheduler = require('./scheduler/control/start-scheduler')
const getAllDistinctAlertLocations = require('./scheduler/jobs/cipher-chef-remote/getAllDistinctAlertLocations');
const { getAllScheduledNotifications } = require('./scheduler/jobs/cipher-chef-remote/getAllScheduledNotifications');
const pingGetWeatherAlerts = require('./scheduler/jobs/data-service-remote/pingGetWeatherAlerts');


// In production change to no arguments 
// Alert scheduler
startScheduler(getAllDistinctAlertLocations, pingGetWeatherAlerts, axios, 60);

// Notification scheduler
// startScheduler();

// Middleware
app.use(express.json());
// app.use(express.static('public'));
app.use(cors({origin: 'http://localhost:5173'}))


// Routes
app.get('/', (req, res) => {
  res.send('Notify Nexus');
});

app.post('/post/deviceId', (req, res) => {
  let deviceId = req.body.deviceId;
  console.log(`The device id ${deviceId} successfully subscribed to an alert`);
  res.status(200).send('OK');
})

app.post('/post/notification-preferences', (req, res) => {
  let deviceId = req.body.deviceId;
  let schedule = req.body.schedule;
  console.log(`The device id ${deviceId} successfully subscribed to weather notification every ${schedule}`);
  res.status(200).send('OK');

})

// TO-DO In production change to no arguments 
// startScheduler();

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Notify Nexus Server started on port ${port}`);
});


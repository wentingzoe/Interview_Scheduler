# Interview Scheduler

Interview Scheduler is a simple application for arranging interviews. Lighthouse Labs provided the back-end, and we created the web app intending to learn React.

By clicking on an empty timeslot, students can book an appointment with a mentor. They can then enter their name and choose a mentor from those available that day. Appointments can be scheduled for different days and times during the week and edited or deleted.

This app was deployed online through Heroku, CircleCI and Netlify. 

## Essential Key points
The following were the main conclusions from creating a react app with create-react-app and using a variety of testing libraries:

* Passing props and hooks to React component (useState, useEffect, useReducer).
* Using custom hooks to render components and construct controlled forms while managing state.
* Web sockets and Axios requests (not in production — branch: stretch/WebSockets)
* Immutable patterns, conditional rendering, and DOM event management are all considered.
* Storybook (components), Jest (unit, integration), and Cypress are all used for testing (End to End).

## Final Product 
### Add, edit and delete an appointment 
![Functionality]()

### Save and delete an appointment - error messages 
![]()

### Sidebar : selected-day, full-appointments, change-day
![]()

### Websockets
![]()

## Getting Started
* Install dependencies with `npm install`.
* Running Webpack Development Server(`npm start`)
* Running Jest Test Framework (`npm test`)
* Running Storybook Visual Testbed (`npm run storybook`)


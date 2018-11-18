<p align="center">
<img src="https://user-images.githubusercontent.com/5693916/30330868-8071b3da-97d6-11e7-8207-99243d19f1fe.png" data-canonical-src="https://user-images.githubusercontent.com/5693916/30330868-8071b3da-97d6-11e7-8207-99243d19f1fe.png" width="100" height="100" />
<img src="https://user-images.githubusercontent.com/5693916/30366646-10dc3b30-986c-11e7-871a-4f5c237b9a6f.png" data-canonical-src="https://user-images.githubusercontent.com/5693916/30366646-10dc3b30-986c-11e7-871a-4f5c237b9a6f.png" width="100" height="100" />
</p>

## Assignment
hosted version: https://chama-to-do-e0da6.firebaseapp.com

### How to run
1. fullfil the config/dev.js with your firebase credentials
2. yarn && yarn start

### Process
#### UI
1. The project was bootstrapped with create-react-app && and http://todomvc.com/ was used as a starting point.
2. Material Design concepts were used to build the interface.
#### Performance
3. The brand new React.lazy and React.Suspense were used for coding splitting, turn on 3g mode on dev tool to check it out!
4. The new React.memo was used for performance boost, React.PureComponent as well.
#### Engineering
5. Although I found Redux unnecessary for this small project, it was used to connect to firebase using redux-thunk
6. React context API was used to pass the user info through the components chain.
#### Usability
7. My goal was to keep the to-do app simple despite all the requirements: due time, priority selection, delete button, due time indicator. For this reason I used Expansion Panels.
8. To edit you can double click on a to-do task.
9. The Icon in the left-hand side of the input "What needs to be done?" is for sort/unsort by priority.

### Improvements
- Instead of passing the user id to every action call, it'd be better to keep it saved in the redux store or/and localStorage.
- The setInterval in the TaskProgress component could lead to some performance issues if there's too much to-dos, it'd probably be better to track it once per minute instead of once per second. But it would require to manually call the update function every time the user change the due date, to keep the "Time left" always up-to-date.

### Must have
- [x] Sign-in/Sign-out functionality using [Firebase Auth](https://firebase.google.com/docs/auth/);
- [x] Use **[Firebase Realtime Database](https://firebase.google.com/docs/database/)** and **Redux** to keep all the TO-DO's;
- [x] Host your working app on the *[Firebase Hosting environment](https://firebase.google.com/docs/hosting/)*;
- [x] Assign priority to a TO-DO and sort them by **highest to lowest priority**;
- [x] Set a due time. Add real-time visual and auditive hints to the TO-DO item that indicate that the due time is near and has passed;
- [x] Work on Chrome.

### Nice to have
- [x] Responsive (Mobile and Web);
- [x] Cross-browser support;
- [ ] Tests (Unit and/or Acceptance);
- [x] UI following [Material Design concepts](https://material.io/)

## Assignment Description

### Goal
The goal of this assignment is to have the candidate work with the same tools that are used in every-day Chama web development, so we can learn how one would perform while solving common development tasks that we have.

### Description
For this assignment, you are supposed to build a **to-do list** with the ability to add, complete and edit some TO-DO task.

### Stack
At Chama, our frontend stack consists of [React](https://facebook.github.io/react/docs/hello-world.html) + [Redux](http://redux.js.org/) :heart:, therefore it's required that the same stack is used in this assignment. Complementary libraries are free to use (e.g. lodash).

### Firebase
Chama relies on [Firebase](https://firebase.google.com/) to give our dealers a real-time experience. Because of this, we require that some features of Firebase are used in this assignment. There is a free-plan (default) that supports the requirements of this assignment (Hosting, Auth and real-time Database) and you should be able to start creating a project with your own Google account.

### Must have
- [x] Sign-in/Sign-out functionality using [Firebase Auth](https://firebase.google.com/docs/auth/);
- [x] Use **[Firebase Realtime Database](https://firebase.google.com/docs/database/)** and **Redux** to keep all the TO-DO's;
- [x] Host your working app on the *[Firebase Hosting environment](https://firebase.google.com/docs/hosting/)*;
- [x] Assign priority to a TO-DO and sort them by **highest to lowest priority**;
- [x] Set a due time. Add real-time visual and auditive hints to the TO-DO item that indicate that the due time is near and has passed;
- [x] Work on Chrome.

### Nice to have
- [x] Responsive (Mobile and Web);
- [x] Cross-browser support;
- [ ] Tests (Unit and/or Acceptance);
- [x] UI following [Material Design concepts](https://material.io/)

## Hints
* You don't need to spend time creating a dev/build environment, using [react-create-app](https://github.com/facebookincubator/create-react-app) (and other alike tools) is totally ok!
* Never done anything with Firebase? You can follow [this guide](https://firebase.google.com/docs/web/setup) and it should give you a nice starting point.
* If you wish to spend less time writing boilerplate code, go to http://todomvc.com/, on this website, you will find many sample implementations of the same TO-DO application, every time using a different framework. You can choose the [React](http://todomvc.com/examples/react/#/) implementation as a starting point. It's OK to use the same styling as the original application.
* Don't need to re-invent the wheel, for components like Datepickers and/or Timepicker you can use [Material-ui](https://github.com/callemall/material-ui) or any other of your choice, it has great integration with React environments.

## Instructions
Create a new repo into your favorite git platform (github, bitbucket, etc), copy this README into it. You're free to edit it, though it should preserve the must-have functionalities and stack.

**After you finished, you can share the repository URL with us (preference) or just send us a .zip containing the source code.**

When you're done, share your repositoy's and Firebase hosting's URL.

## Review

After you delivered the completed assignment to us, we will review it as soon as we can, generally within 3 days. **We pay special attention to:**

* Coding skills
   * Writing testable code	
   * Whether you use Redux, React, HTML and CSS properly
* Software Engineering Skills
   * Code organization (modularity, dependencies between modules, naming, etc)
* Overall Feeling
   * Software usability
   * Assignment completion
   * Overall code quality (edge cases, usage of tools, performance, best practices)
   
## Presentation

If we like what we see, we'll invite you to present your solution! We have a big screen for you to present on. Don't forget your laptop!

## That's it!

Happy coding! :metal:

<img src="https://user-images.githubusercontent.com/5693916/30273942-84252588-96fb-11e7-9420-5516b92cb1f7.gif" data-canonical-src="https://user-images.githubusercontent.com/5693916/30273942-84252588-96fb-11e7-9420-5516b92cb1f7.gif" width="150" height="150" />

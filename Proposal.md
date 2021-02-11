# Easy Recommendation
#### Prepared by: Team EasyRec

#### Team Members:
__Henry Eigen, Jovan Hernandez, Ria Patel, Ross Ketron__

---

## Introduction

This project implements a web application that will allow a user easy access to recommendation letters from professors and colleagues. 

The motivation for this project comes from personal experiences amongst the team members. As we apply for various positions and internships, it is a necessity to ask professors and other professionals to write letters of recommendations for us. 

These letters might not seem very cumbersome, however, these professors receive numerous requests from students (sometimes one student may require several letters from a single source). 

This application aims to eliminate the redundancy and repetition associated with the reference portion of applications and provides a space where recommendation letters can be stored for future use. 

---

## Customer Value and Proposed Solution

We expect the primary users of this application to be current students and early career professionals, as these individuals tend to apply to a plethora of openings to have a greater chance of landing a position or internship.

EasyRec serves to eliminate the repetitiveness and redundancy of requesting several letters of recommendation from a single source. This will benefit both the applicant and the referrer. The applicant will have peace of mind knowing that they can apply without hesitation or worry of bothering their references, and the referrer will benefit in that only one letter of recommendation will be requested. 

The hiring agent should have no change when dealing with EasyRec recommendation letters. They will receive an email (much like receiving the letter itself) which will allow access to view the letter of recommendation on the EasyRec web page.

EasyRec aims to provide a user friendly system that enables an applicant to easily request and submit letters of recommendation. In doing so, EasyRec provides benefits to both the applicant and the referrer. 

The success of EasyRec will be measured by the number of user accounts associated with the web application as well as the number of api requests processed for viewing and/or submitting letters of recommendation.

---

## Technology

EasyRec will consist of a backend api used to process requests and posts. Leveraging this backend, a frontend will display our user interface and information to the webpage. The backend api will be connected to a database which will store user information and the letters of recommendation. 

Users will be able to create an account, request references, view letters uploaded by referrers, and send letters to potential employers. The frontend of EasyRec will serve to give a simple, elegant user interface. 
The site will have a home page, login page, and a user profile page which will display the user’s available letters and allow users to send letters via an api key which will give the recipient viewing access.

ReactJS framework will be used to implement the frontend of EasyRec, and Python Django framework will be used to implement the backend and api of the application. Both of these technologies have documentation and many online sources for reference. There are several modules that can be used along with React to effectively abstract some of the development process for the frontend (material-ui, etc.). 

We consider a minimal viable system of EasyRec to be one that allows a user to create an account, request a reference letter, upload a reference letter, and submit a reference letter. 

Several safety and security steps should be taken in the final production to ensure that letters of recommendation are from reliable sources and are unmodified. Other possible enhancements include options for writing letters ‘in-app’ and a mobile friendly version of the app. 

---

## Team

A couple of members of the team have built applications before using Django, Javascript, React, and/or Node.js. To certain members on the team, these frameworks are new, and this will be a perfect learning opportunity. 

The team will be split into front-end and back-end development, which will require no rotations from the team members. One member will act as a project manager as well as perform necessary tasks required by their team. Our team members are presented below:

>##### _Back-end Development_:
>
>___Henry Eigen___
>* Roles: Collaborate on Django framework
>* Skills: Python, Django
>
>___Ria Patel___
>* Roles: Project Manager, Collaborate on Django framework, Assist with mock ups
>* Skills: Java, Javascript, Python 
>
>##### _Front-end Development_:
>___Ross Ketron___
>* Roles: Assist with mock ups, collaborate on React components
>* Skills: HTML, CSS, Javascript, React
>
>___Jovan Hernandez___
>* Roles: Assist with mockups, collaborate on React components 
>* Skills: HTML, CSS, JavaScript,  React

---

## Project Management

This project is expected to be completed by the assigned due date of April 15th, 2021. The team will be meeting weekly on Fridays to update the others with the progress made throughout the week. Individual teams, front-end and back-end, will meet multiple times a week as needed, to discuss what needs to be done and assist each other if necessary. 

Tentative Schedule Below:

| Date | Task |
---|---
| 2/11 | Write and present preliminary project proposal |
| 2/18 | Submit project proposal. Complete making mock ups of the application for the front-end. Review tutorials on React and Django frameworks |
| 3/4 | Design and implement a demo of the interface. Completion of login page. Submit iteration 1 status report
| 3/18 | Database and file server. Completion of candidate account and recommender account. Submit iteration 2 status report |
| 4/1 | API completion. Completion of API use page. User authentication and file permissions. Submit iteration 3 status report |
| 4/15 | Complete project implementation. Write project report and present finished project |


As a service, we have an ethical obligation to recommenders to ensure that their letters cannot be read by the candidates, and also to the recipients to ensure that letters received are unmodified from the letters’ upload time. 

External data is not necessary for the application development. 

In the case that the application runs into issues near the final project deadline, the application itself will have basic functionality that will demonstrate the core concept. 

For example, if our verification and authentication systems fail, we will still have the core functionality of the application itself, so the ability to let users log in as well as upload letters. If back-end operations fail, we will still have the front-end fully functioning.

If front-end operations fail, we will make sure that we have basic back-end functionality. Since our application is a service, we know that external data is not necessary for the application to function, which is one issue off of the list. 

With these plans in place, depending on which situation occurs in reality, we will be prepared to make the necessary changes in order to meet project deadlines. 

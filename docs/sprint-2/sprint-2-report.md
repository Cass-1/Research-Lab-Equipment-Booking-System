# Sprint 2 Report 
[Our Sprint Video Link](https://drive.google.com/file/d/1odn3n03QYtQvgvxvFvT9MHApeJ9u7WjH/view?usp=sharing)
## What's New (User Facing)
 * RBAC
    - there is now a distinction between different types of users: ADMIN, LAB_MANAGER, TEACHER, USER
    - pages are restricted by these roles
 * Lab Manager Frontend
    - lab managers can now do the following
      1. create lab sections
      2. delete lab sections
      3. modify lab sections
      4. add users to their lab sections
      5. add equipment to their lab sections
      6. users can see the available equipment in the lab sections they are in
  * User frontend
    - can see the lab sections they are added to
    - can see the equipment available in these lab sections

## Work Summary (Developer Facing)
This sprint primarily focused on getting RBAC implemented and starting to create the systems for lab sections. Originally we planned to implement equipment booking this spritn but we realized that it was a larger endeavor than expected so we decided pretty early on to move it to sprint 3.
  * Prisma setup complete
  * Backend api routes for database queries
  * Full deployment (auth works on deployed application now)
    - [deployment link](https://research-lab-equipment-booking-system.vercel.app/)

## Unfinished Work
  - We finished all of our expected tasks. For the next sprint we need to add ability for admins to update user roles as well as setup the booking system, analytics, and saving/exporting data.
  - There are some minor bugs that came up that will be resolved in sprint 3

## Completed Issues/User Stories
### Pull Requests
Here are the major PR's
  * [merges in the rbac branch](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/pull/49)
  * [UI lab and equipment](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/pull/58)
### Issues
Here are links to the issues that we completed in this sprint:
 * [learn react, html, and css](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/10)
 * [Learn nextjs](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/31)
 * [Equipment View](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/11)
 * [Inventory Management](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/15)
 * [RBAC](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/41)
 * [Sprint 2 Video](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/55)
 * [Lab Manager can create/delete labs](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/51)
 * [Lab Manager can add/remove users](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/52)
 * [Update Prisma config to have correct tables](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/47)
 * [Sprint 2 Retrospective Meeting](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/56)
 * [Add Role Schema to Prisma](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/48)
 * [setup user landing pages](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/8)
 * [Sprint 2 Review Meeting](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/57)
 * [Prisma Integration](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/46)
 * [add loading indicator when signing in](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/42)
 * [get nextauth working in deployment](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/36)
 * [Full Deployment](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/13)
 
 ## Incomplete Issues/User Stories
 Here are links to bugs that occurred during this sprint that we are going to address in sprint 3:
 * [Can't change user's role when adding to lab](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/60)
 * [remove admin from being able to see lab-manager and teacher routes](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/44)
 * [Prisma Schema Cleanup & neccessary refactoring](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/59)
 * [Card Display Error](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/61)

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * 
 
## Retrospective Summary
Here's what went well:
  * Frontend development went really smoothly, we were able to make a ton of progress and are almost complete with all of the operations that can be done for the lab manager
  * RBAC deployment and prisma integration took a bit of work but is not functioning smoothly
 
Here's what we'd like to improve:
  * Nothing really, this sprint went better than expected
  
Here are changes we plan to implement in the next sprint:
   * We are both going to work on frontend, this sprint Cass worked on the authentication, prisma setup, production deployment and some routing stuff while Aayush worked on the frontend and the backend api routes

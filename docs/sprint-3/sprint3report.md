# Sprint 3 Report 
[Our Sprint Video Link](https://drive.google.com/file/d/15tJIK9d5U4nGrLu30A_SyIiqEpjjRDip/view?usp=sharing)
## What's New (User Facing)
 * Admin View -- can now view all labs
 * Admins can now manage user roles when adding them to a lab
 * Admins can now manage equipment for specific labs
 * Users can now book an equipment for a specific time slot
 * Admins can now view and manage bookings
 * Users can now Sign in with Google using their email.

## Work Summary (Developer Facing)
This sprint primarily focused on implementing the booking system and its management component, as well as logging the equipment reservation data for usage analytics. 
  * Users can send a request to reserve an equipment
  * Equipment Usage is logged automatically when a change is made by an admin to the reservation status.
  * Full deployment
    - [deployment link](https://research-lab-equipment-booking-system.vercel.app/)

## Unfinished Work
  - We need to implement a dashboard to display the usage analytics on the app, and give the option for users to export the data from the app instead of having them do it through the database.

## Completed Issues/User Stories

### Issues
Here are links to the issues that we completed in this sprint:
 * [cannot delete lab member](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/65)
 * [google for auth](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/64)
 * [usage analytics](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/17)
 * [export booking data](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/18)
 * [remove admin from being able to see lab manager routes](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/44)
 * [prisma clean up](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/59)
 * [Booking system](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/16)
 * [time-slot validation](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/19)
 * [cleanup manager routes](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/63)
 * [security practices](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/45)
 * [be able to change user role](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/60)
 * 
 
 ## Incomplete Issues/User Stories
 Here are links to bugs that occurred during this sprint that we are going to address in sprint 3:
 * 

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
- app/api/equipment/route.ts
- app/api/labs/[labId]/members/route.ts
- app/api/labs/[labId]/members/[userID]/route.ts
- app/api/labs/[labId]/route.ts
- app/api/labs/route.ts
- app/_components/lab-card.tsx
- app/_components/lab-delete-page.tsx
- app/_components/lab-edit-page.tsx
- app/_components/lab-manage-page.tsx
- app/_components/Navbar.tsx
- app/dashboard/admin/equipment/[labId]/add/page.tsx
- app/dashboard/admin/equipment/[labId]/delete/page.tsx
- app/dashboard/admin/equipment/[labId]/edit/page.tsx
- app/dashboard/admin/equipment/[labId]/page.tsx
- app/dashboard/admin/equipment/page.tsx
- app/dashboard/admin/labs/create/page.tsx
- app/dashboard/admin/labs/[labId]/delete/page.tsx
- app/dashboard/admin/labs/[labId]/edit/page.tsx
- app/dashboard/admin/labs/[labId]/manage/page.tsx
- app/dashboard/admin/labs/[labId]/page.tsx
- app/dashboard/admin/labs/page.tsx
- app/dashboard/admin/page.tsx
- app/_server-actions/create-reservation.tsx
- app/_server-actions/find-reservation.tsx
- app/_server-actions/get-reservation.tsx
- app/_server-actions/get-registration.tsx
- app/_server-actions/set-reservation-status.tsx
- app/_server-actions/update-reservation-status.tsx
- app/dashboard/page.tsx
- app/lab/[labId]/page.tsx
- docs/Sprint2Retrospective Report.pdf
- makeAdmin.ts
- next.config.ts
- package.json
- package-lock.json
- prisma/schema.prisma
- docs/planning-docs/Database Project Partial Report Submission.pdf
- docs/planning-docs/Milestone 2(1).pdf
- docs/sprint-1/sprint-1-report.md
- docs/sprint-1/sprint1Retrospective Report.pdf
- docs/sprint-2/sprint-2-report.md
- 
- 
 
## Retrospective Summary
Here's what went well:
  * We were able to meet all our expected work for this sprint.
 
Here's what we'd like to improve:
  * Nothing really, this sprint went better than expected

# Sprint x Report 
Video Link: https://drive.google.com/file/d/1fCdSNDmG8H6saWAAHPf06Tu6uxLOgUQd/view?usp=sharing
## What's New (User Facing)
 * Website landing page
 * Website login page
 * Dashboard page with navatation
 * Sign out option
 * Authentication using GitHub
 * Have to login before accessing other pages
 * Deployment using vercel
 * Database integrated with deployment and develompment (Neon PostGress)

## Work Summary (Developer Facing)
There was a lot of learning this sprint. Cass had never used HTML, CSS, or React. So they spent a bunch of time learning that. Additionally, neither of us had used Next.js before so we both had to spend time learning the framework. We also setup a webpage with authentication and Aayush setup our database schema on Neon. We also created a Vercel account so that we could deploy our webapp. We also did some figma desings.

## Unfinished Work
We still have some learning to do. Cass needs some more time to get comfortable with CSS (specifically Tailwind) and we both need more time getting used to the Next.js way of handling server side components. Additionally, Cass still needs some more time to get used to React state. We also need to implement authorization to prevent certain users from accessing certain webpages. There is also a bug where authentication only works on localhost and not in the development environment.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/38
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/37
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/34
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/32
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/30
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/28
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/27
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/26
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/25
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/24
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/23
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/22
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/21
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/20
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/14
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/9
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/7
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/3
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/2
 * https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/1
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * [this will be done in sprint 2, ran into an issue where the secrets need to be setup for both localhost and the production environment.](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/36)
 * [Nextjs is quite complicated and Cass needs a bit more time to fully understand the framework](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/31)
 * [Due to authentication taking longer than expecred authorization was unable to be implemented in sprint 1](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/8) 
 * [Cass needs some more time with CSS](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/issues/10)

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * [.devcontainerDockerfile](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/.devcontainer/Dockerfile)
 * [.devcontainer/devcontainer.json](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/.devcontainer/devcontainer.json)
 * [.github/workflows/preview.yaml](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/.github/workflows/preview.yaml)
 * [.gitignore](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/.gitignore)
 * [README.md](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/README.md)
 * [app/(root)/error.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/(root)/error.tsx)
 * [app/(root)/loading.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/(root)/loading.tsx)
 * [app/(root)/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/(root)/page.tsx)
 * [app/api/auth/[...nextauth]/route.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/api/auth/[...nextauth]/route.ts)
 * [app/api/test/route.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/api/test/route.ts)
 * [app/dashboard/invoices/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/dashboard/invoices/page.tsx)
 * [app/dashboard/layout.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/dashboard/layout.tsx)
 * [app/dashboard/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/dashboard/page.tsx)
 * [app/dashboard/users/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/dashboard/users/page.tsx)
 * [app/favicon.ico](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/favicon.ico)
 * [app/globals.css](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/globals.css)
 * [app/layout.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/layout.tsx)
 * [app/login/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/login/page.tsx)
 * [app/user/[userId]/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/user/[userId]/page.tsx)
 * [app/user/lost/page.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/app/user/lost/page.tsx)
 * [auth.config.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/auth.config.ts)
 * [auth.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/auth.ts)
 * [components/Navbar.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/components/Navbar.tsx)
 * [components/button.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/components/button.tsx)
 * [components/login-form.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/components/login-form.tsx)
 * [components/nav-links.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/components/nav-links.tsx)
 * [components/sidenav.tsx](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/components/sidenav.tsx)
 * [docs/Database Project Partial Report Submission.pdf](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/docs/Database%20Project%20Partial%20Report%20Submission.pdf)
 * [docs/Milestone 2(1).pdf](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/docs/Milestone%202(1).pdf)
 * [docs/sprint_report_template.md](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/docs/sprint_report_template.md)
 * [eslint.config.mjs](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/eslint.config.mjs)
 * [middleware.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/middleware.ts)
 * [next.config.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/next.config.ts)
 * [package-lock.json](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/package-lock.json)
 * [package.json](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/package.json)
 * [postcss.config.mjs](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/postcss.config.mjs)
 * [public/file.svg](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/public/file.svg)
 * [public/globe.svg](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/public/globe.svg)
 * [public/lab-svgrepo-com.svg](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/public/lab-svgrepo-com.svg)
 * [public/next.svg](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/public/next.svg)
 * [public/vercel.svg](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/public/vercel.svg)
 * [public/window.svg](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/public/window.svg)
 * [tailwind.config.ts](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/tailwind.config.ts)
 * [tsconfig.json](https://github.com/Cass-1/Research-Lab-Equipment-Booking-System/blob/main/tsconfig.json)
 
## Retrospective Summary
Here's what went well:
  * Getting used to the new technology went pretty well especially because so much of the technology was new to us
  * Getting deployment almost fully working with authentication and a database
  * Getting a basic webpage functional
 
Here's what we'd like to improve:
  * We would like to get to more coding and adding new features now that we have actually learned the framework and the languages used
  * More co-development on frontend
  * Cleaner use of TailwindCSS
  
Here are changes we plan to implement in the next sprint:
   * Having proper landing pages for each user and display all the equipment using cards
   * allow users to select equipment and add/remove equipment
   * Using a react component library to reduce the time spent making stuff look nice and allowing for a standard look in the application
   * have username and password authentication rather than just GitHub OAuth

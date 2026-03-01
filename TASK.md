# Binge&Tag - Take-Home Assignment

## Welcome, Alexandar!

We truly enjoyed our conversation, and we appreciate you taking the time to complete this take-home assignment. This task is designed to give you an opportunity to showcase your skills in a more relaxed environment.

We understand that it's the weekend, and we want to be respectful of your time. This assignment is designed to be focused and achievable within a reasonable timeframe (e.g., a few hours). Please prioritize clarity, code quality, and a thoughtful approach over implementing every possible edge case.
**Disclaimer:** To ensure a fair and accurate assessment of your individual skills, the use of AI assistants (such as ChatGPT, Gemini, Copilot, Claude Code, etc.) is strictly prohibited for this assignment.

## Project Overview

You've been provided with a starter "Binge&Tag" application, which is a simplified Netflix-like interface built with React, Vite, TypeScript, and `shadcn/ui` (leveraging Tailwind CSS and Radix UI components). Currently, the home page is largely static, and most interactions are not yet implemented. Your goal is to bring some key functionalities to life and extend the application with new features.

## Your Tasks

Please implement the following features within the existing "Binge&Tag" application. Focus on clean code, good component architecture, and a user-friendly experience.

### Task 1: Home Page Interactivity (Hero Section Update)

Currently, the home page displays a hero section at the top and several carousels of movie cards below. When you click on a movie card, the hero section does not update.

**Goal:** Make the home page interactive.

**Core Requirements:**
When a user clicks on any movie card within any of the carousels, the main hero section at the top of the page should dynamically update to display the details of the clicked movie (background image, title, and a brief description to match the selected movie).

---

### Task 2: Login/Register Flow

The application currently doesn't have a functioning login button.

**Goal:** Implement a modal with two tabs - one for login and one for registration.

**Core Requirements:**

1.  **Login:** Since this is a front-end only task, a real login is not required, but you must implement a delay that simulates a communication with a server for authentication. A loading spinner/screen is a nice to have, but not a hard requirement

2.  **Registration:** The registration must contain the following fields - email, username, password, confirm password and date of birth. Any other additional fields are up to you. The password field must follow modern security practices like minimum 18 characters, at least one uppercase etc. A show/hide password functionality is a nice to have, but not a hard requirement.

---

### Task 3: Debounced Search Functionality

We want to add a robust and responsive search feature to "Binge&Tag".

**Goal:** Implement an intelligent search bar.

**Core Requirements:**

1.  **Search bar:** The search must only be visible to a logged in user and positioned in the application's header.

2.  **UI Integration:** Add a search icon or a visible search bar to the application's header. When activated (e.g., by clicking the icon, or always visible), it should reveal an input field.

3.  **Debounce Logic:** As the user types into the search input, trigger a search query to the TMDB API's after 0.5 seconds when:

    1.  the query is at least 3 characters long, OR
    2.  the user presses the Enter button manually, ignoring the size of the search query

4.  **Display Results:** Display a simple list of matching movie titles (and perhaps a small poster image) in a dropdown or overlay below the search bar. This list should update as new search results arrive.
5.  **Clear Input:** Provide a clear way for the user to clear the search input.

---

### Task 4: Movie Details Page (New Page Creation)

The application needs a dedicated page to show more in-depth information about a selected movie.
**Goal:** Create a new, routed page to display full movie details.

**Core Requirements:**

1.  **Routing:** Implement a new route, which will navigate to a dedicated "Movie Details" page.
2.  **Navigation:** When a user clicks a "More Info" button (or a similar call to action) on a movie card (or directly from the updated hero section), they should be navigated to this new `/movie/:id` page.
3.  **Data Fetching:** On the "Movie Details" page, fetch and display more comprehensive information about the movie using the TMDB API. This should include details such as, but not limited to, cast, director, a longer synopsis, genre, release date, and user ratings. The TMDB's API is quite comprehensive so the sky is the limit here.
4.  **Layout:** Design a clean and readable layout for this new page.

---

## General Guidelines

- **Code Quality:** Aim for readable and well-structured code.
- **Libraries:** You are welcome to use any additional libraries you deem appropriate (e.g., state management, routing, styling utilities), as long as you can justify their inclusion and demonstrate a clear understanding of how they work.
- **Error Handling:** The application must have at least basic error handling for API requests (e.g., displaying a message if a request fails).
- **README Update:** Feel free to update this `README.md` if you make any significant architectural decisions or want to highlight specific parts of your solution.

## Submission

The task has the following submission requirements:

- you must create a branch with the name `alexandar-drajev`
  - you can push the branch as soon as you receive access to the repository, but you can't start working on any of the tasks before February 28th, 00:00
- for your submission to count, you must open a pull request no later than March 1st, 23:59
- the pull request must have a description of what changes you've implemented
  - a full change log is a nice to have, but not a hard requirement

## Good luck, and have fun!

We're looking forward to seeing your solution.

## A few notes about my decisions

First of all, I want to thank you for the assignment - I enjoyed working on it.

It is a small application, but I tried to structure it in a way what would scale if the project grows. Here I want to highlight some decisions I made and why.

## State management

Normally, in a project of this size, I would use React Context + local useState for the authentication and keep things simple. However, I saw that in the job requirements, Redux was listed as a required skill. Because of that I decided to use Redux Toolkit for global auth state. In this case Redux is slightly overkill, but I wanted to demonstrate familiarity with it and to show how I would structure global state. If this were a real production application, probably Context would be enough.

## Folder structure

I slightly refactored the components structure into a feature-based, instead of keeping them in the flat component directory. My idea is:

- components/shared - reusable, generic UI components
- components/features - domain specific components
- components/layout - structural components
- components/ui (this was already there) - UI components

## TMDB

I refactored the functions written in tmdb.ts file so I can reuse the base URL. I made this in order to avoid repetition and to make adding new endpoints straightforward.

## Routing

I moved routes into a dedicated directory to separate routing configuration for better separation of concerns. The project uses React Router v6 which required usage of createBrowserRouter and RouterProvider. There is a known console warning related to future v7 behavior - StartTransition and relative splat paths. This is a known quirk of v6 and does not affect functionality. I've tried to workaround it in the src/router.ts. I intentionally did not upgrade the version to avoid upgrading dependencies during the task. Upgrading to react router v7 would remove the warning.

## Search implementation

I implemented a small custom useDebounce hook instead of using a library like lodash for example. It keeps the callback stable using refs and cleans up pending timeouts on unmount.

To prevent race conditions when users type quickly, I used AbortController. When a new search starts, the previous request is aborted. An alternative approach would be to track request IDs or something like Promise.race and ignore outdated responses. However those approaches does not actually cancel the network request - they only ignore the results.

The search overlay content uses a small useIntersectionObserver hook. This allows content to load only when it becomes visible in the viewport. The hook supports configurable options like root, threshold, once and can be reused.

For handling outside clicks on the search overlay I implemented useComponentVisible hook. It attaches a mousedown listener only when the component is visib;e and closes the overlay when clicking outside of it

## Styling

Browser autofill styles were overriding my input background, so I added a small override in the index.css file to keep autofill inputs consistent with the theme variables.

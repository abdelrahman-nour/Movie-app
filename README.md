# Movie App

## About The Project

Movie App is a web application that allows users to browse movies and TV shows, view details, search for titles, and add their favorite movies and TV shows to a personal watchlist.

The application uses the TMDB API to display movie and TV show information.

## Features

- Browse now-playing movies.
- Browse popular TV shows.
- View movie details.
- View TV show details.
- Display movie and TV show recommendations.
- Display movie and TV show reviews.
- Search for movies and TV shows.
- Add movies and TV shows to the watchlist.
- Remove movies and TV shows from the watchlist.
- Display the number of items in the watchlist.
- Support dark mode and light mode.
- Responsive design for different screen sizes.
- Pagination for browsing movies.
- AI Movie Assistant for movie and TV show recommendations.

## AI Movie Assistant

The application includes an AI Movie Assistant that helps users with:

- Movie recommendations.
- TV show recommendations.
- Similar movies and TV shows.
- Movie genres.
- Movie summaries.
- Actors and directors.
- Movie-related questions.

The AI Assistant is designed to answer questions related to movies and TV shows only.

## Technologies Used

- React.js
- Vite
- JavaScript
- React Router
- Tailwind CSS
- TMDB API
- Google Gemini API
- Lucide React
- React Markdown
- React Circular Progressbar

## APIs Used

### TMDB API

API Base URL:
[https://api.themoviedb.org/3]
Api Key = 4bc5948b7a983fa2e2b50818606ebbb3
The TMDB API is used to get:

- Now-playing movies.
- Popular TV shows.
- Movie details.
- TV show details.
- Movie recommendations.
- TV show recommendations.
- Movie reviews.
- TV show reviews.
- Search results.

### Google Gemini API

The Google Gemini API is used to power the AI Movie Assistant.

## Installation

Clone the repository:

```bash
git clone https://github.com/abdelrahman-nour/Movie-app.git
```

Move into the project folder:

```bash
cd Movie-app
```

Install the project dependencies:

```bash
npm install
```

## Environment Variables

Before running the project, create a `.env` file in the project root.

The `.env` file must be created in the same folder as the `package.json` file.

Add the required API keys inside the `.env` file:
VITE_GEMINI_API_KEY=AQ.Ab8RN6KyTNXIVsuyFaZQt_jS2WL6u2BP1KPr8wCgaGZ-51LkHA

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```
Replace the placeholder values with your own API keys.

After creating the `.env` file, run the project:

```bash
npm run dev
```

> Do not share your API keys or upload the `.env` file to GitHub.

## Project Team

### Abdelrahman Nour
- Worked on the main project structure.
- Developed the TV Shows page.
- Developed the Navbar.
- Configured the application Routes.
- Handled the Not Found page.

### Mohamed Aboelsoud
- Developed the Movie Recommendations section.
- Developed the Movie Reviews section.
- Connected the Recommendations and Reviews sections to the Movie Details page.
- Developed the AI Movie Chatbot.
- Implemented Dark Mode.

### Mohamed Aldhysh
- Developed the Movie Details and Tv Details page.
- Connected the Movie Details page with the Watchlist functionality.
- Added the ability to add and remove movies from the Watchlist through the Details page.
- Helped the team with debugging and fixing project issues.

### Shahd Elgendy
- Developed the Movies page.
- Implemented Pagination.
- Added and handled the Circular Rating component.
- Implemented the Search functionality.
- Helped the team with debugging and fixing project issues.

### Hanya Yasser
- Developed Footer.
- Developed the Watchlist page.
- Implemented the Add to Watchlist functionality.
- Implemented the Delete from Watchlist functionality.



## Git and GitHub

The project was developed collaboratively using Git and GitHub.
Each team member worked on a separate branch and then merged their changes into the main branch.

## Running the Project

To run the project locally, use:

```bash
npm run dev
```

The project will then be available on the local development server.

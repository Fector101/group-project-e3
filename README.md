# group-project-e3
Voting Project

Just run `fabian@fabian-X550LA:~/Desktop/Group Projects/group-project-e3/backend$ npm run dev` before delopyment

"backend": "nodemon backend/server.js",
    "frontend": "parcel frontend/public/index.html",
    "frontend_build": "parcel build frontend/public/index.html",
    "start": "parcel public/index.html",
    "build": "npx nodemon backend/server.js",
    "dev": "concurrently \"npx nodemon backend/server.js\" \"parcel frontend/public/index.html\""
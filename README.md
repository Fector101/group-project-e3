# group-project-e3
Voting Project

Just run `fabian@fabian-X550LA:~/Desktop/Group Projects/group-project-e3/frontend$ npm run dev` before delopyment

"backend": "nodemon backend/server.js",
    "frontend": "parcel frontend/public/index.html",
    "frontend_build": "parcel build frontend/public/index.html",
    "start": "parcel public/index.html",
    "build": "npx nodemon backend/server.js",
    "dev": "concurrently \"npx nodemon backend/server.js\" \"parcel frontend/public/index.html\""


    "dev1": "cd ../frontend && npm run build && cd ../backend && nodemon server.js",
    "dev2": "cd ../frontend && npm run dev && cd ../backend && nodemon server.js",
    "before_push": "cd ../frontend && npm run build",
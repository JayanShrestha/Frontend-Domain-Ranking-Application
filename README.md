A responsive Vue.js frontend for visualizing Tranco domain ranking data over time.
This application allows users to enter one or multiple domain names, fetch their ranking history from the backend API, and view the results in a clean, interactive chart. It’s built with Vue 3, Vite, Tailwind CSS, and Chart.js, and deployed on Cloudflare Pages.

🚀 Features

🔹 Multi‑Domain Input
- Accepts single or comma‑separated domain names
- Auto‑formats input (domain.com, example.com)
- Regex‑based validation for clean UX
- Shareable Link for efficient ranking data sharing
  
🔹 Ranking Visualization
- Interactive line chart using Chart.js
- Responsive layout for mobile and desktop
- Clean, polished UI with Tailwind CSS
- Hover tooltips with date + rank
- Reverse y‑axis (Rank #1 at the top)
  
🔹 API Integration
- Fetches ranking data from a NestJS backend
- Supports single‑domain and multi‑domain queries
- Displays cached status and record count
  
🔹 Error Handling
- Invalid domain warnings
- API error messages
- Loading states

📦 Installation & Setup
1. Clone the repository
```
git clone https://github.com/your-username/domain-ranking-frontend.git
cd domain-ranking-frontend
```

2. Install dependencies
```
npm install
```

3. Create environment variable
Create a .env file:
````
VITE_API_URL=https://your-backend-url.com
````

5. Start development server
````
npm run dev
````

Your app will be available at:
```
http://localhost:5173
````


🖼️ UI Overview
- Clean, responsive layout
- Tailwind‑styled form and chart container
- Smooth chart animations
- Mobile‑friendly x‑axis label handling

🛠️ Debugging Journey (Key Learnings)
This project involved solving several real‑world frontend issues:

✔ Tailwind CSS not applying
Fixed by ensuring:
- Tailwind imported in main.js
- Correct content paths in tailwind.config.js
- Restarting Vite after config changes

✔ PostCSS “media is not defined” error
Caused by an invalid key in tailwind.config.js.
Resolved by removing unsupported config and using screens properly.

✔ Chart.js showing unwanted numbers
The chartjs-plugin-datalabels plugin was auto‑rendering labels.
Removed the plugin to clean up the chart.

✔ Overlapping x‑axis labels on mobile
Implemented:
- autoSkip
- maxTicksLimit
- Responsive breakpoints
to keep the chart readable on all screen sizes.
These debugging steps strengthened my understanding of build pipelines, Tailwind internals, Chart.js behavior, and responsive UI design.

📁 Project Structure
src/
 ├─ api/
 │   └─ rankingApi.js
 ├─ components/
 │   └─ DomainRankingChart.vue
 ├─ views/
 │   └─ DomainRanking.vue
 ├─ assets/
 ├─ style.css
 ├─ main.js
 └─ App.vue



🌐 Deployment
The frontend is deployed on Cloudflare Pages, connected directly to this GitHub repository.
Every push to main triggers an automatic build and deployment.

🤝 Backend Repository
Backend (NestJS + Neon PostgreSQL + Koyeb):
👉 https://github.com/JayanShrestha/Domain-Ranking-Application-backend

📜 License
This project is open‑source and available under the MIT License.

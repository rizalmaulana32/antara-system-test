# GitHub Projects Browser
A web application for browsing repositories and commits of a GitHub organization. You can search by organization, filter repositories by type, sort, and direction, and view recent commits for each repository.

## 🌐Live Demo
You can access the online version of this application at:

[Live Demo URL](https://www.google.com)

## 🛠️ Features
- Search and filter GitHub repositories by organization name.
- Filter repositories by type, sort, and direction.
- View a list of recent commits for any selected repository.
- Infinite scrolling for both repositories and commits.
- Dark mode support.

## 🚀 Getting Started
**Prerequisites**
- Node.js (version 14.x or higher)
- GitHub Personal Access Token (for accessing the GitHub API)

## ⚙️ Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/github-projects-browser.git
```
2. Go to project directory
```bash
cd github-projects-browser
```
3. Install dependencies:
```bash
npm install
```
4. In the project root directory, create a .env.local file by copying the env.example file and filling in your GitHub token and base URL.
```bash
cp .env.example .env.local
```
5. Open the .env.local file and fill in the required variables:
```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_BASE_URL=https://api.github.com
```
&emsp;&emsp; NEXT_PUBLIC_GITHUB_TOKEN: Your GitHub personal access token for accessing the GitHub API.

&emsp;&emsp; NEXT_PUBLIC_BASE_URL: The base URL for the GitHub API (typically https://api.github.com).

## 🏃‍♂️ Running the Project
To run the development server:
```bash
npm run dev
```
Open http://localhost:3000 to view the application in your browser.

## 🔧 Building for Production
To create an optimized build for production:
```bash
npm run build
```
Then, start the production server:
```bash
npm run start
```

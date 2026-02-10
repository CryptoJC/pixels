# GitHub Setup Instructions

Follow these steps to upload your Random Pixel Filler project to GitHub.

## Prerequisites

1. A GitHub account (create one at https://github.com if you don't have one)
2. Git installed on your computer (download from https://git-scm.com)

## Step-by-Step Instructions

### 1. Create a New Repository on GitHub

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `random-pixel-filler`
   - **Description**: "An interactive app that fills a 1000x1000 canvas with random colored pixels"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize this repository with a README" (we already have one)
5. Click "Create repository"

### 2. Upload Your Code to GitHub

GitHub will show you a page with instructions. Follow the "push an existing repository from the command line" option:

Open your terminal/command prompt, navigate to your project folder, and run:

```bash
# Navigate to your project directory
cd path/to/random-pixel-filler

# Initialize git repository
git init

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Random Pixel Filler app"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/random-pixel-filler.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### 3. Verify Upload

1. Go to your repository page: `https://github.com/YOUR_USERNAME/random-pixel-filler`
2. You should see all your files listed
3. The README.md will be displayed on the repository homepage

## Alternative Method: GitHub Desktop

If you prefer a GUI:

1. Download and install GitHub Desktop from https://desktop.github.com
2. Open GitHub Desktop
3. Click "File" → "Add Local Repository"
4. Select your `random-pixel-filler` folder
5. Click "Publish repository"
6. Fill in the details and click "Publish repository"

## Deploy to GitHub Pages (Optional)

To make your app accessible online:

1. In your repository, go to "Settings" → "Pages"
2. Under "Source", select "Deploy from a branch"
3. Choose "main" branch and "/root" folder
4. Click "Save"

Then add this to your `package.json`:

```json
"homepage": "https://YOUR_USERNAME.github.io/random-pixel-filler",
```

And add these scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Deploy:
```bash
npm run deploy
```

Your app will be live at `https://YOUR_USERNAME.github.io/random-pixel-filler`

## Updating Your Repository

After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## Need Help?

- GitHub Documentation: https://docs.github.com
- Git Tutorial: https://git-scm.com/docs/gittutorial
- GitHub Guides: https://guides.github.com

---

**Note**: Remember to replace `YOUR_USERNAME` with your actual GitHub username in all commands!

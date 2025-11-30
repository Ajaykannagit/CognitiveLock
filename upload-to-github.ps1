# PowerShell Script to Upload to GitHub
# Run this script after creating a repository on GitHub

Write-Host "🚀 GitHub Upload Script for Cognitive-Lock Notes" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (default: cognitive-lock-notes)" 
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "cognitive-lock-notes"
}

Write-Host ""
Write-Host "Repository will be: https://github.com/$username/$repoName" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Have you created this repository on GitHub? (y/n)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host ""
    Write-Host "Please create the repository first:" -ForegroundColor Red
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Repository name: $repoName" -ForegroundColor Yellow
    Write-Host "3. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
    Write-Host "4. Click 'Create repository'" -ForegroundColor Yellow
    Write-Host ""
    $confirm2 = Read-Host "Press Enter after creating the repository..."
}

Write-Host ""
Write-Host "Setting up remote and pushing code..." -ForegroundColor Green

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote
git remote add origin "https://github.com/$username/$repoName.git"

# Rename branch to main if needed
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "Renaming branch to 'main'..." -ForegroundColor Yellow
    git branch -M main
}

# Push
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Success! Your code has been uploaded to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Visit your repository on GitHub" -ForegroundColor White
    Write-Host "2. Add topics: react, typescript, encryption, vite, tailwindcss" -ForegroundColor White
    Write-Host "3. Update README.md with your repository URL" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Error pushing to GitHub. Please check:" -ForegroundColor Red
    Write-Host "1. Repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "2. You have permission to push" -ForegroundColor Yellow
    Write-Host "3. Your GitHub credentials are correct" -ForegroundColor Yellow
}


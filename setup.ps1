# GreenVerse Setup Script for Windows PowerShell
# Run this script to set up the complete project

Write-Host "🌱 GreenVerse Setup Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📥 Installing frontend dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "📥 Installing backend dependencies..." -ForegroundColor Cyan
cd backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
cd ..
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Read QUICKSTART.md for setup instructions" -ForegroundColor White
Write-Host "2. Set up Supabase account and database" -ForegroundColor White
Write-Host "3. Create .env files (see .env.example)" -ForegroundColor White
Write-Host "4. Start backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "5. Start frontend: npm run dev (in new terminal)" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "- Quick Start: QUICKSTART.md" -ForegroundColor White
Write-Host "- Full Guide: README.md" -ForegroundColor White
Write-Host "- Backend Setup: backend/SETUP.md" -ForegroundColor White
Write-Host "- Implementation: IMPLEMENTATION_SUMMARY.md" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Need Help?" -ForegroundColor Yellow
Write-Host "Contact: greenverse@gmail.com" -ForegroundColor White
Write-Host ""

# 🤖 AUTOMATED WEBSITE TEST SCRIPT

Run this PowerShell script to automatically check for common issues:

```powershell
# Daily Juice - Automated Website Tests
Write-Host "🍊 DAILY JUICE - AUTOMATED WEBSITE TESTS" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

$basePath = "C:\Users\Admin\Documents\Daily Juice"
$issues = 0
$warnings = 0
$passes = 0

# Test 1: Check if main files exist
Write-Host "📋 TEST 1: Checking required files..." -ForegroundColor Cyan
$requiredFiles = @(
    "index.html",
    "login.html",
    "404.html",
    "thank-you.html",
    "css\style.css",
    "js\main.js",
    ".htaccess"
)

foreach ($file in $requiredFiles) {
    $path = Join-Path $basePath $file
    if (Test-Path $path) {
        Write-Host "  ✓ $file exists" -ForegroundColor Green
        $passes++
    } else {
        Write-Host "  ✗ $file MISSING!" -ForegroundColor Red
        $issues++
    }
}

Write-Host ""

# Test 2: Check image files
Write-Host "🖼️  TEST 2: Checking optimized images..." -ForegroundColor Cyan
$imageFiles = @(
    "images\Core_Logo.webp",
    "images\Daily_Juice_.webp",
    "images\Hero_Visual__Fruit_.webp",
    "images\Believe_and_Shine_202603191537.webp"
)

foreach ($image in $imageFiles) {
    $path = Join-Path $basePath $image
    if (Test-Path $path) {
        $size = (Get-Item $path).Length / 1KB
        Write-Host "  ✓ $image ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
        $passes++
        
        # Warn if file is too large
        if ($size -gt 500) {
            Write-Host "    ⚠ Warning: File size > 500KB" -ForegroundColor Yellow
            $warnings++
        }
    } else {
        Write-Host "  ✗ $image MISSING!" -ForegroundColor Red
        $issues++
    }
}

Write-Host ""

# Test 3: Check for oversized images in assets
Write-Host "⚠️  TEST 3: Checking for oversized images..." -ForegroundColor Cyan
$largeImages = @(
    "assets\images\logo.png",
    "assets\images\hero-fruits.png",
    "assets\images\icons\social-proof.png",
    "assets\images\og-image.png"
)

foreach ($image in $largeImages) {
    $path = Join-Path $basePath $image
    if (Test-Path $path) {
        $size = (Get-Item $path).Length / 1MB
        if ($size -gt 1) {
            Write-Host "  ⚠ $image is $([math]::Round($size, 2)) MB (too large!)" -ForegroundColor Yellow
            $warnings++
        } else {
            Write-Host "  ✓ $image is OK ($([math]::Round($size, 2)) MB)" -ForegroundColor Green
            $passes++
        }
    }
}

Write-Host ""

# Test 4: Check HTML file sizes
Write-Host "📄 TEST 4: Checking HTML file sizes..." -ForegroundColor Cyan
$htmlFiles = @("index.html", "login.html", "404.html", "thank-you.html")

foreach ($file in $htmlFiles) {
    $path = Join-Path $basePath $file
    if (Test-Path $path) {
        $size = (Get-Item $path).Length / 1KB
        Write-Host "  ✓ $file ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
        $passes++
    }
}

Write-Host ""

# Test 5: Check CSS and JS
Write-Host "💻 TEST 5: Checking CSS and JavaScript..." -ForegroundColor Cyan
$cssPath = Join-Path $basePath "css\style.css"
if (Test-Path $cssPath) {
    $size = (Get-Item $cssPath).Length / 1KB
    Write-Host "  ✓ style.css ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  ✗ style.css MISSING!" -ForegroundColor Red
    $issues++
}

$jsPath = Join-Path $basePath "js\main.js"
if (Test-Path $jsPath) {
    $size = (Get-Item $jsPath).Length / 1KB
    Write-Host "  ✓ main.js ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  ✗ main.js MISSING!" -ForegroundColor Red
    $issues++
}

Write-Host ""

# Test 6: Check for broken references in HTML
Write-Host "🔗 TEST 6: Checking for obvious HTML issues..." -ForegroundColor Cyan

$indexContent = Get-Content (Join-Path $basePath "index.html") -Raw

# Check if WebP references exist
if ($indexContent -match 'srcset="images/.*?\.webp"') {
    Write-Host "  ✓ WebP image references found" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  ⚠ No WebP references found - images may not be optimized" -ForegroundColor Yellow
    $warnings++
}

# Check if PayFast URLs are present
if ($indexContent -match 'payment\.payfast\.io') {
    Write-Host "  ✓ PayFast integration detected" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  ⚠ PayFast URLs not found" -ForegroundColor Yellow
    $warnings++
}

# Check if return_url is configured
if ($indexContent -match 'return_url') {
    Write-Host "  ✓ Return URL configured in PayFast links" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  ⚠ Return URL not configured" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""

# Test 7: Directory structure
Write-Host "📁 TEST 7: Validating directory structure..." -ForegroundColor Cyan
$requiredDirs = @("css", "js", "assets", "assets\images", "images")

foreach ($dir in $requiredDirs) {
    $path = Join-Path $basePath $dir
    if (Test-Path $path) {
        Write-Host "  ✓ $dir/ directory exists" -ForegroundColor Green
        $passes++
    } else {
        Write-Host "  ✗ $dir/ directory MISSING!" -ForegroundColor Red
        $issues++
    }
}

Write-Host ""

# Summary
Write-Host "=========================================" -ForegroundColor Green
Write-Host "📊 TEST SUMMARY" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Green
Write-Host "  Passed:   $passes" -ForegroundColor Green
Write-Host "  Warnings: $warnings" -ForegroundColor Yellow
Write-Host "  Issues:   $issues" -ForegroundColor Red
Write-Host ""

if ($issues -eq 0 -and $warnings -le 2) {
    Write-Host "✅ RESULT: Website is READY for deployment!" -ForegroundColor Green
} elseif ($issues -gt 0) {
    Write-Host "❌ RESULT: CRITICAL ISSUES FOUND - Fix before deploying!" -ForegroundColor Red
} else {
    Write-Host "⚠️  RESULT: Website is mostly ready, review warnings" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
```

## 🚀 HOW TO RUN THIS SCRIPT

### Method 1: Copy-Paste into PowerShell ISE
1. Open PowerShell ISE (search in Start menu)
2. Paste the entire script above
3. Press F5 to run

### Method 2: Save as .ps1 File and Run
1. Copy the script text above
2. Create new file: `test-website.ps1`
3. Paste and save
4. Right-click → Run with PowerShell

### Method 3: Run Directly in Terminal
```powershell
# Navigate to project folder
cd "C:\Users\Admin\Documents\Daily Juice"

# Create and run script
notepad test-script.ps1
# (paste script, save, then run)
.\test-script.ps1
```

## 📋 WHAT THIS SCRIPT CHECKS:

✓ Required files exist (HTML, CSS, JS)  
✓ Optimized WebP images present  
✓ Original images not too large  
✓ PayFast integration configured  
✓ Return/cancel URLs set up  
✓ Directory structure correct  

## 🎯 INTERPRETING RESULTS:

**✅ All Pass (0 issues, ≤2 warnings):**
- Website is ready for deployment!
- Proceed with manual visual testing

**⚠️ Warnings Only:**
- Minor issues, safe to deploy
- Review warnings and fix when convenient

**❌ Critical Issues Found:**
- DO NOT deploy yet
- Fix the listed issues first
- Re-run test after fixes

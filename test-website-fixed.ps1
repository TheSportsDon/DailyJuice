# Daily Juice - Automated Website Tests
$basePath = "C:\Users\Admin\Documents\Daily Juice"
$issues = 0
$warnings = 0
$passes = 0

Write-Host "DAILY JUICE - AUTOMATED WEBSITE TESTS" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Test 1: Check if main files exist
Write-Host "TEST 1: Checking required files..." -ForegroundColor Cyan
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
        Write-Host "  PASS: $file exists" -ForegroundColor Green
        $passes++
    } else {
        Write-Host "  FAIL: $file MISSING!" -ForegroundColor Red
        $issues++
    }
}

Write-Host ""

# Test 2: Check optimized image files
Write-Host "TEST 2: Checking optimized images..." -ForegroundColor Cyan
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
        Write-Host "  PASS: $image (" + [math]::Round($size, 2) + " KB)" -ForegroundColor Green
        $passes++
        
        # Warn if file is too large
        if ($size -gt 500) {
            Write-Host "    WARNING: File size over 500KB" -ForegroundColor Yellow
            $warnings++
        }
    } else {
        Write-Host "  FAIL: $image MISSING!" -ForegroundColor Red
        $issues++
    }
}

Write-Host ""

# Test 3: Check for oversized images in assets
Write-Host "TEST 3: Checking for oversized images..." -ForegroundColor Cyan
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
        Write-Host "  WARNING: $image is " + [math]::Round($size, 2) + " MB (too large!)" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "  PASS: $image not found (using WebP fallback)" -ForegroundColor Green
        $passes++
    }
}

Write-Host ""

# Test 4: Check HTML file sizes
Write-Host "TEST 4: Checking HTML file sizes..." -ForegroundColor Cyan
$htmlFiles = @("index.html", "login.html", "404.html", "thank-you.html")

foreach ($file in $htmlFiles) {
    $path = Join-Path $basePath $file
    if (Test-Path $path) {
        $size = (Get-Item $path).Length / 1KB
        Write-Host "  PASS: $file (" + [math]::Round($size, 2) + " KB)" -ForegroundColor Green
        $passes++
    }
}

Write-Host ""

# Test 5: Check CSS and JS
Write-Host "TEST 5: Checking CSS and JavaScript..." -ForegroundColor Cyan
$cssPath = Join-Path $basePath "css\style.css"
if (Test-Path $cssPath) {
    $size = (Get-Item $cssPath).Length / 1KB
    Write-Host "  PASS: style.css (" + [math]::Round($size, 2) + " KB)" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  FAIL: style.css MISSING!" -ForegroundColor Red
    $issues++
}

$jsPath = Join-Path $basePath "js\main.js"
if (Test-Path $jsPath) {
    $size = (Get-Item $jsPath).Length / 1KB
    Write-Host "  PASS: main.js (" + [math]::Round($size, 2) + " KB)" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  FAIL: main.js MISSING!" -ForegroundColor Red
    $issues++
}

Write-Host ""

# Test 6: Check for broken references in HTML
Write-Host "TEST 6: Checking for HTML configuration..." -ForegroundColor Cyan

$indexContent = Get-Content (Join-Path $basePath "index.html") -Raw

# Check if WebP references exist
if ($indexContent -match 'srcset="images/.*?\.webp"') {
    Write-Host "  PASS: WebP image references found" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  WARNING: No WebP references found" -ForegroundColor Yellow
    $warnings++
}

# Check if PayFast URLs are present
if ($indexContent -match 'payment\.payfast\.io') {
    Write-Host "  PASS: PayFast integration detected" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  WARNING: PayFast URLs not found" -ForegroundColor Yellow
    $warnings++
}

# Check if return_url is configured
if ($indexContent -match 'return_url') {
    Write-Host "  PASS: Return URL configured in PayFast links" -ForegroundColor Green
    $passes++
} else {
    Write-Host "  WARNING: Return URL not configured" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""

# Test 7: Directory structure
Write-Host "TEST 7: Validating directory structure..." -ForegroundColor Cyan
$requiredDirs = @("css", "js", "assets", "assets\images", "images")

foreach ($dir in $requiredDirs) {
    $path = Join-Path $basePath $dir
    if (Test-Path $path) {
        Write-Host "  PASS: $dir directory exists" -ForegroundColor Green
        $passes++
    } else {
        Write-Host "  FAIL: $dir directory MISSING!" -ForegroundColor Red
        $issues++
    }
}

Write-Host ""

# Summary
Write-Host "=========================================" -ForegroundColor Green
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Green
Write-Host "  Passed:   $passes" -ForegroundColor Green
Write-Host "  Warnings: $warnings" -ForegroundColor Yellow
Write-Host "  Issues:   $issues" -ForegroundColor Red
Write-Host ""

if ($issues -eq 0 -and $warnings -le 2) {
    Write-Host "RESULT: Website is READY for deployment!" -ForegroundColor Green
} elseif ($issues -gt 0) {
    Write-Host "RESULT: CRITICAL ISSUES FOUND - Fix before deploying!" -ForegroundColor Red
} else {
    Write-Host "RESULT: Website is mostly ready, review warnings" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next step: Open index.html in browser for visual testing"
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

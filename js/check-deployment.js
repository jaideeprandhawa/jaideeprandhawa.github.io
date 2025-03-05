/**
 * Deployment verification script
 * Run this in browser console to check if your deployment is working properly
 */

console.log('⏳ Running deployment verification checks...');

// Check if profile image is loaded correctly
function checkProfileImage() {
    const profileImage = document.querySelector('.profile-picture img');
    if (!profileImage) {
        console.error('❌ Profile image element not found');
        return false;
    }
    
    if (profileImage.complete && profileImage.naturalHeight !== 0) {
        console.log('✅ Profile image loaded successfully');
        return true;
    } else {
        console.error('❌ Profile image failed to load');
        return false;
    }
}

// Check resume buttons
function checkResumeButtons() {
    const viewButton = document.querySelector('a[href*="ResumeJD.pdf"][target="_blank"]');
    const downloadButton = document.querySelector('a[href*="ResumeJD.pdf"][download]');
    
    let success = true;
    
    if (!viewButton) {
        console.error('❌ View Resume button not found');
        success = false;
    } else {
        console.log('✅ View Resume button found');
    }
    
    if (!downloadButton) {
        console.error('❌ Download Resume button not found');
        success = false;
    } else {
        console.log('✅ Download Resume button found');
    }
    
    return success;
}

// Check theme toggle
function checkThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        console.error('❌ Theme toggle button not found');
        return false;
    }
    
    console.log('✅ Theme toggle button found');
    return true;
}

// Check custom cursor
function checkCustomCursor() {
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
        if (cursorOuter && getComputedStyle(cursorOuter).display !== 'none') {
            console.error('❌ Custom cursor shown on mobile device');
            return false;
        } else {
            console.log('✅ Custom cursor correctly hidden on mobile');
            return true;
        }
    } else {
        if (!cursorOuter || !cursorInner) {
            console.error('❌ Custom cursor elements not found on desktop');
            return false;
        }
        
        if (getComputedStyle(cursorOuter).display === 'none') {
            console.error('❌ Custom cursor hidden on desktop');
            return false;
        }
        
        console.log('✅ Custom cursor correctly displayed on desktop');
        return true;
    }
}

// Run all checks
function runAllChecks() {
    const imageResult = checkProfileImage();
    const buttonsResult = checkResumeButtons();
    const themeResult = checkThemeToggle();
    const cursorResult = checkCustomCursor();
    
    const allPassed = imageResult && buttonsResult && themeResult && cursorResult;
    
    console.log('\n----- Deployment Check Summary -----');
    console.log(`Profile Image: ${imageResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Resume Buttons: ${buttonsResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Theme Toggle: ${themeResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Custom Cursor: ${cursorResult ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Overall Status: ${allPassed ? '✅ DEPLOYMENT SUCCESSFUL' : '⚠️ ISSUES DETECTED'}`);
    
    return allPassed;
}

// Run checks after page has fully loaded
if (document.readyState === 'complete') {
    runAllChecks();
} else {
    window.addEventListener('load', runAllChecks);
}

// Instructions for manual testing
console.log('\n📋 Manual testing steps:');
console.log('1. Click both resume buttons to verify they work');
console.log('2. Toggle the theme to verify dark/light mode works');
console.log('3. Test on mobile device to verify responsive layout');
console.log('4. Check that animations and transitions work smoothly');

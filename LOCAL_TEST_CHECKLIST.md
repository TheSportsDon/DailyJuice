# 🧪 DAILY JUICE - LOCAL TESTING CHECKLIST

**Test Date:** _______________  
**Tester:** _______________  
**Browser:** _______________  

---

## ✅ PRE-TEST SETUP

### Step 1: Open Website in Browser
```
Method 1 - Direct File:
1. Navigate to: C:\Users\Admin\Documents\Daily Juice
2. Right-click index.html → Open with → Google Chrome

Method 2 - Browser Address Bar:
1. Open Chrome
2. Type: file:///C:/Users/Admin/Documents/Daily%20Juice/index.html
3. Press Enter
```

### Step 2: Open Developer Tools
```
Press: F12 (or Ctrl+Shift+I)
Tab: Console
Keep open during entire test
```

---

## 📋 TEST SECTIONS

### TEST 1: PAGE LOAD ✓
**What to Check:**
- [ ] Page loads without errors
- [ ] No blank/white screen
- [ ] All sections visible
- [ ] No infinite loading spinner

**Console Errors:**
- [ ] No red errors in console
- [ ] Yellow warnings are OK

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 2: NAVIGATION LOGO ✓
**What to Check:**
- [ ] Logo displays in top-left corner
- [ ] Logo image loads (not broken icon)
- [ ] Clicking logo scrolls to top

**Expected:** Core_Logo.webp or PNG fallback loads

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 3: HERO SECTION ✓
**What to Check:**
- [ ] "Daily Juice" hero logo displays
- [ ] Headline: "Everybody has juice..." visible
- [ ] Subheadline visible
- [ ] "Join the Community – R20/month" button visible
- [ ] Subscriber badge shows "Joining 1,247 subscribers"
- [ ] Hero fruits image displays (right side on desktop)

**Image Check:**
- [ ] Daily_Juice_.webp loads
- [ ] Hero_Visual__Fruit_.webp loads
- [ ] Images load within 3 seconds

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 4: NAVIGATION MENU ✓
**What to Check:**
- [ ] Menu items visible: About, Community, Mission, Benefits, Login
- [ ] "Join Now" button visible in nav

**Click Each Link:**
- [ ] About → Scrolls to "What is Daily Juice?" section
- [ ] Community → Scrolls to community section
- [ ] Mission → Scrolls to mission section
- [ ] Benefits → Scrolls to benefits section
- [ ] Login → Opens login.html
- [ ] Join Now → Opens login.html

**Mobile Menu Test (resize browser to < 768px):**
- [ ] Hamburger menu appears
- [ ] Click hamburger → Menu slides in from right
- [ ] Menu items visible on dark background
- [ ] Click link → Menu closes automatically

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 5: TICKER/MARQUEE ✓
**What to Check:**
- [ ] Red ticker bar visible below hero
- [ ] Text scrolls horizontally: "Daily Insights Shared Wisdom"
- [ ] Animation smooth (no stuttering)

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 6: ABOUT SECTION ✓
**What to Check:**
- [ ] Section title: "What is Daily Juice?"
- [ ] Description paragraphs visible
- [ ] Podbean player loads (iframe appears)
- [ ] Player is interactive (can play episodes)

**Podbean Player:**
- [ ] iframe height: 315px
- [ ] Shows episode list
- [ ] Play buttons work

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 7: COMMUNITY SECTION ✓
**What to Check:**
- [ ] Green background color
- [ ] 3 ticket cards visible:
  - [ ] Belonging (yellow ticket)
  - [ ] Participation (yellow ticket)
  - [ ] Growth (red ticket)
- [ ] Card icons display (👥, 💬, 🌟)
- [ ] "Access Community Portal" button visible

**Button Test:**
- [ ] Click "Access Community Portal" → Opens Whop.com in new tab

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 8: MISSION SECTION ✓
**What to Check:**
- [ ] Section title: "Our Mission"
- [ ] Story text visible
- [ ] Stats boxes visible (10,000+, 1, Fruit Farm, ∞)
- [ ] Fruit farm concept image displays
- [ ] Illustrations display:
  - [ ] Power to Succeed
  - [ ] Believe and Shine

**Image Check:**
- [ ] believe-and-shine.webp loads
- [ ] power-to-succeed.png loads

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 9: BENEFITS SECTION ✓
**What to Check:**
- [ ] Section title: "What You Get"
- [ ] 5 benefit cards visible:
  - [ ] Exclusive Content (🎁)
  - [ ] Community Discussions (💭)
  - [ ] Chance to Be Featured (🎤)
  - [ ] Early Episode Access (⚡)
  - [ ] Fruit Farm Contribution (🍊)
- [ ] Icons display correctly
- [ ] Hover effects work (cards lift up)

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 10: ENGAGEMENT SECTION ✓
**What to Check:**
- [ ] Yellow/orange gradient background
- [ ] Question: "What Are You Sipping On?"
- [ ] Engagement text visible
- [ ] Two action cards:
  - [ ] Share on Social
  - [ ] Be Interviewed

**Social Share Buttons:**
- [ ] WhatsApp button (green)
- [ ] Facebook button (blue)
- [ ] Twitter button (light blue)
- [ ] Click each → Opens share dialog in new tab

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 11: FINAL CTA SECTION ✓
**What to Check:**
- [ ] Dark background
- [ ] Progress bar visible
- [ ] Shows "1,247 / 2,000 founding members"
- [ ] Progress bar fills to ~62%
- [ ] Pricing card: "Founding Member R20/month"
- [ ] Benefit list with checkmarks
- [ ] "Join the Community – R20/month" button

**Payment Button Test:**
- [ ] Click button → Opens PayFast payment page
- [ ] URL contains: return_url=https://dailyjuice.info/thank-you.html
- [ ] URL contains: cancel_url=https://dailyjuice.info/

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 12: FOOTER ✓
**What to Check:**
- [ ] Copyright text: "© 2026 Daily Juice. All rights reserved."
- [ ] Email link: hello@dailyjuice.info
- [ ] Click email → Opens mail client

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 13: LOGIN PAGE ✓
**Steps:**
1. Click "Login" in navigation OR go to login.html

**What to Check:**
- [ ] Navigation loads correctly
- [ ] Login form centered on page
- [ ] Email input field
- [ ] Password input field
- [ ] "Login to Daily Juice" button
- [ ] "Don't have an account?" text
- [ ] "Join the Community" link
- [ ] Social login buttons:
  - [ ] Continue with Google
  - [ ] Continue with Apple

**Form Validation:**
- [ ] Submit empty form → Shows validation error
- [ ] Enter invalid email → Shows error
- [ ] Enter valid email + password → Form submits

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 14: 404 ERROR PAGE ✓
**Steps:**
1. Go to address bar
2. Add `/nonexistent-page.html` to URL
3. Press Enter

**What to Check:**
- [ ] Custom 404 page loads (not browser default)
- [ ] Shows "404" in large text
- [ ] Message: "Oops! This page has gone sour"
- [ ] Fruit decorations visible (🍊 🍋 🍎)
- [ ] "Back to Home" button
- [ ] "Contact Support" button

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 15: THANK-YOU PAGE ✓
**Steps:**
1. Manually navigate to: thank-you.html

**What to Check:**
- [ ] Success icon (✅) displays
- [ ] Title: "Welcome to the Family!"
- [ ] Thank you message visible
- [ ] Fruit decorations (🍊 🍋 🍎 🍇 🍓)
- [ ] "What Happens Next?" section
- [ ] Checklist of next steps
- [ ] "Access Community Portal" button
- [ ] "Back to Home" button

**Button Tests:**
- [ ] Click "Access Community Portal" → Opens Whop.com
- [ ] Click "Back to Home" → Returns to index.html

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 16: RESPONSIVE DESIGN ✓

#### Desktop (1920x1080):
- [ ] All sections visible
- [ ] Layout looks balanced
- [ ] Images sized appropriately
- [ ] No horizontal scrollbar

#### Laptop (1366x768):
- [ ] All content fits width
- [ ] Text readable
- [ ] Images scaled properly

#### Tablet (768x1024):
- [ ] Navigation becomes hamburger menu
- [ ] Grid layouts adjust (2 columns)
- [ ] Text still readable
- [ ] Touch targets large enough

#### Mobile (375x667):
- [ ] Single column layout
- [ ] Hamburger menu works
- [ ] All buttons tappable
- [ ] Text doesn't require zoom
- [ ] Images fit screen width

**How to Test:**
```
Method 1 - Chrome DevTools:
1. Press F12
2. Click device icon (Ctrl+Shift+M)
3. Select different devices from dropdown

Method 2 - Resize Browser:
1. Manually resize browser window
2. Watch layout adapt at breakpoints
```

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 17: PERFORMANCE ✓

#### Load Time Test:
```
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Check "Disable cache"
4. Refresh page (F5)
5. Watch "Load" time at bottom
```

**Target:** < 3 seconds

**Actual:** _______ seconds

#### Image Loading:
- [ ] All images load within 3 seconds
- [ ] No broken image icons
- [ ] Lazy loading works (images load as you scroll)

#### Console Performance:
- [ ] No JavaScript errors
- [ ] No CSS warnings (warnings OK)
- [ ] Smooth scrolling

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

### TEST 18: CROSS-BROWSER COMPATIBILITY ✓

Test in these browsers (if available):

#### Chrome:
- [ ] All features work
- [ ] Images load
- [ ] Animations smooth

#### Firefox:
- [ ] All features work
- [ ] Images load
- [ ] Animations smooth

#### Edge:
- [ ] All features work
- [ ] Images load
- [ ] Animations smooth

#### Safari (if on Mac):
- [ ] All features work
- [ ] Images load
- [ ] WebP images or fallbacks work

**Result:** PASS / FAIL  
**Notes:** ________________________________

---

## 🎯 FINAL VERDICT

### Overall Test Result:

**PASS / FAIL**

**Total Tests Passed:** ___ / 18

**Critical Issues Found:**
- [ ] None
- [ ] Images not loading
- [ ] Broken links
- [ ] JavaScript errors
- [ ] Layout broken on mobile
- [ ] Payment buttons not working

**Issues List:**
1. ___________________________________
2. ___________________________________
3. ___________________________________

**Ready for Production Deployment?**
- [ ] YES - All tests passed
- [ ] NO - Critical issues need fixing

**Sign-off:** _________________  
**Date:** _________________

---

## 🐛 BUG REPORT TEMPLATE

If you find issues, document them:

```
Issue #: ___
Severity: Critical / High / Medium / Low
Location: (page/section)
Description: What's wrong?
Expected: What should happen?
Actual: What actually happened?
Steps to Reproduce:
1. 
2. 
3. 
Screenshot: (attach if possible)
Browser: Chrome/Firefox/Edge/Safari
Device: Desktop/Mobile/Tablet
```

---

## 📊 PERFORMANCE METRICS

Record these metrics for optimization:

```
Page Load Time: ________ ms
First Contentful Paint: ________ ms
Time to Interactive: ________ ms
Total Page Weight: ________ KB
Number of Requests: ________
Lighthouse Score: ________ / 100
```

---

**Testing completed on:** _______________  
**Next Steps:** _________________________

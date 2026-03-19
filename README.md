# Daily Juice Landing Page - Deployment Guide

## 🎯 Project Overview
High-conversion, mobile-first landing page for Daily Juice community subscriptions.

---

## 📁 File Structure
```
Daily Juice/
├── index.html              # Main landing page
├── css/
│   └── style.css          # All styles with brand palette
├── js/
│   └── main.js            # Interactive components
├── assets/
│   ├── images/            # Visual assets (see Image Requirements below)
│   └── fonts/             # Custom fonts (if needed)
└── README.md              # This file
```

---

## 🖼️ Image Requirements & Optimization

### Required Images (Place in `assets/images/`):

1. **logo.png** (Header navigation logo)
   - Dimensions: 200x50px (or proportional)
   - Format: PNG with transparent background
   - Max size: < 50KB

2. **logo-large.png** (Hero section main logo)
   - Dimensions: 600x300px (or proportional)
   - Format: PNG with transparent background
   - Max size: < 150KB

3. **hero-fruits.png** (Hero visual)
   - Dimensions: 800x800px (square or 4:5 ratio)
   - Format: WebP with PNG fallback
   - Max size: < 200KB
   - Content: Vibrant fruit-rich imagery from reference

4. **fruit-farm-concept.png** (Mission section)
   - Dimensions: 600x400px
   - Format: WebP with PNG fallback
   - Max size: < 200KB
   - Content: Concept art of community fruit farm

5. **favicon.png** (Browser tab icon)
   - Dimensions: 32x32px or 64x64px
   - Format: PNG
   - Max size: < 10KB

6. **og-image.jpg** (Social media sharing preview)
   - Dimensions: 1200x630px
   - Format: JPG
   - Max size: < 300KB
   - Content: Branded graphic with headline

### Image Optimization Tools:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **GIMP**: For manual optimization
- **WebP Converter**: Convert to WebP format for better compression

---

## 🎵 Podcast Integration Setup

### Spotify Embed:
1. Go to your podcast on Spotify
2. Click "..." → Share → Embed Podcast
3. Copy the embed URL (extract the `src` value)
4. Update `js/main.js` line ~117:
   ```javascript
   src="https://open.spotify.com/embed/show/YOUR_SPOTIFY_SHOW_ID?utm_source=generator&theme=0"
   ```
   Replace `YOUR_SPOTIFY_SHOW_ID` with actual show ID

### Apple Podcasts Embed:
1. Go to your podcast on Apple Podcasts
2. Click share button → Copy link
3. Extract podcast ID from URL
4. Update `js/main.js` line ~127:
   ```javascript
   src="https://podcasts.apple.com/embed/YOUR_PODCAST_ID"
   ```
   Replace `YOUR_PODCAST_ID` with actual podcast ID

---

## 💳 PayFast Integration (CRITICAL)

### Step 1: Create PayFast Account
1. Visit https://www.payfast.co.za/
2. Sign up for merchant account
3. Complete verification process
4. Get your Merchant ID from dashboard

### Step 2: Configure Payment Button
Update `index.html` line ~342:
```html
<input type="hidden" name="merchant_id" value="YOUR_MERCHANT_ID">
```
Replace `YOUR_MERCHANT_ID` with your actual PayFast merchant ID

### Step 3: Test Mode vs Live Mode
- **Sandbox (Testing)**: `https://sandbox.payfast.co.za/eng/process`
- **Live (Production)**: `https://www.payfast.co.za/eng/process`

Update form action in `index.html` line ~341 when ready to go live.

### Step 4: Optional Advanced Configuration
Add these fields for recurring subscription:
```html
<input type="hidden" name="return_url" value="https://dailyjuice.info/thank-you.html">
<input type="hidden" name="cancel_url" value="https://dailyjuice.info/">
<input type="hidden" name="notify_url" value="https://dailyjuice.info/ipn.php">
```

### Step 5: Recurring Billing Details
Current configuration:
- `subscription_type="1"` = Recurring payment
- `billing_frequency="1"` = Monthly (every 1 month)
- `billing_cycles="0"` = Indefinite (until cancelled)

---

## 🚀 Hostinger Deployment Steps

### Method 1: File Manager (Recommended for first deploy)
1. Login to Hostinger control panel
2. Navigate to File Manager
3. Go to `public_html` directory
4. Upload all files maintaining structure:
   - `index.html`
   - `css/style.css`
   - `js/main.js`
   - `assets/` folder with all images

### Method 2: FTP (Better for updates)
1. Download FileZilla or similar FTP client
2. Get FTP credentials from Hostinger
3. Connect to server
4. Upload entire project structure to `public_html`

### Post-Upload Checklist:
- [ ] Verify all images load correctly
- [ ] Test PayFast button in sandbox mode
- [ ] Check podcast embeds load
- [ ] Test mobile responsiveness
- [ ] Verify SSL certificate is active (HTTPS)

---

## 🔧 Domain Configuration (dailyjuice.info)

### If domain purchased separately:
1. Login to domain registrar
2. Update nameservers to Hostinger:
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
3. Wait 24-48 hours for DNS propagation
4. In Hostinger panel, add domain to hosting plan

### Enable SSL Certificate:
1. Hostinger → SSL/TLS Certificates
2. Select dailyjuice.info
3. Install Let's Encrypt certificate (free)
4. Force HTTPS redirect

---

## 📊 Analytics Integration (Optional but Recommended)

### Google Analytics 4:
1. Create GA4 property at https://analytics.google.com/
2. Get Measurement ID (starts with G-)
3. Add to `index.html` just before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Replace `G-XXXXXXXXXX` with your Measurement ID

---

## ⚡ Performance Optimization Checklist

### Before Launch:
- [ ] Compress all images (target: < 200KB each)
- [ ] Minify CSS: Use https://cssminifier.com/
- [ ] Minify JavaScript: Use https://javascript-minifier.com/
- [ ] Enable browser caching in `.htaccess`
- [ ] Test page speed: https://pagespeed.web.dev/

### .htaccess for Caching (create in root):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 📱 Mobile Testing

Test on these breakpoints:
- 320px (iPhone SE)
- 375px (iPhone 12/13 Mini)
- 414px (iPhone 12/13 Pro Max)
- 768px (iPad Portrait)
- 1024px (iPad Landscape)

Use Chrome DevTools Device Mode for testing.

---

## 🎨 Brand Guidelines Quick Reference

### Colors:
- **Orange**: `#FF6F00` - Primary CTAs, accents
- **Yellow**: `#FFC107` - Highlights, backgrounds
- **Green**: `#4CAF50` - Success states, secondary CTAs
- **Red**: `#F44336` - Urgency, important highlights

### Fonts:
- **Primary**: Poppins (body text, buttons)
- **Secondary**: Montserrat (headings, emphasis)

---

## 🔒 Security Best Practices

1. **PayFast Integration**:
   - Never expose merchant credentials in client-side code unnecessarily
   - Use IPN (Instant Payment Notification) for secure callbacks
   - Implement return URL validation

2. **Form Protection**:
   - Consider adding reCAPTCHA if spam becomes an issue
   - Validate all inputs server-side

3. **Regular Backups**:
   - Set up automatic backups in Hostinger
   - Keep local backup copies

---

## 🧪 Testing Checklist

### Functionality Tests:
- [ ] All CTA buttons link to correct PayFast URL
- [ ] Podcast players load and play audio
- [ ] Community portal link opens Whop page
- [ ] Social share buttons work
- [ ] Email links open default mail client
- [ ] Mobile menu toggles correctly
- [ ] Smooth scroll works on all anchor links
- [ ] Progress bar displays correct percentage

### Cross-Browser Tests:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Tests:
- [ ] Page loads in < 3 seconds
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Lighthouse score > 90

---

## 📈 Conversion Tracking

### Set up conversion goals:
1. **Google Analytics**: Track clicks on "Join" buttons
2. **Facebook Pixel**: Track subscription events
3. **PayFast Dashboard**: Monitor successful transactions

### Key Metrics to Monitor:
- Bounce rate
- Time on page
- Scroll depth
- CTA click-through rate
- Conversion rate (visitors → subscribers)

---

## 🛠️ Maintenance & Updates

### Weekly:
- Check all external links
- Review analytics for issues
- Test checkout flow

### Monthly:
- Update podcast episodes in embeds
- Refresh hero image (optional)
- Review and optimize images
- Check page speed scores

### Quarterly:
- A/B test different CTAs
- Update testimonial/review content
- Review color contrast for accessibility
- Backup entire site

---

## 🆘 Troubleshooting

### Issue: Podcast embeds not loading
**Solution**: Check that Spotify/Apple podcast IDs are correct in `js/main.js`. Ensure proper iframe permissions.

### Issue: PayFast button not working
**Solution**: Verify merchant ID is correct. Check if using sandbox vs live URL. Test in incognito mode.

### Issue: Images not displaying
**Solution**: Check file paths are correct. Verify images are uploaded to correct folder. Check file extensions (.png vs .jpg).

### Issue: Mobile menu not working
**Solution**: Clear browser cache. Check JavaScript console for errors. Ensure jQuery is not conflicting (not used in this project).

### Issue: Progress bar not animating
**Solution**: Check JavaScript console. Verify counter elements exist in HTML. Clear cache.

---

## 📞 Support Resources

### PayFast Support:
- Documentation: https://www.payfast.co.za/developers/
- Email: support@payfast.co.za
- Phone: +27 (0)21 441 0191

### Hostinger Support:
- Live Chat: Available 24/7 in control panel
- Knowledge Base: https://www.hostinger.com/tutorials

### General Web Help:
- MDN Web Docs: https://developer.mozilla.org/
- Stack Overflow: https://stackoverflow.com/

---

## 🎉 Launch Checklist

Final pre-launch verification:
- [ ] All placeholder content replaced with real data
- [ ] PayFast merchant ID configured
- [ ] Podcast embed URLs updated
- [ ] All images optimized and uploaded
- [ ] Favicon added
- [ ] OG image for social sharing created
- [ ] Google Analytics installed (optional)
- [ ] SSL certificate active
- [ ] Domain pointing to Hostinger
- [ ] Mobile responsiveness verified
- [ ] All links tested and working
- [ ] PayFast test transaction successful
- [ ] Page speed score > 90
- [ ] Backup system configured

---

## 🚀 Next Steps After Launch

1. **Drive Traffic**:
   - Share on social media
   - Email newsletter blast
   - Podcast episode announcement
   - Community outreach

2. **Optimize Conversions**:
   - A/B test different headlines
   - Test different CTA colors/text
   - Add exit-intent popup
   - Implement retargeting pixels

3. **Scale**:
   - Add more podcast platforms (Google, Amazon Music)
   - Create thank-you page for after subscription
   - Build member dashboard
   - Develop fruit farm tracking system

---

**Built with ❤️ for the Daily Juice Community**

Questions? Contact: hello@dailyjuice.info

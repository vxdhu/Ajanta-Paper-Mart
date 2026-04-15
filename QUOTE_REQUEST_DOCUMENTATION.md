# Quote Request Modal Feature Documentation

## Overview
The Quote Request Modal is a feature that allows users to submit quote requests directly from any page on the website. When clicked, it opens a modal dialogue with a form requesting:
- **Phone Number** - User's contact number
- **Product Select** - Dropdown list of all available products
- **Quantity** - Number of units required

## Files Modified/Created

### 1. **HTML Files (index.html, products.html, about.html, contact.html)**
   - Added "Request a Quote" button onclick handler: `onclick="openQuoteModal()"`
   - Added modal HTML structure with form elements before the footer
   - Added script references to `js/products.js` and `js/main.js`

### 2. **JavaScript Files**

#### `js/main.js` (NEW)
   - **Functions:**
     - `openQuoteModal()` - Opens the modal and prevents body scrolling
     - `closeQuoteModal()` - Closes the modal and restores body scrolling
     - `populateProductSelect()` - Dynamically populates product dropdown from products array
   
   - **Event Listeners:**
     - Modal close button click
     - Outside modal click (backdrop click to close)
     - Form submission with validation
   
   - **Form Submission:**
     - Validates all required fields
     - Sends POST request to `save-quote.php`
     - Shows success/error messages
     - Resets form on successful submission

#### `js/products.js` (EXISTING - No Changes)
   - Contains the products array with all product details
   - Used to dynamically populate the product select dropdown

### 3. **CSS Styling**

#### `css/styles.scss & css/styles.css`
   - Added comprehensive modal styling including:
     - Modal backdrop with fade-in animation
     - Modal content box with slide-up animation
     - Form styling with focus states
     - Responsive design (Desktop → Tablet → Mobile)
     - Button hover effects
   
   - **Media Queries:**
     - Desktop (default)
     - Tablet (max-width: 768px)
     - Mobile (max-width: 480px)

### 4. **Backend File**

#### `save-quote.php` (NEW)
   - Receives POST requests from the form
   - Validates all input data:
     - Phone number format validation
     - Required fields check
     - Quantity validation (positive number)
   
   - **File Storage:**
     - Creates `/quotes` directory automatically
     - Saves individual quote files:
       - Format: `quote_YYYY-MM-DD_PHONENUMBER.txt`
     - Also saves to `all_quotes.txt` master log
   
   - **Response:**
     - Returns JSON response with success/error status
     - Provides quote reference number
     - Includes sanitization to prevent injection attacks

## How It Works

### User Flow:
1. User clicks "Request a Quote" button on any page
2. Modal appears with form fields
3. User fills in:
   - Phone number
   - Select a product from dropdown
   - Enter desired quantity
4. User clicks "Submit Quote Request"
5. Form validates all fields
6. Data is sent to `save-quote.php` via Fetch API
7. Backend saves the quote to a text file
8. User receives success confirmation
9. Modal closes and form resets

### Data Storage:
- All quote requests are saved to text files in `/quotes` folder
- Individual files: `quote_2026-04-16_9876543210.txt`
- Master log: `all_quotes.txt` for easy reference
- Files can be easily accessed and shared via email or WhatsApp

### Form Validation:
- **Phone Number:** Must be 10 digits or +91 followed by 10 digits
- **Product:** Must select a valid product from the list
- **Quantity:** Must be a positive number (minimum 1)

## Responsive Design

The modal is fully responsive:
- **Desktop:** 500px max-width, centered
- **Tablet (≤768px):** 450px max-width with adjusted padding
- **Mobile (≤480px):** Full width (98%) with optimized spacing

## Security Features

1. **Input Sanitization:** All inputs are sanitized using `htmlspecialchars()`
2. **Validation:** Server-side validation on all fields
3. **Error Handling:** Proper HTTP response codes returned
4. **File Permissions:** Quote files saved with proper directory permissions
5. **CORS:** Backend only accepts POST requests

## File Locations

```
project-root/
├── index.html (Updated)
├── products.html (Updated)
├── about.html (Updated)
├── contact.html (Updated)
├── save-quote.php (NEW)
├── js/
│   ├── main.js (NEW)
│   ├── products.js (Existing - No changes)
├── css/
│   ├── styles.scss (Updated)
│   └── styles.css (Updated)
└── quotes/ (Auto-created by PHP)
    ├── quote_2026-04-16_PHONENUMBER.txt
    └── all_quotes.txt
```

## Testing the Feature

1. Open any page (index.html, products.html, about.html, contact.html)
2. Click "Request a Quote" button (in navbar or hero section)
3. Fill in the form fields
4. Submit
5. Check the `/quotes` folder for saved quote files

## Browser Compatibility

- Modern browsers with ES6 support
- Works with: Chrome, Firefox, Safari, Edge
- Mobile browsers: iOS Safari, Chrome Mobile, Firefox Mobile, Samsung Internet

## Notes

- The modal automatically populates product list from the products.js array
- Products on the modal will be exactly the same as those in your products database
- Phone number validation accepts both Indian format (10 digits) and international (+91 format)
- All submitted quotes are automatically timestamped

## Future Enhancements (Optional)

1. Email integration to notify admin of new quotes
2. SMS notification via WhatsApp Business API
3. Quote management dashboard
4. PDF quote generation
5. Customer quote history tracking
6. Automatic email to customer with quote reference number

# Quote Submission - Troubleshooting Guide

## What to Do Next:

### 1. **Check Browser Console for Detailed Error**
   - Press **F12** when on your website
   - Go to **Console** tab
   - Try submitting the quote again
   - **Copy the full error message** - this tells us exactly what's wrong

### 2. **Make Sure PHP Server is Running**

If using PHP built-in server:
```powershell
cd "d:\Work\VSYNC\Ajanta Paper Mart\Ajanta-Paper-Mart"
php -S localhost:8000
```

Then access: `http://localhost:8000`

### 3. **Check Error Log**

After trying to submit, check for error log:
```powershell
cd "d:\Work\VSYNC\Ajanta Paper Mart\Ajanta-Paper-Mart\quotes"
Get-ChildItem  # Look for php_errors.log
```

If `php_errors.log` exists, read it:
```powershell
Get-Content php_errors.log
```

### 4. **Test PHP Directly**

Create a test file to verify PHP works:
```powershell
# Navigate to project folder
cd "d:\Work\VSYNC\Ajanta Paper Mart\Ajanta-Paper-Mart"

# Create a simple test
@"
<?php
echo json_encode(['success' => true, 'message' => 'PHP is working']);
?>
"@ | Out-File test.php

# Test it with PHP
php -r "include 'test.php';"
```

### 5. **Verify File Permissions**

Check quotes folder is writable:
```powershell
cd "d:\Work\VSYNC\Ajanta Paper Mart\Ajanta-Paper-Mart"
icacls quotes /grant Everyone:F
```

---

## Common Issues & Fixes:

| Issue | Solution |
|-------|----------|
| "Cannot POST save-quote.php" | Make sure you're running PHP server (php -S localhost:8000) |
| "JSON parsing error" | PHP has syntax error. Check server logs |
| "Permission denied" | Run `icacls quotes /grant Everyone:F` |
| "Bad Request" | Phone number validation failed. Must be 10 digits |
| "save-quote.php not found" | Make sure file is in root directory (not in a subfolder) |

---

## What Changed:

✅ Created `/quotes` folder (done)  
✅ Improved error logging in save-quote.php  
✅ Added detailed error reporting in main.js  

---

## Next Steps:

1. Try submitting the quote again
2. Check the browser console (F12) for the error message
3. Share that error message with me
4. Check the error log: `/quotes/php_errors.log`

This will help us identify exactly what's wrong!

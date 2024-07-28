document.getElementById('generate-btn').addEventListener('click', generateQRCodes);

function generateQRCodes() {
    console.log("Button clicked");

    const numbers = document.getElementById('numbers').value.split(',');
    if (numbers.length === 0 || numbers[0].trim() === "") {
        console.error("No numbers provided");
        return;
    }
    console.log("Numbers:", numbers);

    // Create a new window for preview
    const previewWindow = window.open("", "_blank", "width=800,height=600");
    previewWindow.document.write(`
        <html>
        <head>
            <title>QR Code Preview</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .qr-container { display: flex; align-items: center; margin-bottom: 15px; }
                .qr-code { width: 70px; height: 70px; margin-right: 15px; }
                .number-text { margin-left: 10px; }
            </style>
        </head>
        <body>
            <div id='preview-container'></div>
        </body>
        </html>
    `);

    const previewContainer = previewWindow.document.getElementById('preview-container');

    numbers.forEach((number) => {
        console.log("Generating QR code for:", number.trim());

        // Create a div for each QR code and number
        const qrDiv = previewWindow.document.createElement('div');
        qrDiv.className = 'qr-container';

        // Generate QR code
        const qrCodeElement = document.createElement('div');
        qrCodeElement.className = 'qr-code';
        new QRCode(qrCodeElement, {
            text: number.trim(),
            width: 70,
            height: 70,
        });

        // Create a text element for the number
        const numberText = previewWindow.document.createElement('span');
        numberText.className = 'number-text';
        numberText.textContent = number.trim();

        // Add QR code and number to the container
        qrDiv.appendChild(qrCodeElement);
        qrDiv.appendChild(numberText);
        previewContainer.appendChild(qrDiv);
    });

    previewWindow.document.close();
}

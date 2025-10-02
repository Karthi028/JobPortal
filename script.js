const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to the full window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// The characters used in the Matrix effect (mix of Katakana, numbers, and symbols)
const characters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789$+-*/=^';

// Convert the string into an array of single characters
const matrixChars = characters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize; // Calculate number of columns

// An array to store the Y coordinate (row) for each rain drop (column)
// Initially set to 1, meaning the first character will start at the top
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// The main draw loop that runs continuously
function draw() {
    // 1. **Create the Trail Effect:**
    // Draw a transparent black rectangle over the entire canvas. 
    // This slowly fades the existing characters, creating the rain trail.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Set the text style
    ctx.fillStyle = '#0F0'; // Neon green text
    ctx.font = fontSize + 'px monospace'; // Use a monospace font for clean columns

    // 3. Loop through each drop/column
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character for the current drop
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        // Draw the character: x = column index * font size, y = drop height * font size
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Send the drop back to the top once it's gone off-screen,
        // but add a randomness (0.975 chance) to scatter the reset points and make the rain look more natural.
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment the Y coordinate for the next frame
        drops[i]++;
    }
}

// Run the draw function repeatedly, creating the animation
// 33ms is roughly 30 frames per second (1000ms / 30fps ≈ 33ms)
setInterval(draw, 33);

// Handle window resizing to keep the effect full screen
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-calculate drops array and column count here if needed, 
    // but the current setup should generally handle it smoothly for most purposes.
});
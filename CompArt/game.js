// CONFIGURATION: Add your image filenames here
const referenceImages = [
    'arweltatty-daisy-10294239.jpg','k_michels-malaysia-10445550.jpg', 'leeyen56-woman-7475383.jpg', 'raniramli-road-7735559.jpg', 'daniel64-asian-3565277.jpg'];

// CONFIGURATION: Add your composition category filenames here (saved in composition_cat/)
const compositionCategories = [
    'center.png', 'horizontal.png', 'triangle.png' 
];

const colorPaletteHex = ['#000000', '#FFFFFF', '#dfcbb5', '#a67c52', '#51685c', '#D9534F', '#5BC0DE', '#F0AD4E', '#5CB85C', '#6f42c1'];

// DOM Elements
const refImageEl = document.getElementById('reference-image');
const overlayImageEl = document.getElementById('guide-overlay');
const randomBtn = document.getElementById('random-image-btn');
const overlayBtn = document.getElementById('toggle-overlay-btn');
const categoryGrid = document.getElementById('category-grid');
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('canvas-wrapper');

// Phase 2 DOM Elements
const sizeSlider = document.getElementById('size-slider');
const opacitySlider = document.getElementById('opacity-slider');
const colorPaletteContainer = document.getElementById('color-palette');

let currentImageName = '';
let isDrawing = false;
let activeColor = '#000000';
let currentPhase = 1;

// Setup Canvas Resolution
function initCanvas() {
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', initCanvas);
initCanvas(); // Initial call

// 1. Load Reference Images
function loadRandomImage() {
    const randomFile = referenceImages[Math.floor(Math.random() * referenceImages.length)];
    currentImageName = randomFile;
    const path = `images/${randomFile}`;
    refImageEl.src = path;
    overlayImageEl.src = path;
}
randomBtn.addEventListener('click', loadRandomImage);
loadRandomImage(); // Load first image on start

// 2. Overlay Toggle
overlayBtn.addEventListener('click', () => {
    overlayImageEl.classList.toggle('hidden');
    if (overlayImageEl.classList.contains('hidden')) {
        overlayBtn.innerText = '👁️ Show Guide Overlay';
    } else {
        overlayBtn.innerText = '🚫 Hide Guide Overlay';
    }
});

// 3. Populate Categories
compositionCategories.forEach(fileName => {
    const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " "); // Removes extension and underscores
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
        <img src="composition_cat/${fileName}" alt="${cleanName}">
        <p style="text-transform: capitalize;">${cleanName}</p>
    `;
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
    });
    categoryGrid.appendChild(card);
});

// 4. Drawing Mechanics
function startPosition(e) {
    isDrawing = true;
    draw(e);
}

function endPosition() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate scaling ratio to fix Phase 2 offset
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineWidth = currentPhase === 1 ? 3 : sizeSlider.value;
    ctx.lineCap = 'round';
    
    let strokeStyle = activeColor;
    if (currentPhase === 2) {
        const opacity = opacitySlider.value / 100;
        const hex = activeColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    ctx.strokeStyle = strokeStyle;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointerup', endPosition);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerleave', endPosition);

// 5. Phase Transition & Silent Download
// 5. Phase Transition & Silent Download
document.getElementById('finish-phase1-btn').addEventListener('click', () => {
    // Gather all selected categories for your own tracking
    const selectedCards = document.querySelectorAll('.category-card.selected p');
    const selectedCategories = Array.from(selectedCards).map(p => p.innerText);
    
    const timestamp = Date.now();
    const baseFilename = currentImageName.split('.')[0];

    try {
        // Hidden local download of the structural drawing
        const dataUrl = canvas.toDataURL('image/png');
        const imgDownloadLink = document.createElement('a');
        imgDownloadLink.download = `structural_bones_${baseFilename}_${timestamp}.png`;
        imgDownloadLink.href = dataUrl;
        imgDownloadLink.click();

        // Hidden local download of tracking data (Categories)
        const trackingData = {
            image: currentImageName,
            timestamp: timestamp,
            categories: selectedCategories
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trackingData, null, 2));
        const jsonDownloadLink = document.createElement('a');
        jsonDownloadLink.download = `tracking_data_${baseFilename}_${timestamp}.json`;
        jsonDownloadLink.href = dataStr;
        jsonDownloadLink.click();
    } catch(e) {
        console.warn("Silent download blocked by local file rules, proceeding to Phase 2.");
    }

    // Force-hide the visual guide overlay for Phase 2
    overlayImageEl.classList.add('hidden');

    // Switch Interface
    document.getElementById('phase-1').classList.replace('active-phase', 'hidden-phase');
    document.getElementById('phase-2').classList.replace('hidden-phase', 'active-phase');
    
    // Set up Phase 2 tools
    currentPhase = 2;
    document.getElementById('phase-2').appendChild(wrapper); 
});

// 6. Phase 2 Tools Setup
colorPaletteHex.forEach(hex => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = hex;
    if (hex === activeColor) swatch.classList.add('selected');
    
    swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        activeColor = hex;
    });
    colorPaletteContainer.appendChild(swatch);
});

// 7. Final Export & Email
document.getElementById('send-email-btn').addEventListener('click', () => {
    try {
        const timestamp = Date.now();
        const dataUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `my-abstract-masterpiece-${timestamp}.png`;
        downloadLink.href = dataUrl;
        downloadLink.click();

        const subject = encodeURIComponent("My Abstract Masterpiece!");
        const body = encodeURIComponent(`Check out my abstract art!\n\nI abstracted away the image "${currentImageName}" by finding its compositional curves and creating something entirely new.\n\nTry it yourself at https://doreenhii.github.io/HiiEyeLab/!`);
        
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        
    } catch (error) {
        alert("⚠️ Download Blocked! Ensure you are viewing this via a web server or GitHub pages to export images.");
    }
});
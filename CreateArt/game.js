// CONFIGURATION: Add your image filenames here!
const itemImages = ['artybeestudio-sun-hat-9551750_1920.png', 'billithecat-cypress-5364694_1920.png', 'cerisemuscate-milan-2409580_1920.png', 'clker-free-vector-images-boy-306170_1920.png', 'clker-free-vector-images-buildings-48852_1920.png', 'clker-free-vector-images-cabin-310330_1920.png', 'clker-free-vector-images-car-33633_1920.png', 'clker-free-vector-images-car-35263_1920.png', 'clker-free-vector-images-city-306873_1920.png', 'clker-free-vector-images-city-48851_1920.png', 'clker-free-vector-images-cloud-309024_1920.png', 'clker-free-vector-images-cloud-47582_1920.png', 'clker-free-vector-images-full-moon-308007_1920.png', 'clker-free-vector-images-girl-307915_1920.png', 'clker-free-vector-images-happy-312756_1920.png', 'clker-free-vector-images-mushroom-304246_1920.png', 'clker-free-vector-images-pine-304951_1920.png', 'clker-free-vector-images-skyscrapers-48853_1920.png', 'clker-free-vector-images-sun-312708_1920.png', 'clker-free-vector-images-yo-yo-312175_1920.png', 'creativecanvasdesign-adobo-10322103_1920.png', 'dandelion_tea-cherry-blossom-7081566_1920.png', 'darkmoon_art-frame-7331851_1920.png', 'dueg-oth-house-7833067_1920.png', 'dueg-oth-tree-7846968_1920.png', 'eommina-family-1976162_1920.png', 'gdj-ai-generated-8919324_1920.png', 'gdj-bavaria-4261244_1920.png', 'gdj-forest-6785128_1920.png', 'gdj-landscape-5207078_1920.png', 'gdj-trees-7912342_1920.png', 'jampole-sun-5379103_1920.png', 'kropekk_pl-the-sun-349394_1920.png', 'merio-boy-1299084_1920.png', 'milaoktasafitri-mountain-9746534_1920.png', 'milucernochova-little-girl-1443463_1920.png', 'myrandomarts-buildings-7425261_1920.png', 'openclipart-vectors-animals-2022610_1920.png', 'openclipart-vectors-bmw-158703_1920.png', 'openclipart-vectors-boy-1298788_1920.png', 'openclipart-vectors-boy-1300136_1920.png', 'openclipart-vectors-boy-1300621_1920.png', 'openclipart-vectors-boy-147797_1920.png', 'openclipart-vectors-building-1295569_1920.png', 'openclipart-vectors-building-1297154_1920.png', 'openclipart-vectors-car-158548_1920.png', 'openclipart-vectors-car-158795_1920.png', 'openclipart-vectors-chicken-159496_1920.png', 'openclipart-vectors-child-1299686_1920.png', 'openclipart-vectors-child-2025936_1920.png', 'openclipart-vectors-comic-2029764_1920.png', 'openclipart-vectors-house-1298848_1920.png', 'openclipart-vectors-leaves-155882_1920.png', 'openclipart-vectors-market-575842_1920.png', 'openclipart-vectors-moon-159383_1920.png', 'openclipart-vectors-neighbors-156089_1920.png', 'openclipart-vectors-palm-tree-1297489_1920.png', 'openclipart-vectors-passenger-car-155267_1920.png', 'openclipart-vectors-shop-150362_1920.png', 'openclipart-vectors-shop-158317_1920.png', 'openclipart-vectors-tree-576847_1920.png', 'paligraficas-father-and-son-7299684_1920.png', 'raphaeljeanneret-family-8493097_1920.png', 'resampled-house-3562064_1920.png', 'ricinator-supermarket-2011060_1920.png'];

// Colors (7 Hues: Red, Orange, Yellow, Green, Blue, Purple, Neutral)
const colorPaletteHex = [
    // Row 1 (Lightest / Pastels)
    '#FDECEE', '#FDF0E6', '#FDF6E3', '#EAF2EB', '#EBF1F5', '#F2EBF4', '#FFFFFF',
    // Row 2 (Soft / Tints)
    '#F6C8CE', '#F7D2B6', '#F5E4A9', '#C7DCCB', '#C2D6E6', '#D9C5DE', '#D1D1D1',
    // Row 3 (Mid-Tones / Base Hues)
    '#E28A96', '#E69F6B', '#D9B758', '#8FB396', '#88A9C4', '#AD8EBA', '#9E9E9E',
    // Row 4 (Deep / Shades)
    '#B34B5A', '#B86330', '#A38329', '#547A5C', '#4B6F8C', '#7A5B87', '#595959',
    // Row 5 (Darkest / Near Black)
    '#591C25', '#5E2F12', '#52400F', '#234229', '#1D394F', '#3B2642', '#1A1A1A'
];

const bgCanvas = document.getElementById('bg-canvas');
const ctx = bgCanvas.getContext('2d');
const artCanvas = document.getElementById('art-canvas');
const canvasWrapper = document.getElementById('canvas-wrapper');
const toolMode = document.getElementById('tool-mode');
const lineThickness = document.getElementById('line-thickness');
const colorPaletteContainer = document.getElementById('color-palette');

// Interface Selectors
const sizeSlider = document.getElementById('size-slider');
const rotateSlider = document.getElementById('rotate-slider');
const opacitySlider = document.getElementById('opacity-slider');
const mirrorBtn = document.getElementById('mirror-btn');
const layerUpBtn = document.getElementById('layer-up-btn');
const layerDownBtn = document.getElementById('layer-down-btn');
const resizeBox = document.getElementById('resize-control-box');
const itemLibrary = document.getElementById('item-library');
const gridOverlay = document.getElementById('grid-overlay');
const gridToggle = document.getElementById('grid-toggle');

let selectedElement = null;
let isDrawing = false;
let historyStack = [];
let redoStack = [];
let isFirstLoad = true;
let activeColor = colorPaletteHex[24]; // Default to a middle cream color

// Initialize Color Palette
colorPaletteHex.forEach(hex => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    swatch.style.backgroundColor = hex;
    if (hex === activeColor) swatch.classList.add('selected');
    
    swatch.addEventListener('pointerdown', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        activeColor = hex;
    });
    colorPaletteContainer.appendChild(swatch);
});

// Dynamic Canvas Auto-Scaling Resolution Engine
function resizeCanvasToFitScreen() {
    const areaWidth = document.getElementById('canvas-area').clientWidth - 40;
    const areaHeight = document.getElementById('canvas-area').clientHeight - 40;
    
    const targetRatio = 4 / 3;
    let width = areaWidth;
    let height = areaWidth / targetRatio;
    
    if (height > areaHeight) {
        height = areaHeight;
        width = areaHeight * targetRatio;
    }
    
    let tempImage = null;
    if (bgCanvas.width > 0 && !isFirstLoad) {
        tempImage = ctx.getImageData(0, 0, bgCanvas.width, bgCanvas.height);
    }
    
    canvasWrapper.style.width = `${width}px`;
    canvasWrapper.style.height = `${height}px`;
    bgCanvas.width = width;
    bgCanvas.height = height;
    
    if (tempImage) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = tempImage.width;
        tempCanvas.height = tempImage.height;
        tempCanvas.getContext('2d').putImageData(tempImage, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, width, height);
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        isFirstLoad = false;
    }
}

window.addEventListener('resize', resizeCanvasToFitScreen);
resizeCanvasToFitScreen();
saveState();

function saveState() {
    historyStack.push(ctx.getImageData(0, 0, bgCanvas.width, bgCanvas.height));
    redoStack = [];
}

// 1. Initialize Asset Library Grid
itemImages.forEach(fileName => {
    const img = document.createElement('img');
    img.src = `items/${fileName}`;
    img.alt = fileName;
    
    img.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); 
        createPlacedItem(`items/${fileName}`);
    });
    
    itemLibrary.appendChild(img);
});

// 2. Transformation Mechanics
function createPlacedItem(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('placed-item');
    
    const currentW = bgCanvas.width;
    const currentH = bgCanvas.height;
    
    img.style.width = `${Math.floor(currentW * 0.15)}px`; 
    img.style.left = `${Math.floor((currentW / 2) - (currentW * 0.075))}px`;
    img.style.top = `${Math.floor((currentH / 2) - (currentH * 0.075))}px`;
    img.style.zIndex = '10';
    img.style.touchAction = 'none'; 
    
    img.dataset.angle = "0";
    img.dataset.flipped = "false";
    img.dataset.opacity = "100";

    img.addEventListener('pointerdown', startDrag);
    artCanvas.appendChild(img);
    selectItem(img);
}

function updateVisualTransforms(item) {
    const angle = item.dataset.angle;
    const isFlipped = item.dataset.flipped === "true";
    const opacity = item.dataset.opacity;
    
    item.style.transform = `rotate(${angle}deg) scaleX(${isFlipped ? -1 : 1})`;
    item.style.opacity = opacity / 100;
}

function startDrag(e) {
    // Automatically enters adjustment mode without requiring a dropdown change
    e.stopPropagation();
    selectItem(e.target);
    const item = e.target;
    item.setPointerCapture(e.pointerId); 
    
    let shiftX = e.clientX - item.getBoundingClientRect().left;
    let shiftY = e.clientY - item.getBoundingClientRect().top;

    if (item.dataset.angle !== "0") {
        shiftX = item.offsetWidth / 2;
        shiftY = item.offsetHeight / 2;
    }

    function moveAt(clientX, clientY) {
        let rect = artCanvas.getBoundingClientRect();
        let x = clientX - rect.left - shiftX;
        let y = clientY - rect.top - shiftY;
        
        let halfWidth = item.offsetWidth / 2;
        let halfHeight = item.offsetHeight / 2;

        item.style.left = Math.max(-halfWidth, Math.min(x, rect.width - halfWidth)) + 'px';
        item.style.top = Math.max(-halfHeight, Math.min(y, rect.height - halfHeight)) + 'px';
    }

    function onPointerMove(e) { moveAt(e.clientX, e.clientY); }
    item.addEventListener('pointermove', onPointerMove);
    
    item.addEventListener('pointerup', function onPointerUp() {
        item.removeEventListener('pointermove', onPointerMove);
        item.removeEventListener('pointerup', onPointerUp);
    });
}

function selectItem(element) {
    if (selectedElement) selectedElement.classList.remove('selected');
    selectedElement = element;
    if (element) {
        selectedElement.classList.add('selected');
        sizeSlider.value = parseInt(selectedElement.style.width);
        rotateSlider.value = selectedElement.dataset.angle;
        opacitySlider.value = selectedElement.dataset.opacity;
        resizeBox.classList.remove('hidden');
    } else {
        resizeBox.classList.add('hidden');
    }
}

// Slider / Button Form Controls
sizeSlider.addEventListener('input', (e) => {
    if (selectedElement) selectedElement.style.width = e.target.value + 'px';
});

rotateSlider.addEventListener('input', (e) => {
    if (selectedElement) {
        selectedElement.dataset.angle = e.target.value;
        updateVisualTransforms(selectedElement);
    }
});

opacitySlider.addEventListener('input', (e) => {
    if (selectedElement) {
        selectedElement.dataset.opacity = e.target.value;
        updateVisualTransforms(selectedElement);
    }
});

mirrorBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    if (selectedElement) {
        const currentFlipped = selectedElement.dataset.flipped === "true";
        selectedElement.dataset.flipped = !currentFlipped;
        updateVisualTransforms(selectedElement);
    }
});

layerUpBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    if (selectedElement) {
        let currentZ = parseInt(selectedElement.style.zIndex) || 10;
        selectedElement.style.zIndex = currentZ + 1;
    }
});

layerDownBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    if (selectedElement) {
        let currentZ = parseInt(selectedElement.style.zIndex) || 10;
        selectedElement.style.zIndex = Math.max(1, currentZ - 1);
    }
});

document.getElementById('delete-item').addEventListener('pointerdown', () => {
    if (selectedElement) { selectedElement.remove(); selectItem(null); }
});

gridToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        gridOverlay.classList.remove('hidden');
    } else {
        gridOverlay.classList.add('hidden');
    }
});

// 3. Drawing and Partition Vector Architecture
bgCanvas.addEventListener('pointerdown', (e) => {
    const rect = bgCanvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    if (toolMode.value === 'draw-partition') {
        isDrawing = true;
        bgCanvas.setPointerCapture(e.pointerId);
        ctx.beginPath();
        ctx.moveTo(x, y);
        // Updated line thickness from UI state
        ctx.lineWidth = parseFloat(lineThickness.value);
        ctx.strokeStyle = activeColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    } else if (toolMode.value === 'fill-section') {
        floodFill(x, y, activeColor);
        saveState();
    }
});

bgCanvas.addEventListener('pointermove', (e) => {
    if (!isDrawing || toolMode.value !== 'draw-partition') return;
    const rect = bgCanvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

bgCanvas.addEventListener('pointerup', () => {
    if (isDrawing && toolMode.value === 'draw-partition') {
        isDrawing = false;
        saveState();
    }
});

document.getElementById('undo-btn').addEventListener('pointerdown', () => {
    if (historyStack.length > 1) {
        redoStack.push(historyStack.pop());
        ctx.putImageData(historyStack[historyStack.length - 1], 0, 0);
    }
});

document.getElementById('redo-btn').addEventListener('pointerdown', () => {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        ctx.putImageData(nextState, 0, 0);
        historyStack.push(nextState);
    }
});

document.addEventListener('pointerdown', (e) => {
    if (!e.target.classList.contains('placed-item') && !resizeBox.contains(e.target)) {
        selectItem(null);
    }
});

// 4. Flood Fill (Color Bucket Processing Engine)
function floodFill(startX, startY, fillColor) {
    const width = bgCanvas.width;
    const height = bgCanvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const hex = fillColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const targetColor = getPixelColor(startX, startY);
    if (colorMatch(targetColor, [r, g, b, 255])) return;

    const queue = [[startX, startY]];

    while (queue.length > 0) {
        const [cx, cy] = queue.shift();
        const currentColor = getPixelColor(cx, cy);

        if (colorMatch(currentColor, targetColor)) {
            setPixelColor(cx, cy, r, g, b);
            
            if (cx > 0) queue.push([cx - 1, cy]);
            if (cx < width - 1) queue.push([cx + 1, cy]);
            if (cy > 0) queue.push([cx, cy - 1]);
            if (cy < height - 1) queue.push([cx, cy + 1]);
        }
    }
    ctx.putImageData(imageData, 0, 0);

    function getPixelColor(x, y) {
        const idx = (y * width + x) * 4;
        return [data[idx], data[idx+1], data[idx+2], data[idx+3]];
    }
    function setPixelColor(x, y, r, g, b) {
        const idx = (y * width + x) * 4;
        data[idx] = r; data[idx+1] = g; data[idx+2] = b; data[idx+3] = 255;
    }
    function colorMatch(c1, c2) {
        return Math.abs(c1[0] - c2[0]) < 20 && Math.abs(c1[1] - c2[1]) < 20 && Math.abs(c1[2] - c2[2]) < 20;
    }
}

// 5. Canvas Compositor & PNG Exporter
document.getElementById('save-email-btn').addEventListener('pointerdown', () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = bgCanvas.width;
    exportCanvas.height = bgCanvas.height;
    const exportCtx = exportCanvas.getContext('2d');

    exportCtx.drawImage(bgCanvas, 0, 0);

    const items = Array.from(document.querySelectorAll('.placed-item'));

    items.sort((a, b) => {
        return (parseInt(a.style.zIndex) || 10) - (parseInt(b.style.zIndex) || 10);
    });

    items.forEach(item => {
        const w = item.offsetWidth;
        const h = item.offsetHeight;
        
        const x = parseInt(item.style.left) + w / 2;
        const y = parseInt(item.style.top) + h / 2;
        
        const angleRad = (parseInt(item.dataset.angle) * Math.PI) / 180;
        const isFlipped = item.dataset.flipped === "true";
        const alpha = parseInt(item.dataset.opacity) / 100;

        exportCtx.save();
        exportCtx.translate(x, y);
        exportCtx.rotate(angleRad);
        exportCtx.scale(isFlipped ? -1 : 1, 1);
        exportCtx.globalAlpha = alpha;
        
        exportCtx.drawImage(item, -w / 2, -h / 2, w, h); 
        exportCtx.restore();
    });

    processDownload(exportCanvas);
});

function processDownload(canvas) {
    const timestamp = Date.now();
    const dataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `my-artwork_${timestamp}.png`;
    downloadLink.href = dataUrl;
    downloadLink.click();

    const subject = encodeURIComponent("My Masterpiece!");
    const body = encodeURIComponent("Check out my artwork!\n\nI created this piece via HiiEyeLab, an initiative where Dr. Hii breaks down human vision science in a fun and creative way. Want to explore the science of sight? \n\nVisit https://doreenhii.github.io/HiiEyeLab/ to learn more!");
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

document.getElementById('clear-items-btn').addEventListener('pointerdown', () => {
    artCanvas.innerHTML = ''; 
    selectItem(null);
});

document.getElementById('clear-canvas').addEventListener('pointerdown', () => {
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    artCanvas.innerHTML = '';
    selectItem(null);
    historyStack = [];
    saveState();
});
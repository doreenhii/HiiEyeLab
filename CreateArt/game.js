// CONFIGURATION: Add your image filenames here!
const itemImages = ['butterfly.png', 'leaf.png', 'star.png', 'mushroom.png'];

const bgCanvas = document.getElementById('bg-canvas');
const ctx = bgCanvas.getContext('2d');
const artCanvas = document.getElementById('art-canvas');
const canvasWrapper = document.getElementById('canvas-wrapper');
const toolMode = document.getElementById('tool-mode');
const colorPicker = document.getElementById('color-picker');

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

// Dynamic Canvas Auto-Scaling Resolution Engine
function resizeCanvasToFitScreen() {
    // 1. Check how much screen space is left next to the sidebar menu
    const areaWidth = document.getElementById('canvas-area').clientWidth - 40;
    const areaHeight = document.getElementById('canvas-area').clientHeight - 40;
    
    // 2. Set an ideal luxury landscape layout ratio (4:3 aspect ratio)
    const targetRatio = 4 / 3;
    let width = areaWidth;
    let height = areaWidth / targetRatio;
    
    if (height > areaHeight) {
        height = areaHeight;
        width = areaHeight * targetRatio;
    }
    
    // 3. Save existing canvas content state before adjusting sizes
    let tempImage = null;
    if (bgCanvas.width > 0) {
        tempImage = ctx.getImageData(0, 0, bgCanvas.width, bgCanvas.height);
    }
    
    // 4. Update responsive dimensions smoothly
    canvasWrapper.style.width = `${width}px`;
    canvasWrapper.style.height = `${height}px`;
    bgCanvas.width = width;
    bgCanvas.height = height;
    
    // 5. Restore background drawings or fill with canvas white paint if fresh start
    if (tempImage) {
        // Redraw content smoothly using an offscreen canvas to match resolution scaling
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = tempImage.width;
        tempCanvas.height = tempImage.height;
        tempCanvas.getContext('2d').putImageData(tempImage, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, width, height);
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }
}

// Run layout sizing on start and listen for tablet rotation flips
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
    img.addEventListener('pointerdown', () => createPlacedItem(`items/${fileName}`));
    itemLibrary.appendChild(img);
});

// 2. Transformation Mechanics (Drag, Scale, Rotate, Z-Index)
function createPlacedItem(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('placed-item');
    
    // Center spawn points calculation based on current device screen size
    const currentW = bgCanvas.width;
    const currentH = bgCanvas.height;
    
    img.style.width = `${Math.floor(currentW * 0.15)}px`; // Scales item default size to 15% of canvas width
    img.style.left = `${Math.floor((currentW / 2) - (currentW * 0.075))}px`;
    img.style.top = `${Math.floor((currentH / 2) - (currentH * 0.075))}px`;
    img.style.zIndex = '10';
    img.style.touchAction = 'none'; // Lock preventing touchscreen window drifting
    
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
    if (toolMode.value !== 'place-items') return;
    e.stopPropagation();
    selectItem(e.target);
    const item = e.target;
    item.setPointerCapture(e.pointerId); // Forces unified lock on touch/tablet screens
    
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

        // Boundary Check: Keeps at least 50% of the element body visible safely inside borders
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

// Composition Overlay Checkbox Listener
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
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000000';
        ctx.lineCap = 'round';
    } else if (toolMode.value === 'fill-section') {
        floodFill(x, y, colorPicker.value);
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

// Canvas Buffer Navigation Controllers (Undo / Redo Core)
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

    const r = parseInt(fillColor.slice(1, 3), 16);
    const g = parseInt(fillColor.slice(3, 5), 16);
    const b = parseInt(fillColor.slice(5, 7), 16);

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
        return Math.abs(c1 - c2) < 20 && Math.abs(c1 - c2) < 20 && Math.abs(c1 - c2) < 20;
    }
}

// 5. Canvas Compositor & Pure PNG Exporter
document.getElementById('save-email-btn').addEventListener('pointerdown', () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = bgCanvas.width;
    exportCanvas.height = bgCanvas.height;
    const exportCtx = exportCanvas.getContext('2d');

    // Transfer background canvas paint data
    exportCtx.drawImage(bgCanvas, 0, 0);

    const items = Array.from(document.querySelectorAll('.placed-item'));

    // SORT BY LAYER ORDER Z-INDEX DEPTH BEFORE RENDERING FLATTENED PNG
    items.sort((a, b) => {
        return (parseInt(a.style.zIndex) || 10) - (parseInt(b.style.zIndex) || 10);
    });

    if (items.length === 0) {
        processDownload(exportCanvas);
        return;
    }

    let loadedCount = 0;
    items.forEach(item => {
        const img = new Image();
        img.src = item.src;
        img.onload = () => {
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
            
            exportCtx.drawImage(img, -w / 2, -h / 2, w, h);
            
            exportCtx.restore();
            
            loadedCount++;
            if (loadedCount === items.length) {
                processDownload(exportCanvas);
            }
        };
    });
});

function processDownload(canvas) {
    // Outputs image data as high-quality transparent vector-retaining PNG formatting
    const dataUrl = canvas.toDataURL('image/png');
    
    const downloadLink = document.createElement('a');
    downloadLink.download = 'my-artwork.png';
    downloadLink.href = dataUrl;
    downloadLink.click();

    const subject = encodeURIComponent("My Masterpiece!");
    const body = encodeURIComponent("Check out my artwork! My image downloaded successfully as 'my-composition-artwork.png'!");
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Clear Items Target Selector Hook
document.getElementById('clear-items-btn').addEventListener('pointerdown', () => {
    artCanvas.innerHTML = ''; 
    selectItem(null);
});

// Full Master Reset Clear Engine
document.getElementById('clear-canvas').addEventListener('pointerdown', () => {
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    artCanvas.innerHTML = '';
    selectItem(null);
    historyStack = [];
    saveState();
});

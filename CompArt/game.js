// CONFIGURATION: Add your image filenames here
const referenceImages = [
    'arweltatty-daisy-10294239.jpg', 'k_michels-malaysia-10445550.jpg', 'leeyen56-woman-7475383.jpg', 'raniramli-road-7735559.jpg', 'daniel64-asian-3565277.jpg'
];

// CONFIGURATION: Add your composition category filenames here (saved in composition_cat/)
const compositionCategories = [
    'center.png', 'horizontal.png', 'triangle.png' 
];

// Harmonized Palette (7 columns x 5 rows: Light to Dark)
const colorPaletteHex = [
    '#FADBD8', '#FDEBD0', '#FCF3CF', '#D5F5E3', '#D6EAF8', '#EBDEF0', '#FFFFFF',
    '#F1948A', '#F8C471', '#F7DC6F', '#82E0AA', '#85C1E9', '#C39BD3', '#D5D8DC',
    '#E74C3C', '#E67E22', '#F1C40F', '#2ECC71', '#3498DB', '#9B59B6', '#808B96',
    '#B03A2E', '#AF601A', '#B7950B', '#239B56', '#2874A6', '#76448A', '#2C3E50',
    '#641E16', '#61360F', '#7D6608', '#145A32', '#154360', '#4A235A', '#000000'
];

// DOM Elements
const refImageEl = document.getElementById('reference-image');
const overlayImageEl = document.getElementById('guide-overlay');
const randomBtn = document.getElementById('random-image-btn');
const overlayBtn = document.getElementById('toggle-overlay-btn');
const categoryGrid = document.getElementById('category-grid');
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('canvas-wrapper');
const eraserCursor = document.getElementById('eraser-cursor');

// Phase 2 Top Overlay Drawing Canvas
let phase2Canvas = null;
let phase2Ctx = null;

// Tool Controls
const p1SizeSlider = document.getElementById('p1-size-slider');
const p1DrawBtn = document.getElementById('p1-draw-btn');
const p1EraseBtn = document.getElementById('p1-erase-btn');
const p1ClearBtn = document.getElementById('p1-clear-btn');

// Phase 2 Tools
const sizeSlider = document.getElementById('size-slider');
const opacitySlider = document.getElementById('opacity-slider');
const colorPaletteContainer = document.getElementById('color-palette');
const p1ColorPaletteContainer = document.getElementById('p1-color-palette');
const p2DrawBtn = document.getElementById('p2-draw-btn');
const p2EraseBtn = document.getElementById('p2-erase-btn');
const p2RestartBtn = document.getElementById('p2-restart-btn');

let currentImageName = '';
let isDrawing = false;
let activeColor = colorPaletteHex[28]; // Default dark tone
let currentPhase = 1;
let currentTool = 'draw'; 

// Initialize Base Canvas Dimensions
function initCanvas() {
    const w = wrapper.clientWidth || 600;
    const h = wrapper.clientHeight || 450;
    
    let tempCanvasData = null;
    if (canvas.width > 0 && canvas.height > 0) {
        tempCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    canvas.width = w;
    canvas.height = h;

    if (tempCanvasData) {
        ctx.putImageData(tempCanvasData, 0, 0);
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (phase2Canvas) {
        phase2Canvas.width = w;
        phase2Canvas.height = h;
    }
}
window.addEventListener('resize', initCanvas);
initCanvas();

// 1. Load Reference Images
function loadRandomImage() {
    const randomFile = referenceImages[Math.floor(Math.random() * referenceImages.length)];
    currentImageName = randomFile;
    const path = `images/${randomFile}`;
    refImageEl.src = path;
    overlayImageEl.src = path;
}
randomBtn.addEventListener('click', loadRandomImage);
loadRandomImage();

// 2. Overlay Toggle
overlayBtn.addEventListener('click', () => {
    overlayImageEl.classList.toggle('hidden');
    overlayBtn.innerText = overlayImageEl.classList.contains('hidden') 
        ? '👁️ Show Guide Overlay' 
        : '🚫 Hide Guide Overlay';
});

// 3. Populate Categories
compositionCategories.forEach(fileName => {
    const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
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

// Populate 7x5 Palette Grids
function setupPalettes() {
    [p1ColorPaletteContainer, colorPaletteContainer].forEach(container => {
        if (!container) return;
        container.innerHTML = '';
        colorPaletteHex.forEach(hex => {
            const swatch = document.createElement('div');
            swatch.classList.add('color-swatch');
            swatch.style.backgroundColor = hex;
            if (hex === activeColor) swatch.classList.add('selected');
            
            swatch.addEventListener('pointerdown', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
                activeColor = hex;
                currentTool = 'draw';
                updateToolButtons();
            });
            container.appendChild(swatch);
        });
    });
}
setupPalettes();

// Eraser Square Cursor Indicator
function updateEraserCursor(e) {
    if (currentTool !== 'erase') {
        eraserCursor.style.display = 'none';
        return;
    }
    const rect = wrapper.getBoundingClientRect();
    const size = currentPhase === 1 ? parseFloat(p1SizeSlider.value) : parseFloat(sizeSlider.value);
    
    const x = e.clientX - rect.left - (size / 2);
    const y = e.clientY - rect.top - (size / 2);
    
    if (x >= -size && x <= rect.width && y >= -size && y <= rect.height) {
        eraserCursor.style.display = 'block';
        eraserCursor.style.width = `${size}px`;
        eraserCursor.style.height = `${size}px`;
        eraserCursor.style.left = `${x}px`;
        eraserCursor.style.top = `${y}px`;
    } else {
        eraserCursor.style.display = 'none';
    }
}

wrapper.addEventListener('pointermove', updateEraserCursor);
wrapper.addEventListener('pointerleave', () => { eraserCursor.style.display = 'none'; });

// Dual-Layer Drawing Engine
function activeCtx() {
    return (currentPhase === 2 && phase2Ctx) ? phase2Ctx : ctx;
}

function activeCanvas() {
    return (currentPhase === 2 && phase2Canvas) ? phase2Canvas : canvas;
}

function startPosition(e) {
    isDrawing = true;
    draw(e);
}

function endPosition() {
    isDrawing = false;
    activeCtx().beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    const targetCanvas = activeCanvas();
    const targetCtx = activeCtx();
    
    const rect = targetCanvas.getBoundingClientRect();
    const scaleX = targetCanvas.width / rect.width;
    const scaleY = targetCanvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    targetCtx.lineWidth = currentPhase === 1 ? parseFloat(p1SizeSlider.value) : parseFloat(sizeSlider.value);
    targetCtx.lineCap = 'round';
    targetCtx.lineJoin = 'round';
    
    if (currentTool === 'erase') {
        // Phase 2 erasing ONLY removes top layer drawings (Phase 1 base is untouchable)
        targetCtx.globalCompositeOperation = 'destination-out';
        targetCtx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
        targetCtx.globalCompositeOperation = 'source-over';
        let strokeStyle = activeColor;
        if (currentPhase === 2) {
            const opacity = opacitySlider.value / 100;
            const hex = activeColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        targetCtx.strokeStyle = strokeStyle;
    }

    targetCtx.lineTo(x, y);
    targetCtx.stroke();
    targetCtx.beginPath();
    targetCtx.moveTo(x, y);
}

// Bind events dynamically
function bindCanvasEvents(target) {
    target.addEventListener('pointerdown', startPosition);
    target.addEventListener('pointerup', endPosition);
    target.addEventListener('pointermove', draw);
    target.addEventListener('pointerleave', endPosition);
}
bindCanvasEvents(canvas);

// Tool Selection Handlers
function updateToolButtons() {
    p1DrawBtn.classList.toggle('active-tool', currentTool === 'draw');
    p1EraseBtn.classList.toggle('active-tool', currentTool === 'erase');
    if (p2DrawBtn) p2DrawBtn.classList.toggle('active-tool', currentTool === 'draw');
    if (p2EraseBtn) p2EraseBtn.classList.toggle('active-tool', currentTool === 'erase');
    if (currentTool !== 'erase') eraserCursor.style.display = 'none';
}

p1DrawBtn.addEventListener('click', () => { currentTool = 'draw'; updateToolButtons(); });
p1EraseBtn.addEventListener('click', () => { currentTool = 'erase'; updateToolButtons(); });
if (p2DrawBtn) p2DrawBtn.addEventListener('click', () => { currentTool = 'draw'; updateToolButtons(); });
if (p2EraseBtn) p2EraseBtn.addEventListener('click', () => { currentTool = 'erase'; updateToolButtons(); });

// Clear Phase 1 Canvas
p1ClearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// 6. Phase Transition & Layer Lock Setup
document.getElementById('finish-phase1-btn').addEventListener('click', () => {
    const selectedCards = document.querySelectorAll('.category-card.selected p');
    const selectedCategories = Array.from(selectedCards).map(p => p.innerText);
    const timestamp = Date.now();
    const baseFilename = currentImageName.split('.')[0];

    // Local Tracking Downloads
    try {
        const dataUrl = canvas.toDataURL('image/png');
        const imgDownloadLink = document.createElement('a');
        imgDownloadLink.download = `structural_bones_${baseFilename}_${timestamp}.png`;
        imgDownloadLink.href = dataUrl;
        imgDownloadLink.click();

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

    // Hide guide overlay
    overlayImageEl.classList.add('hidden');

    // Switch Phase Displays
    document.getElementById('phase-1').classList.replace('active-phase', 'hidden-phase');
    document.getElementById('phase-2').classList.replace('hidden-phase', 'active-phase');
    
    currentPhase = 2;
    currentTool = 'draw';

    // Move Canvas Wrapper to Phase 2 Layout
    document.getElementById('phase-2').insertBefore(wrapper, document.getElementById('send-email-btn'));

    // CREATE TOP LAYER CANVAS FOR PHASE 2 (PERFECT OVERLAY LOCK)
    if (!phase2Canvas) {
        phase2Canvas = document.createElement('canvas');
        phase2Canvas.id = 'phase2-drawing-canvas';
        phase2Canvas.className = 'canvas-layer';
        phase2Canvas.style.zIndex = '20';
        phase2Canvas.width = canvas.width;
        phase2Canvas.height = canvas.height;
        phase2Ctx = phase2Canvas.getContext('2d');
        wrapper.appendChild(phase2Canvas);
        bindCanvasEvents(phase2Canvas);
    }

    // Force Palette Grid Re-alignment now that Phase 2 is visible
    setupPalettes();
    updateToolButtons();
});

// Phase 2: Start Anew (Clears top layer only, preserving frozen base)
p2RestartBtn.addEventListener('click', () => {
    if (phase2Ctx) {
        phase2Ctx.clearRect(0, 0, phase2Canvas.width, phase2Canvas.height);
    }
});

// 7. Final Export & Email Composition (Flattens both layers into one PNG)
document.getElementById('send-email-btn').addEventListener('click', () => {
    try {
        // Create export canvas to merge Base Layer + Top Layer
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = canvas.width;
        exportCanvas.height = canvas.height;
        const exportCtx = exportCanvas.getContext('2d');

        // 1. Draw frozen Phase 1 base canvas
        exportCtx.drawImage(canvas, 0, 0);

        // 2. Draw Phase 2 abstract drawings over it
        if (phase2Canvas) {
            exportCtx.drawImage(phase2Canvas, 0, 0);
        }

        const timestamp = Date.now();
        const dataUrl = exportCanvas.toDataURL('image/png');
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
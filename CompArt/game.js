// CONFIGURATION: Add your image filenames here
const referenceImages = [
    'aaron-siskind_the-tree-35-1973.jpg', 'aaron-siskind_westport-10-1988.jpg', 'abidin-dino_unknown-title-2.jpg', 'abraham-manievich_flowers.jpg', 'abraham-manievich_paris-street.jpg', 'ad-reinhardt_abstract-painting-red-1952.jpg', 'ad-reinhardt_number-43-abstract-painting-yellow-1947.jpg', 'adolphe-joseph-thomas-monticelli_port-of-cassis-1884.jpg', 'adriaen-van-ostade_a-man-in-the-window.jpg', 'aki-kuroda_untitled-1988.jpg', 'albert-bloch_garden-glimpse.jpg', 'albert-gleizes_composition-1928.jpg', 'albert-marquet_fruit-knife-and-napkin-1898.jpg', 'albert-marquet_le-havre-1911.jpg', 'albrecht-durer_courtyard-of-the-former-castle-in-innsbruck-without-clouds.jpg', 'alexander-liberman_untitled-abstract-1975.jpg', 'alexandre-benois_pancake-day-in-st-petersburg-fragment-set-design(1).jpg', 'alexandre-benois_peterhof-palace-grand-cascade(2).jpg', 'alfred-sisley_grapes-and-walnuts-1876.jpg', 'alice-baber_lavender-high-1968.jpg', 'alice-baber_red-yellow-and-blue-1960.jpg', 'alvaro-lapa_criminals-and-their-properties-1974.jpg', 'amedee-ozenfant_composition-ii-1929.jpg', 'andre-bauchant_cinq-personnages-dans-un-paysage-de-montagne-1953.jpg', 'andre-bauchant_paysage-montagneux-1929.jpg', 'andre-derain_charing-cross-bridge.jpg', 'andre-derain_landscape-1907.jpg', 'andrei-ryabushkin_red-house.jpg', 'antoine-pesne_portrait-of-isaak-franz-egmont-von-chasot.jpg', 'antoine-pesne_self-portrait-with-daughters-1754.jpg', 'antonio-palolo_untitled-1968.jpg', 'armand-guillaumin_la-campagne-1895.jpg', 'arshile-gorky_the-leaf-of-the-artichoke-is-an-owl.jpg', 'arthur-pinajian_untitled-landscape-woodstock-no-4398-1962.jpg', 'arweltatty-daisy-10294239.jpg', 'atsuko-tanaka_untitled-1963.jpg', 'august-macke_vegetable-fields.jpg', 'barnett-newman_twelfh-station-1965.jpg', 'basil-beattie_cause-and-effect-iv-1973.jpg', 'BorrelldelCaso_EscapingCriticism.png', 'burhan-dogancay_whispering-wall-1983.jpg', 'camille-bombois_canoe-on-the-river.jpg', 'camille-bombois_port-de-boulogne-1927.jpg', 'camille-pissarro_the-pont-du-carrousel-afternoon-1903.jpg', 'camille-pissarro_view-through-a-window-eragny-1888.jpg', 'charles-hermans_portrait-of-a-girl-identified-as-the-artist-s-daughter.jpg', 'charles-lapicque_avant-l-orage.jpg', 'charles-lapicque_cimeti-re-marin-en-hollande-1974.jpg', 'charles-lapicque_untitled-1.jpg', 'constantin-piliuta_winter-landscape.jpg', 'daniel64-asian-3565277.jpg', 'david-burliuk_vineyard-haven-massachusetts-1929.jpg', 'JanvanEyck_PortraitOfAMan(SelfPortrait).png', 'k_michels-malaysia-10445550.jpg', 'leeyen56-woman-7475383.jpg', 'natalia-goncharova_composition-1914.jpg', 'neil-welliver_shadow-on-brigg-s-meadow.jpg', 'nicholas-krushenick_ancient-image-1984.jpg', 'nicholas-krushenick_crossover-1972.jpg', 'nicholas-krushenick_flying-circus-1965.jpg', 'nicholas-roerich_ancient-city.jpg', 'panayiotis-tetsis_still-life-1999.jpg', 'paolo-uccello_portrait-of-man-in-profile.jpg', 'paolo-uccello_roundel-with-head.jpg', 'patrick-caulfield_two-whiting-1972.jpg', 'raniramli-road-7735559.jpg', 'Shuplaik_ShyRenoir.png'
];

// CONFIGURATION: Add your composition category filenames here
const compositionCategories = [
    'center.png', 'diagonal.png', 'triangular.png', 'c-curve.png', 'circle.png', 'converging.png', 's-curve.png', 'grid-pattern.png', 'scatter.png' 
];

// CONFIGURATION: Add your createArt element/sticker filenames here
const createArtElements = ['artybeestudio-sun-hat-9551750_1920.png', 'billithecat-cypress-5364694_1920.png', 'cerisemuscate-milan-2409580_1920.png', 'clker-free-vector-images-boy-306170_1920.png', 'clker-free-vector-images-buildings-48852_1920.png', 'clker-free-vector-images-cabin-310330_1920.png', 'clker-free-vector-images-car-33633_1920.png', 'clker-free-vector-images-car-35263_1920.png', 'clker-free-vector-images-city-306873_1920.png', 'clker-free-vector-images-city-48851_1920.png', 'clker-free-vector-images-cloud-309024_1920.png', 'clker-free-vector-images-cloud-47582_1920.png', 'clker-free-vector-images-full-moon-308007_1920.png', 'clker-free-vector-images-girl-307915_1920.png', 'clker-free-vector-images-happy-312756_1920.png', 'clker-free-vector-images-mushroom-304246_1920.png', 'clker-free-vector-images-pine-304951_1920.png', 'clker-free-vector-images-skyscrapers-48853_1920.png', 'clker-free-vector-images-sun-312708_1920.png', 'clker-free-vector-images-yo-yo-312175_1920.png', 'creativecanvasdesign-adobo-10322103_1920.png', 'dandelion_tea-cherry-blossom-7081566_1920.png', 'darkmoon_art-frame-7331851_1920.png', 'dueg-oth-house-7833067_1920.png', 'dueg-oth-tree-7846968_1920.png', 'eommina-family-1976162_1920.png', 'gdj-ai-generated-8919324_1920.png', 'gdj-bavaria-4261244_1920.png', 'gdj-forest-6785128_1920.png', 'gdj-landscape-5207078_1920.png', 'gdj-trees-7912342_1920.png', 'jampole-sun-5379103_1920.png', 'kropekk_pl-the-sun-349394_1920.png', 'merio-boy-1299084_1920.png', 'milaoktasafitri-mountain-9746534_1920.png', 'milucernochova-little-girl-1443463_1920.png', 'myrandomarts-buildings-7425261_1920.png', 'openclipart-vectors-animals-2022610_1920.png', 'openclipart-vectors-bmw-158703_1920.png', 'openclipart-vectors-boy-1298788_1920.png', 'openclipart-vectors-boy-1300136_1920.png', 'openclipart-vectors-boy-1300621_1920.png', 'openclipart-vectors-boy-147797_1920.png', 'openclipart-vectors-building-1295569_1920.png', 'openclipart-vectors-building-1297154_1920.png', 'openclipart-vectors-car-158548_1920.png', 'openclipart-vectors-car-158795_1920.png', 'openclipart-vectors-chicken-159496_1920.png', 'openclipart-vectors-child-1299686_1920.png', 'openclipart-vectors-child-2025936_1920.png', 'openclipart-vectors-comic-2029764_1920.png', 'openclipart-vectors-house-1298848_1920.png', 'openclipart-vectors-leaves-155882_1920.png', 'openclipart-vectors-market-575842_1920.png', 'openclipart-vectors-moon-159383_1920.png', 'openclipart-vectors-neighbors-156089_1920.png', 'openclipart-vectors-palm-tree-1297489_1920.png', 'openclipart-vectors-passenger-car-155267_1920.png', 'openclipart-vectors-shop-150362_1920.png', 'openclipart-vectors-shop-158317_1920.png', 'openclipart-vectors-tree-576847_1920.png', 'paligraficas-father-and-son-7299684_1920.png', 'raphaeljeanneret-family-8493097_1920.png', 'resampled-house-3562064_1920.png', 'ricinator-supermarket-2011060_1920.png'];


// Harmonized Palette
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

// Ensure wrapper can hold absolute stickers correctly
wrapper.style.position = 'relative';
wrapper.style.overflow = 'hidden';

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

// 4. Setup Elements Grid (createArt merge)
function initCreateArtElements() {
    const grid = document.getElementById('p2-elements-grid');
    if(!grid) return;
    createArtElements.forEach(src => {
        const img = document.createElement('img');
        img.src = `items/${src}`;
        img.className = 'asset-thumbnail';
        img.title = "Click to add to canvas";
        img.addEventListener('click', () => addStickerToCanvas(`items/${src}`));
        grid.appendChild(img);
    });
}
initCreateArtElements();

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

p1ClearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});


// 5. STICKER LOGIC (CREATE-ART MERGE)
let activeSticker = null;
let stickerDragState = {
    isDragging: false,
    isTransforming: false,
    startX: 0, startY: 0,
    startState: null,
    center: {x:0, y:0}
};

function addStickerToCanvas(src) {
    const sticker = document.createElement('div');
    sticker.className = 'canvas-sticker';
    
    // Spawn center of canvas
    let state = { x: wrapper.clientWidth / 2, y: wrapper.clientHeight / 2, scale: 1, angle: 0 };
    sticker.style.left = '0px'; 
    sticker.style.top = '0px';
    sticker.dataset.state = JSON.stringify(state);

    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        let displayW = img.naturalWidth;
        let displayH = img.naturalHeight;
        if(displayW > 150) {
            displayH = (150 / displayW) * displayH;
            displayW = 150;
        }
        sticker.style.width = `${displayW}px`;
        sticker.style.height = `${displayH}px`;
        updateStickerTransform(sticker, state);
    };

    const handle = document.createElement('div');
    handle.className = 'sticker-handle';
    
    sticker.appendChild(img);
    sticker.appendChild(handle);
    wrapper.appendChild(sticker);

    // Double tap/click to delete
    let lastTap = 0;
    sticker.addEventListener('pointerdown', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastTap < 300 && currentTime - lastTap > 0) {
            sticker.remove(); // Delete sticker
            e.preventDefault();
            return;
        }
        lastTap = currentTime;

        if (e.target === handle) return;
        activeSticker = sticker;
        stickerDragState.isDragging = true;
        stickerDragState.startX = e.clientX;
        stickerDragState.startY = e.clientY;
        stickerDragState.startState = JSON.parse(sticker.dataset.state);
        document.querySelectorAll('.canvas-sticker').forEach(s => s.style.zIndex = 30);
        sticker.style.zIndex = 40; // Bring to front
        e.stopPropagation(); // Prevent drawing line
    });

    handle.addEventListener('pointerdown', (e) => {
        activeSticker = sticker;
        stickerDragState.isTransforming = true;
        const rect = sticker.getBoundingClientRect();
        stickerDragState.center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        stickerDragState.startX = e.clientX;
        stickerDragState.startY = e.clientY;
        stickerDragState.startState = JSON.parse(sticker.dataset.state);
        stickerDragState.startState.startDist = Math.hypot(e.clientX - stickerDragState.center.x, e.clientY - stickerDragState.center.y);
        stickerDragState.startState.startAngle = Math.atan2(e.clientY - stickerDragState.center.y, e.clientX - stickerDragState.center.x);
        document.querySelectorAll('.canvas-sticker').forEach(s => s.style.zIndex = 30);
        sticker.style.zIndex = 40; 
        e.stopPropagation(); 
        e.preventDefault();
    });
}

function updateStickerTransform(el, state) {
    el.style.transform = `translate(${state.x}px, ${state.y}px) translate(-50%, -50%) rotate(${state.angle}rad) scale(${state.scale})`;
}

// Global Drag Handlers for Stickers
window.addEventListener('pointermove', (e) => {
    if (!activeSticker) return;
    const state = JSON.parse(activeSticker.dataset.state);
    
    if (stickerDragState.isDragging) {
        const dx = e.clientX - stickerDragState.startX;
        const dy = e.clientY - stickerDragState.startY;
        state.x = stickerDragState.startState.x + dx;
        state.y = stickerDragState.startState.y + dy;
        updateStickerTransform(activeSticker, state);
        activeSticker.dataset.state = JSON.stringify(state);
    } 
    else if (stickerDragState.isTransforming) {
        const currentDist = Math.hypot(e.clientX - stickerDragState.center.x, e.clientY - stickerDragState.center.y);
        const currentAngle = Math.atan2(e.clientY - stickerDragState.center.y, e.clientX - stickerDragState.center.x);
        state.scale = stickerDragState.startState.scale * (currentDist / stickerDragState.startState.startDist);
        state.angle = stickerDragState.startState.angle + (currentAngle - stickerDragState.startState.startAngle);
        updateStickerTransform(activeSticker, state);
        activeSticker.dataset.state = JSON.stringify(state);
    }
});

window.addEventListener('pointerup', () => {
    activeSticker = null;
    stickerDragState.isDragging = false;
    stickerDragState.isTransforming = false;
});


// 6. Phase Transition & Layer Lock Setup
document.getElementById('finish-phase1-btn').addEventListener('click', async () => {
    const selectedCards = document.querySelectorAll('.category-card.selected p');
    const selectedCategories = Array.from(selectedCards).map(p => p.innerText);
    const timestamp = Date.now();
    const baseFilename = currentImageName.split('.')[0];

    // Local Tracking Downloads via ZIP
    try {
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            const dataUrl = canvas.toDataURL('image/png');
            const base64Data = dataUrl.split(',')[1]; 
            zip.file(`structural_bones_${baseFilename}_${timestamp}.png`, base64Data, {base64: true});

            const trackingData = {
                image: currentImageName,
                timestamp: timestamp,
                categories: selectedCategories
            };
            zip.file(`tracking_data_${baseFilename}_${timestamp}.json`, JSON.stringify(trackingData, null, 2));

            const content = await zip.generateAsync({type: "blob"});
            const zipDownloadLink = document.createElement('a');
            zipDownloadLink.download = `phase1_data_${baseFilename}_${timestamp}.zip`;
            zipDownloadLink.href = URL.createObjectURL(content);
            zipDownloadLink.click();
            
            setTimeout(() => URL.revokeObjectURL(zipDownloadLink.href), 100);
        } else {
            console.warn("JSZip library not found.");
        }
    } catch(e) {
        console.warn("Zip download failed or was blocked:", e);
    }

    // Hide guide overlay
    overlayImageEl.classList.add('hidden');

    // Switch Phase Displays
    document.getElementById('phase-1').classList.replace('active-phase', 'hidden-phase');
    document.getElementById('phase-2').classList.replace('hidden-phase', 'active-phase');
    
    currentPhase = 2;
    currentTool = 'draw';

    // FIX: Insert wrapper perfectly before the export section
    const exportSection = document.querySelector('.export-section');
    document.getElementById('phase-2').insertBefore(wrapper, exportSection);

    // CREATE TOP LAYER CANVAS FOR PHASE 2
    if (!phase2Canvas) {
        phase2Canvas = document.createElement('canvas');
        phase2Canvas.id = 'phase2-drawing-canvas';
        phase2Canvas.className = 'canvas-layer';
        phase2Canvas.style.zIndex = '20';
        phase2Canvas.style.position = 'absolute';
        phase2Canvas.style.top = '0';
        phase2Canvas.style.left = '0';
        phase2Canvas.width = canvas.width;
        phase2Canvas.height = canvas.height;
        phase2Ctx = phase2Canvas.getContext('2d');
        wrapper.appendChild(phase2Canvas);
        bindCanvasEvents(phase2Canvas);
    }

    setupPalettes();
    updateToolButtons();
});

// Phase 2: Start Anew (Clears top layer only, preserving frozen base)
p2RestartBtn.addEventListener('click', () => {
    if (phase2Ctx) phase2Ctx.clearRect(0, 0, phase2Canvas.width, phase2Canvas.height);
    // Remove stickers too
    document.querySelectorAll('.canvas-sticker').forEach(sticker => sticker.remove());
});

// 7. Final Export & Email Composition (Flattens all 3 layers into one PNG)
document.getElementById('send-email-btn').addEventListener('click', () => {
    try {
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = canvas.width;
        exportCanvas.height = canvas.height;
        const exportCtx = exportCanvas.getContext('2d');

        // 1. Draw Phase 1 base canvas
        exportCtx.drawImage(canvas, 0, 0);

        // 2. Draw Phase 2 abstract drawings
        if (phase2Canvas) {
            exportCtx.drawImage(phase2Canvas, 0, 0);
        }

        // 3. Draw All Stickers (CreateArt logic)
        const stickers = document.querySelectorAll('.canvas-sticker');
        stickers.forEach(sticker => {
            const state = JSON.parse(sticker.dataset.state);
            const img = sticker.querySelector('img');
            const imgWidth = sticker.offsetWidth;
            const imgHeight = sticker.offsetHeight;
            
            exportCtx.save();
            exportCtx.translate(state.x, state.y);
            exportCtx.rotate(state.angle);
            exportCtx.scale(state.scale, state.scale);
            // Draw relative to center since we translated to state.x/y
            exportCtx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
            exportCtx.restore();
        });

        const timestamp = Date.now();

        // Convert to Blob
        exportCanvas.toBlob((blob) => {
            if (!blob) return;

            // --- DOWNLOAD 1: PNG IMAGE ---
            const blobUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.download = `HEL_CompArt-${timestamp}.png`;
            downloadLink.href = blobUrl;
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            setTimeout(() => URL.revokeObjectURL(blobUrl), 200);

            // --- DOWNLOAD 2: TEXT FILE (No setTimeout delay!) ---
            const userEmail = document.getElementById('user-email-input').value.trim();
            if (userEmail) {
                const textContent = `User Email: ${userEmail}\nTimestamp: ${new Date().toLocaleString()}`;
                const textBlob = new Blob([textContent], { type: 'text/plain' });
                const textUrl = URL.createObjectURL(textBlob);
                
                const textLink = document.createElement('a');
                textLink.download = `User-Email-${timestamp}.txt`;
                textLink.href = textUrl;
                
                document.body.appendChild(textLink);
                textLink.click();
                document.body.removeChild(textLink);
                
                setTimeout(() => URL.revokeObjectURL(textUrl), 200);

                // Delay ONLY the alert so it doesn't pause the browser before downloads start
                setTimeout(() => {
                    alert(`Your masterpiece has been downloaded! 🎨\n\nWe also saved the email address (${userEmail}) in a separate text file.`);
                    document.getElementById('user-email-input').value = ''; 
                }, 100);
            } else {
                setTimeout(() => {
                    alert("Your masterpiece has been downloaded! 🎨");
                }, 100);
            }
            
        }, 'image/png');
        
    } catch (error) {
        alert("⚠️ Download Blocked! Ensure you are viewing this via a web server or GitHub pages to export images.");
    }
});
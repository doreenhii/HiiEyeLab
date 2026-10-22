const overlay = document.getElementById('screen-overlay');
const msg = document.getElementById('msg');
const container = document.getElementById('game-container');
const highScoreDisplay = document.getElementById('high-score-display');
const resetScoreBtn = document.getElementById('reset-score-btn');
const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const streakCounter = document.getElementById('streak-counter');
const errorAlertBanner = document.getElementById('error-alert-banner');

const validDirections = ['<', '>', '^', 'v'];
const distractorSymbols = ['-', '~', '#', '@', '*', '?', '}', '\\', 'c', '7', '4'];

const symbolToKeyMap = {
    '<': 'ArrowLeft',
    '>': 'ArrowRight',
    '^': 'ArrowUp',
    'v': 'ArrowDown'
};

const hardModeInversionMap = {
    '<': 'ArrowRight', 
    '>': 'ArrowLeft',  
    '^': 'ArrowDown',  
    'v': 'ArrowUp'     
};

let correctStreak = 0;
let startTime;
let gameActive = false;
let currentTargetSymbol = '';
let totalTrialElapsedTime = 0;
let errorTimeout = null;
const targetStreakGoal = 5;

// Physics and Animation State
let activeElements = [];
let animationFrameId = null;

function getLocalStorageKey() {
    return `hiiEyeLab_sortingBest_${difficultySelect.value}`;
}

function updateHighScoreUI() {
    const key = getLocalStorageKey();
    let storedBest = localStorage.getItem(key);
    if (storedBest) {
        highScoreDisplay.innerText = `Personal Best (${difficultySelect.value.toUpperCase()}): ${storedBest} ms`;
        resetScoreBtn.style.display = 'inline-block';
    } else {
        highScoreDisplay.innerText = `Personal Best (${difficultySelect.value.toUpperCase()}): No records yet`;
        resetScoreBtn.style.display = 'none';
    }
}

difficultySelect.addEventListener('change', updateHighScoreUI);
updateHighScoreUI();

startBtn.addEventListener('pointerdown', startGame);

function startGame() {
    correctStreak = 0;
    totalTrialElapsedTime = 0;
    gameActive = true;
    overlay.style.display = 'none';
    if (errorTimeout) clearTimeout(errorTimeout);
    errorAlertBanner.classList.add('hidden');
    updateStreakCounterUI();
    
    // Clear any existing old targets from HTML
    const oldTarget = document.getElementById('target');
    if (oldTarget) oldTarget.remove();
    
    spawnFrame();
    animationFrameId = requestAnimationFrame(updatePhysics);
}

function updateStreakCounterUI() {
    streakCounter.innerText = `Correct Actions Counter: ${correctStreak} / ${targetStreakGoal}`;
}

function triggerStreakFailureFeedback() {
    correctStreak = 0;
    updateStreakCounterUI();
    
    errorAlertBanner.classList.remove('hidden');
    
    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorAlertBanner.classList.add('hidden');
    }, 1200);
}

function createSymbolElement(isTarget) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.display = 'flex';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.fontSize = '3rem';
    el.style.fontWeight = 'bold';
    
    // Both target and distractor share the exact same color to prevent visual giveaways
    el.style.color = '#dfcbb5'; 
    el.style.cursor = 'pointer';
    el.style.userSelect = 'none';
    el.style.zIndex = isTarget ? '10' : '5';
    
    // Set text and state
    if (isTarget) {
        currentTargetSymbol = validDirections[Math.floor(Math.random() * validDirections.length)];
        el.innerText = currentTargetSymbol;
    } else {
        el.innerText = distractorSymbols[Math.floor(Math.random() * distractorSymbols.length)];
    }
    
    // Click events
    el.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        if (isTarget) {
            const currentMatchedDirectKey = symbolToKeyMap[currentTargetSymbol];
            processPlayerInput(currentMatchedDirectKey);
        } else {
            triggerStreakFailureFeedback();
        }
    });

    container.appendChild(el);

    // Speed multiplier based on difficulty
    const speedMult = difficultySelect.value === 'hard' ? 2.5 : 1.0;

    return {
        dom: el,
        isTarget: isTarget,
        x: Math.random() * (container.clientWidth - 50),
        y: Math.random() * (container.clientHeight - 50),
        vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5) * speedMult,
        vy: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.5) * speedMult,
        lifespan: isTarget ? Infinity : Math.random() * 200 + 150 // Frames until distractor respawns
    };
}

function spawnFrame() {
    if (!gameActive) return;
    
    // Clear arena
    activeElements.forEach(item => item.dom.remove());
    activeElements = [];
    
    // Spawn 1 Target
    activeElements.push(createSymbolElement(true));
    
    // Determine dynamic distractor count based on difficulty
    let minDistractors = 6;
    let maxDistractors = 8; // Easy: 6 to 8 distractors + 1 Target = 7 to 9 total elements
    
    if (difficultySelect.value === 'hard') {
        minDistractors = 10;
        maxDistractors = 15; // Hard: 10 to 15 distractors
    }
    
    const distractorCount = Math.floor(Math.random() * (maxDistractors - minDistractors + 1)) + minDistractors;
    
    // Spawn Distractors
    for (let i = 0; i < distractorCount; i++) {
        activeElements.push(createSymbolElement(false));
    }
    
    startTime = performance.now();
}

function updatePhysics() {
    if (!gameActive) return;

    const maxX = container.clientWidth - 40; 
    const maxY = container.clientHeight - 40;

    for (let i = activeElements.length - 1; i >= 0; i--) {
        let el = activeElements[i];

        // Move
        el.x += el.vx;
        el.y += el.vy;

        // Bounce off walls
        if (el.x <= 0 || el.x >= maxX) el.vx *= -1;
        if (el.y <= 0 || el.y >= maxY) el.vy *= -1;

        // Keep strictly in bounds
        el.x = Math.max(0, Math.min(el.x, maxX));
        el.y = Math.max(0, Math.min(el.y, maxY));

        el.dom.style.left = el.x + 'px';
        el.dom.style.top = el.y + 'px';

        // Handle distractor lifecycle
        if (!el.isTarget) {
            el.lifespan--;
            // Fade out effect
            if (el.lifespan < 30) {
                el.dom.style.opacity = el.lifespan / 30;
            }
            // Respawn
            if (el.lifespan <= 0) {
                el.dom.remove();
                activeElements.splice(i, 1);
                activeElements.push(createSymbolElement(false));
            }
        }
    }

    animationFrameId = requestAnimationFrame(updatePhysics);
}

function processPlayerInput(pressedInput) {
    if (!gameActive) return;
    
    const elapsed = performance.now() - startTime;
    const currentTierMode = difficultySelect.value;
    
    let expectedCorrectKey = null;
    if (currentTierMode === 'easy') {
        expectedCorrectKey = symbolToKeyMap[currentTargetSymbol];
    } else {
        expectedCorrectKey = hardModeInversionMap[currentTargetSymbol];
    }
    
    if (pressedInput === expectedCorrectKey) {
        correctStreak++;
        totalTrialElapsedTime += elapsed;
        errorAlertBanner.classList.add('hidden');
        
        // This updates the text on the screen!
        updateStreakCounterUI(); 
        
        if (correctStreak >= targetStreakGoal) {
            endGameSession();
        } else {
            spawnFrame();
        }
    } else {
        triggerStreakFailureFeedback();
    }
}

window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault(); 
        processPlayerInput(e.key);
    }
});

document.querySelectorAll('.dpad-btn').forEach(btn => {
    btn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        const targetedDirection = e.target.getAttribute('data-dir');
        processPlayerInput(targetedDirection);
    });
});

function endGameSession() {
    gameActive = false;
    cancelAnimationFrame(animationFrameId);
    
    activeElements.forEach(item => item.dom.remove());
    activeElements = [];
    
    errorAlertBanner.classList.add('hidden');
    
    const finalAverage = Math.round(totalTrialElapsedTime / targetStreakGoal);
    overlay.style.display = 'flex';
    
    let evaluation = "";
    if (finalAverage < 350) {
        evaluation = "🎖️ Soldier / Pro Athlete Sorting Processing Speeds!";
    } else if (finalAverage < 550) {
        evaluation = "⚡ Excellent Complex Spatial Coordination!";
    } else {
        evaluation = "👁️ Clear identification tracking! Practice to decrease speed values.";
    }

    const key = getLocalStorageKey();
    let currentBest = localStorage.getItem(key);
    
    if (!currentBest || finalAverage < parseInt(currentBest)) {
        localStorage.setItem(key, finalAverage);
        evaluation = `🎉 NEW TRIAL TIER RECORD!<br><span style="font-size: 1.1rem; color: #dfcbb5;">Cognitive velocity updated!</span><br><br>${evaluation}`;
    }

    updateHighScoreUI();

    msg.innerHTML = `Test Complete!<br><span style="color:#dfcbb5; font-family:'Playfair Display', serif; font-size:2.5rem; display:block; margin: 10px 0;">${finalAverage} ms</span>${evaluation}`;
    startBtn.innerText = "TRY TESTING AGAIN";
}

resetScoreBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    if (confirm(`Clear this tablet's local personal record score for the active level tier?`)) {
        localStorage.removeItem(getLocalStorageKey());
        updateHighScoreUI();
    }
});
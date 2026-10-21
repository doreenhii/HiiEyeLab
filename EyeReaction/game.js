const target = document.getElementById('target');
const overlay = document.getElementById('screen-overlay');
const msg = document.getElementById('msg');
const container = document.getElementById('game-container');
const highScoreDisplay = document.getElementById('high-score-display');
const resetScoreBtn = document.getElementById('reset-score-btn');
const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const streakCounter = document.getElementById('streak-counter');
const errorAlertBanner = document.getElementById('error-alert-banner');

// Updated configuration array containing the requested novel distractors
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
let currentSymbol = '';
let totalTrialElapsedTime = 0;
let errorTimeout = null;
const targetStreakGoal = 5;

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
    spawnTargetElement();
}

function updateStreakCounterUI() {
    streakCounter.innerText = `Correct Actions Counter: ${correctStreak} / ${targetStreakGoal}`;
}

function triggerStreakFailureFeedback() {
    correctStreak = 0;
    updateStreakCounterUI();
    
    // Animate the red warning banner overlay
    errorAlertBanner.classList.remove('hidden');
    
    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorAlertBanner.classList.add('hidden');
    }, 1200);
}

function spawnTargetElement() {
    if (!gameActive) return;
    
    target.style.display = 'none';
    
    // 65% true instruction code symbol, 35% random distractor symbol configuration balance
    const isDistractor = Math.random() < 0.35;
    
    if (isDistractor) {
        currentSymbol = distractorSymbols[Math.floor(Math.random() * distractorSymbols.length)];
    } else {
        currentSymbol = validDirections[Math.floor(Math.random() * validDirections.length)];
    }
    
    const delay = Math.random() * 800 + 400;
    
    setTimeout(() => {
        if (!gameActive) return;
        
        target.innerText = currentSymbol;
        
        const maxX = container.clientWidth - 60;
        const maxY = container.clientHeight - 60;
        
        const randomX = Math.random() * maxX + 30;
        const randomY = Math.random() * maxY + 30;
        
        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
        target.style.display = 'flex';
        
        startTime = performance.now();
    }, delay);
}

function processPlayerInput(pressedInput) {
    if (!gameActive || target.style.display === 'none') return;
    
    const elapsed = performance.now() - startTime;
    const currentTierMode = difficultySelect.value;
    const isDistractorSymbol = distractorSymbols.includes(currentSymbol);
    
    let expectedCorrectKey = null;
    
    if (!isDistractorSymbol) {
        if (currentTierMode === 'easy') {
            expectedCorrectKey = symbolToKeyMap[currentSymbol];
        } else {
            expectedCorrectKey = hardModeInversionMap[currentSymbol];
        }
    }
    
    if (isDistractorSymbol) {
        // Pressing any input during a distractor breaks the sequence streak immediately
        triggerStreakFailureFeedback();
    } else if (pressedInput === expectedCorrectKey) {
        correctStreak++;
        totalTrialElapsedTime += elapsed;
        // Suppress visual errors if a correct choice recovery sequence was performed quickly
        errorAlertBanner.classList.add('hidden');
    } else {
        triggerStreakFailureFeedback();
    }
    
    updateStreakCounterUI();
    
    if (correctStreak >= targetStreakGoal) {
        endGameSession();
    } else {
        spawnTargetElement();
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

target.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    const currentMatchedDirectKey = symbolToKeyMap[currentSymbol] || 'InvalidMatch';
    processPlayerInput(currentMatchedDirectKey);
});

function endGameSession() {
    gameActive = false;
    target.style.display = 'none';
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

const target = document.getElementById('target');
const overlay = document.getElementById('screen-overlay');
const msg = document.getElementById('msg');
const container = document.getElementById('game-container');
const highScoreDisplay = document.getElementById('high-score-display');
const resetScoreBtn = document.getElementById('reset-score-btn');
const startBtn = document.getElementById('start-btn');

let clickCount = 0;
let startTime;
let totalTimes = 0;
const maxClicks = 5;

// 1. Storage Display Controller Function
function updateHighScoreUI() {
    let storedBest = localStorage.getItem('hiiEyeLab_bestSaccade');
    if (storedBest) {
        highScoreDisplay.innerText = `Personal Best: ${storedBest} ms`;
        resetScoreBtn.style.display = 'inline-block';
    } else {
        highScoreDisplay.innerText = `Personal Best: No records yet`;
        resetScoreBtn.style.display = 'none';
    }
}

// Check scores on screen bootup
updateHighScoreUI();

// 2. Click Action Directives
startBtn.addEventListener('pointerdown', startGame);

function startGame() {
    clickCount = 0;
    totalTimes = 0;
    overlay.style.display = 'none';
    spawnTarget();
}

function spawnTarget() {
    if (clickCount >= maxClicks) {
        endGame();
        return;
    }
    target.style.display = 'none';
    
    const delay = Math.random() * 1400 + 600;
    
    setTimeout(() => {
        const maxX = container.clientWidth - 50;
        const maxY = container.clientHeight - 50;
        
        const randomX = Math.random() * maxX + 25;
        const randomY = Math.random() * maxY + 25;
        
        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
        target.style.display = 'block';
        
        startTime = performance.now();
    }, delay);
}

// Tablet-responsive capture target down event
target.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    const elapsed = performance.now() - startTime;
    totalTimes += elapsed;
    clickCount++;
    spawnTarget();
});

// 3. Evaluation & Record Wipes Processing
function endGame() {
    const finalAverage = Math.round(totalTimes / maxClicks);
    overlay.style.display = 'flex';
    
    let evaluation = "";
    if (finalAverage < 220) {
        evaluation = "🎖️ Soldier / Pro Athlete Level Vision!";
    } else if (finalAverage < 320) {
        evaluation = "⚡ Excellent Human Eye Reflexes!";
    } else {
        evaluation = "👁️ Good tracking! Keep exercising your eyes.";
    }

    let currentBest = localStorage.getItem('hiiEyeLab_bestSaccade');
    
    if (!currentBest || finalAverage < parseInt(currentBest)) {
        localStorage.setItem('hiiEyeLab_bestSaccade', finalAverage);
        evaluation = `🎉 NEW LABORATORY RECORD!<br><span style="font-size: 1.1rem; color: #dfcbb5;">You shaved off response latency!</span><br><br>${evaluation}`;
    }

    updateHighScoreUI();

    msg.innerHTML = `Test Complete!<br><span style="color:#dfcbb5; font-family:'Playfair Display', serif; font-size:2.5rem; display:block; margin: 10px 0;">${finalAverage} ms</span>${evaluation}`;
    startBtn.innerText = "TRY TESTING AGAIN";
}

// Clear high scores
resetScoreBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    if (confirm("Clear this tablet's personal best time for the next scientist?")) {
        localStorage.removeItem('hiiEyeLab_bestSaccade');
        updateHighScoreUI();
    }
});

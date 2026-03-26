// Simple canvas shooter using p5.js
let gameP5;
let scoreEl, score=0;
let restartBtn;

function startGame(){
  if(window.p5 === undefined){ console.warn('p5 not loaded'); return; }
  const sketch = (p)=>{
    let player;
    let bullets = [];
    let enemies = [];
    p.setup = ()=>{
      const container = document.getElementById('p5-container');
      const c = p.createCanvas(560,360);
      c.parent('p5-container');
      player = { x:p.width/2, y:p.height-30, w:40, h:10 };
      score = 0; updateScore();
    };
    p.draw = ()=>{
      p.background(6,6,8);
      // player
      p.fill(255,60,0); p.rect(player.x-player.w/2, player.y-player.h/2, player.w, player.h);
      // bullets
      for(let i=bullets.length-1;i>=0;i--){ bullets[i].y-=6; p.fill(255); p.rect(bullets[i].x-2,bullets[i].y-8,4,8); if(bullets[i].y<0) bullets.splice(i,1); }
      // spawn enemies
      if(p.frameCount % 60 === 0){ enemies.push({x: p.random(20,p.width-20), y:-10, r:14, vy: p.random(1,2.5)}); }
      // enemies
      for(let i=enemies.length-1;i>=0;i--){ const e=enemies[i]; e.y+=e.vy; p.fill(0,200,150); p.ellipse(e.x,e.y,e.r*2); if(e.y>p.height+20) enemies.splice(i,1); }
      // collisions
      for(let i=enemies.length-1;i>=0;i--){ for(let j=bullets.length-1;j>=0;j--){ const d=p.dist(enemies[i].x,enemies[i].y,bullets[j].x,bullets[j].y); if(d<enemies[i].r+2){ enemies.splice(i,1); bullets.splice(j,1); score+=10; updateScore(); break; } } }
      // controls
      if(p.keyIsDown(p.LEFT_ARROW)) player.x-=5; if(p.keyIsDown(p.RIGHT_ARROW)) player.x+=5;
      player.x = p.constrain(player.x, player.w/2, p.width-player.w/2);
    };
    p.keyPressed = ()=>{ if(p.keyCode===32){ bullets.push({x:player.x,y:player.y-15}); } };
  };
  gameP5 = new p5(sketch);
}

function updateScore(){
  const el = document.getElementById('game-score'); if(el) el.textContent = score;
}

function initGameUI(){
  restartBtn = document.getElementById('game-restart');
  restartBtn.addEventListener('click', ()=>{ if(gameP5){ gameP5.remove(); startGame(); } });
}

// No leaderboard loading required for standalone mini-game

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{
  // load p5 and start game
  const p5script = document.createElement('script'); p5script.src='https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.min.js'; p5script.onload = ()=>{ startGame(); };
  document.body.appendChild(p5script);
  initGameUI(); loadLeaderboard();
});

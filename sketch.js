let seaweeds = []; // 儲存多條水草的資料

function setup() {//初始值設定
  createCanvas(windowWidth, windowHeight);//畫布大小
  let spacing = width / 40; // 計算平均間距
  let colors = [
    color('rgba(219, 219, 39, 0.8)'), // 降低透明度
    color('rgba(27, 95, 61, 0.8)'), 
    color('rgba(216, 164, 143, 0.8)'), 
    color('rgba(153, 99, 101, 0.8)'), 
    color('rgba(255, 182, 0, 0.8)')
  ]; // 指定的顏色範圍

  for (let i = 0; i < 40; i++) {
    seaweeds.push({
      x: spacing * i + spacing / 2, // 平均分布的X座標
      height: random(40, 120), // 隨機高度
      color: random(colors), // 隨機選擇指定顏色
      thickness: random(10, 20), // 粗細範圍調整為10到20
      frequency: random(0.01, 0.05), // 隨機搖晃頻率
      angle: random(TWO_PI) // 隨機初始角度
    });
  }
}

function draw() {//畫圖
  background(220);//背景顏色
  for (let seaweed of seaweeds) {
    drawSeaweed(seaweed);
  }
}

//隨著視窗變化，改變整個寬與高
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let seaweed of seaweeds) {
    seaweed.x = constrain(seaweed.x, 0, width); // 確保水草的X座標在畫布範圍內
  }
}

function drawSeaweed(seaweed) {
  let sway = sin(seaweed.angle) * 10; // 減小搖晃幅度
  let y = height; // 水草從底部開始
  let x = seaweed.x; // 水草的X座標

  stroke(seaweed.color); // 使用水草的顏色
  strokeWeight(seaweed.thickness); // 使用水草的粗細
  noFill();

  beginShape();
  for (let i = 0; i <= 10; i++) { // 將水草分成10段
    vertex(x + sway * sin(seaweed.angle + i * 0.5), y); // 波浪效果
    y -= seaweed.height / 10; // 每段高度
  }
  endShape();

  seaweed.angle += seaweed.frequency; // 使用水草的搖晃頻率
}

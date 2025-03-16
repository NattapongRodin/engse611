const X_IMAGE_URL = 'https://banner2.cleanpng.com/20240118/efc/transparent-red-x-red-and-black-cross-made-of-baseball-1710917695647.webp';
const O_IMAGE_URL = 'https://banner2.cleanpng.com/lnd/20240423/kat/transparent-red-circle-red-circle-on-white-background662750612798c4.19438381.webp';

let playerWins = 0;
let botWins = 0;
let ties = 0;

const messageDiv = document.createElement('div');
messageDiv.style.textAlign = 'center';
messageDiv.style.marginTop = '10px';
document.body.appendChild(messageDiv);

const scoreDiv = document.createElement('div');
scoreDiv.style.textAlign = 'center';
scoreDiv.style.marginTop = '10px';
document.body.appendChild(scoreDiv);

const resetButton = document.createElement('button');
resetButton.textContent = 'เริ่มใหม่';
resetButton.style.display = 'none';
resetButton.style.marginTop = '10px';
resetButton.onclick = resetGame;
document.body.appendChild(resetButton);

updateScoreboard();

function changeToX(event) {
  const container = event.currentTarget;
  const image = document.createElement('img');
  image.src = X_IMAGE_URL;
  container.appendChild(image);
  container.removeEventListener('click', changeToX);

  if (checkWinner('X')) {
    playerWins++;
    updateScoreboard();
    return;
  }
  
  setTimeout(botPlay, 300);
}

function botPlay() {
  const boxes = document.querySelectorAll('#grid div');
  const emptyBoxes = Array.from(boxes).filter(box => box.children.length === 0);

  if (emptyBoxes.length === 0) return; // ถ้าช่องเต็มแล้ว ไม่ต้องทำอะไร

  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  const image = document.createElement('img');
  image.src = O_IMAGE_URL;
  randomBox.appendChild(image);
  randomBox.removeEventListener('click', changeToX);

  if (checkWinner('O')) {
    botWins++;
    updateScoreboard();
  }
}

function checkWinner(player) {
  const boxes = document.querySelectorAll('#grid div');
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // แนวนอน
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // แนวตั้ง
    [0, 4, 8], [2, 4, 6] // แนวทแยง
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].children.length > 0 &&
      boxes[a].children[0].src.includes(player === 'X' ? X_IMAGE_URL : O_IMAGE_URL) &&
      boxes[b].children.length > 0 &&
      boxes[b].children[0].src.includes(player === 'X' ? X_IMAGE_URL : O_IMAGE_URL) &&
      boxes[c].children.length > 0 &&
      boxes[c].children[0].src.includes(player === 'X' ? X_IMAGE_URL : O_IMAGE_URL)
    ) {
      setTimeout(() => {
        messageDiv.textContent = `${player} ชนะเกม! 🎉`;
        resetButton.style.display = 'block'; // แสดงปุ่มเริ่มใหม่
      }, 100);
      return true;
    }
  }

  if ([...boxes].every(box => box.children.length > 0)) {
    setTimeout(() => {
      messageDiv.textContent = "เสมอกัน! 😃";
      ties++;
      updateScoreboard();
      resetButton.style.display = 'block';
    }, 100);
    return true;
  }

  return false;
}

function resetGame() {
  const boxes = document.querySelectorAll('#grid div');
  for (const box of boxes) {
    box.innerHTML = '';
    box.addEventListener('click', changeToX);
  }
  messageDiv.textContent = '';
  resetButton.style.display = 'none';
}

function updateScoreboard() {
  scoreDiv.innerHTML = ` PLAYER : ${playerWins} |  COM : ${botWins} |  DRAW : ${ties}`;
}

const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
}
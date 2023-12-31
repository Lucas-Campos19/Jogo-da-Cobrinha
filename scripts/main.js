document.addEventListener('DOMContentLoaded', () => {
  let iniciar = document.getElementById('inicia');
  iniciar.addEventListener('click', () => {
    // Iniciar o jogo
    update();
  });

  // Configurações do jogo
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  const gridSize = 10;
  const gridWidth = canvas.width / gridSize;
  const gridHeight = canvas.height / gridSize;

  // Estado do jogo
  let pontos = 0;
  let snake = [{ x: 10, y: 10 }];
  let direction = 'right';

  // Variável do objeto
  let object = { x: 10, y: 10 };

  // Função para atualizar o estado do jogo
  function update() {
    // Movimentar a cobrinha
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    // Verificar colisão com as bordas do tabuleiro
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
      gameOver();
      return;
    }

    // Verificar colisão com a própria cobrinha
    if (snake.some(segment => segment.x === head.x && segment.y === head.y && segment !== head)) {
      gameOver();
      return;
    }

    // Verificar colisão com o objeto
    if (head.x === object.x && head.y === object.y) {
      // Cobrinha colidiu com o objeto
      // Atualizar a posição do objeto para uma nova posição aleatória
      pontos++; // Incrementa a pontuação
      object.x = Math.floor(Math.random() * gridWidth);
      object.y = Math.floor(Math.random() * gridHeight);
    } else {
      // Remover o último segmento da cobrinha se ela não colidiu com o objeto
      snake.pop();
    }

    snake.unshift(head);

    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a cobrinha
    context.fillStyle = 'green';
    snake.forEach(segment => {
      context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Desenhar o objeto
    context.fillStyle = 'red';
    context.fillRect(object.x * gridSize, object.y * gridSize, gridSize, gridSize);

    // Exibir a pontuação atual
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Pontuação: ' + pontos, 10, 20);

    // Agendar a próxima atualização
    setTimeout(update, 1000 / 25);
  }

  // Função para lidar com as teclas pressionadas
  function handleKeyPress(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
    }
  }

  // Função para encerrar o jogo
  function gameOver() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Exibir mensagem de fim de jogo
    context.fillStyle = 'red';
    context.font = '30px Arial';
    context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
     // Redefinir a pontuação para 0
     pontos = 0;
  }

  // Adicionar o evento de pressionar tecla
  document.addEventListener('keydown', handleKeyPress);
});


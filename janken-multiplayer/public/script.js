const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('player-name-input');
    const joinButton = document.getElementById('join-button');
    const choices = document.querySelectorAll('.choice');
    const playersContainer = document.getElementById('players-container');

    joinButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            socket.emit('join', playerName);
        }
    });

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const choiceText = choice.textContent;
            socket.emit('makeChoice', choiceText);
        });
    });

    socket.on('updatePlayers', (players) => {
        playersContainer.innerHTML = '';
        for (let id in players) {
            const player = players[id];
            const playerElement = document.createElement('div');
            playerElement.textContent = `${player.name}: ${player.choice || '未選択'}`;
            playersContainer.appendChild(playerElement);
        }
    });
});

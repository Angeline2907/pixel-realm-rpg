// Banco de dados dos diálogos do RPG
const dialogues = [
    { speaker: "Sábio Pixel", text: "Saudações, Herói! Você finalmente despertou na matrix de blocos." },
    { speaker: "Sábio Pixel", text: "Este mundo muda a cada clique. Experimente avançar tocando nesta caixa!" },
    { speaker: "Sistema", text: "Você recebeu +10 de XP em desenvolvimento Web Interativo!" },
    { speaker: "Sábio Pixel", text: "Agora use seu conhecimento para expandir este reino. A jornada apenas começou!" }
];

let currentDialogueIndex = 0;

// Função chamada pelo botão da Tela de Capa
function startAdventure() {
    document.getElementById('cover-screen').classList.add('hidden');
    document.getElementById('adventure-screen').classList.remove('hidden');
    
    // Toca som de confirmação ao iniciar
    playRetroSound(440, 'sine', 0.1);
    
    // Carrega o primeiro texto
    showDialogue();
}

// Lógica para renderizar o texto letra por letra
function showDialogue() {
    const dialogue = dialogues[currentDialogueIndex];
    document.getElementById('speaker').innerText = dialogue.speaker + ":";
    
    const textElement = document.getElementById('dialogue-text');
    textElement.innerText = "";
    let i = 0;
    
    // Limpa qualquer efeito de digitação que esteja rodando antes de começar outro
    clearInterval(window.typewriterInterval);
    
    window.typewriterInterval = setInterval(() => {
        if (i < dialogue.text.length) {
            textElement.innerText += dialogue.text.charAt(i);
            // Toca o som de clique a cada 2 letras digitadas
            if(i % 2 === 0) playRetroSound(600, 'square', 0.02);
            i++;
        } else {
            clearInterval(window.typewriterInterval);
        }
    }, 30);
}

// Avança para o próximo bloco de diálogo
function nextDialogue() {
    currentDialogueIndex++;
    if (currentDialogueIndex < dialogues.length) {
        showDialogue();
    } else {
        // Reinicia a conversa em loop caso chegue ao fim
        currentDialogueIndex = 0;
        showDialogue();
    }
}

// Sintetizador interno para gerar efeitos sonoros via código (Web Audio API)
function playRetroSound(frequency, type, duration) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime); // Volume controlado
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Áudio bloqueado pelo navegador até a primeira interação do usuário.");
    }
}

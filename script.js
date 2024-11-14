const quizData = {
    a: { question: '성수역 내부에 수제화 전시회로 가서 18세기 유럽 여성들 사이에서 유행한 슬리퍼 형태의 구두를 찾으세요.', answer: '슬리퍼' },
    b: { question: '해당 블록의 소 공원으로 이동하세요.', answer: '손오공' },
    c: { question: '해당 블록에서 가장 핫 한 카페 근처 전봇대에 QR코드를 찾으세요.', answer: '묵찌빠' },
    d: { question: '무진장 신발 사진이 많은 곳 을 찾아가세요. 해당 건물은 몇 층일까요?', answer: 30, hints: ['UP', 'DOWN'] },
    e: { question: '이곳은 사람들에게 길잡이 역할도 해주며 교통의 중심 역할을 합니다. 학교와도 연관이 있는 이곳의 고유번호를 입력하세요.', answer: '04533', hints: ['경수중학교와 연관이 있는 장소입니다.', '버스정류장입니다.'] },
    f: { question: '성수 startup 건물에서 qr코드를 찾아보세요', answer: '마시멜로' },
    g: { question: '성수 관광안내소로 이동하세요.', answer: '서울숲' }
};

const correctCombinationSets = [
    ['a', 'c', 'f'],
    ['a', 'b', 'g'],
    ['c', 'g', 'f'],
    ['a', 'd', 'e']
];

let solvedBlocks = new Set();
let currentBlock = '';

function showQuiz(block) {
    currentBlock = block;
    document.getElementById('quiz-question').innerText = quizData[block].question;
    document.getElementById('quiz-answer').value = '';
    document.getElementById('quiz-popup').classList.remove('hidden');
    document.getElementById('hints').classList.add('hidden');
}

function submitAnswer() {
    const userAnswer = document.getElementById('quiz-answer').value.trim();
    const correctAnswer = quizData[currentBlock].answer;
    
    if (typeof correctAnswer === 'number') {
        if (parseInt(userAnswer) < correctAnswer) {
            alert('UP');
        } else if (parseInt(userAnswer) > correctAnswer) {
            alert('DOWN');
        } else {
            markSolved();
        }
    } else if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        markSolved();
    } else {
        alert('정답이 아닙니다. 다시 시도하세요.');
    }
}

function markSolved() {
    solvedBlocks.add(currentBlock);
    document.getElementById(`block-${currentBlock}`).style.opacity = '0.5';
    document.getElementById('quiz-popup').classList.add('hidden');
    checkForFinalMission();
}

function checkForFinalMission() {
    for (let combination of correctCombinationSets) {
        if (combination.every(block => solvedBlocks.has(block))) {
            document.getElementById('block-h').classList.remove('hidden');
            break;
        }
    }
}

function closePopup() {
    document.getElementById('quiz-popup').classList.add('hidden');
}

function showHint(number) {
    const hints = quizData[currentBlock].hints;
    if (hints && hints[number - 1]) {
        document.getElementById('hints').innerText = hints[number - 1];
        document.getElementById('hints').classList.remove('hidden');
    }
}

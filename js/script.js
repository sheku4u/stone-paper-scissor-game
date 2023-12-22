const ruleBook = document.querySelector('.ruleBook');
const rulesButton = document.querySelector('.rulesButton');
const optionsContainer = document.querySelector('.optionsContainer');
const result = document.querySelector('.result');
const loading = document.querySelector('.loading');
const pcScoreBoard = document.getElementById('pcScoreBoard');
const userScoreBoard = document.getElementById('userScoreBoard');
const result_id = document.getElementById('result_id');
const result_h1 = document.getElementById('result_h1');
const result_h2 = document.getElementById('result_h2');
const userTagline = document.querySelector('#userTagline');
const computerTagline = document.querySelector('#computerTagline');
const closeButton = document.querySelector('.closeButton');
const nextButton = document.querySelector('.nextButton');
const playAgainButton = document.querySelector('.result span');

function handleRuleMenuClick() {
	ruleBook.classList.toggle('open');
}

rulesButton.addEventListener('click', handleRuleMenuClick);
closeButton.addEventListener('click', handleRuleMenuClick);
let CLICKED_OPTION = '';
let COMPUTER_OPTION = '';
let clicked = false;
let PCScore = parseInt(localStorage.getItem('pc-score')) || 0;
let userScore = parseInt(localStorage.getItem('user-score')) || 0;
pcScoreBoard.innerText = PCScore;
userScoreBoard.innerText = userScore;
userScore > PCScore ? (nextButton.style.display = 'block') : (nextButton.style.display = 'none');

function resetGame() {
	const allCircles = document.querySelectorAll('.circle');
	allCircles.forEach((circle) => {
		circle.style.transition = '';
		circle.style.opacity = '';
		circle.style.pointerEvents = 'auto';
		circle.style.top = '';
		circle.style.left = '';
	});

	const allLines = document.querySelectorAll('.line');
	allLines.forEach((line) => {
		line.style.transition = '';
		line.style.opacity = '';
	});

	const computerCircle = document.querySelector('.computerOption');
	computerCircle.remove();

	const Allrings = document.querySelectorAll('.rings');
	console.log('all rings : ', Allrings);
	Allrings.forEach((rings) => {
		rings.classList.remove('winner');
	});

	result.style.display = 'none';
	userTagline.innerText = '';
	computerTagline.innerText = '';
	CLICKED_OPTION = '';
	COMPUTER_OPTION = '';
	nextButton.style.display = 'none';
	playAgainButton.innerText = 'Play Again';
	clicked = false;
}

function handleClick(clickedOption) {
	if (clicked) {
		return;
	}
	clicked = true;
	CLICKED_OPTION = clickedOption;
	const clickedCircle = document.querySelector(`.${clickedOption}`);
	console.log(clickedCircle);
	// disable all options and hide them
	const allCircles = document.querySelectorAll('.circle');
	allCircles.forEach((circle) => {
		if (circle !== clickedCircle) {
			circle.style.cursor;
			circle.style.transition = 'all 0.5s ease';
			circle.style.opacity = '0';
			circle.style.pointerEvents = 'none';
		}
	});

	const allLines = document.querySelectorAll('.line');
	allLines.forEach((line) => {
		line.style.transition = 'all 0.5s ease';
		line.style.opacity = '0';
	});

	clickedCircle.style.transition = 'all 1s ease';
	if (clickedOption === 'stone') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	} else if (clickedOption === 'paper') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	} else if (clickedOption === 'scissor') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	}

	const pcLoader = document.createElement('div');
	pcLoader.classList.add('pcLoader');
	optionsContainer.appendChild(pcLoader);

	setTimeout(() => {
		optionsContainer.removeChild(pcLoader);
		const computerCircle = generateComputerCircle();

		// check winner
		const winner = checker();
		console.log(winner);
		if (winner === 'computer') {
			PCScore += 1;
			localStorage.setItem('pc-score', PCScore);
			pcScoreBoard.innerText = PCScore;
			const rings = computerCircle.querySelector('.rings');
			rings.classList.add('winner');
		} else if (winner === 'user') {
			userScore += 1;
			localStorage.setItem('user-score', userScore);
			userScoreBoard.innerText = userScore;
			const rings = clickedCircle.querySelector('.rings');
			rings.classList.add('winner');
		} else {
			playAgainButton.innerText = 'Replay';
		}

		setTimeout(() => {
			if (winner === 'user') {
				result_h1.innerText = 'You Win';
				result_h2.innerText = 'Against PC';
			} else if (winner === 'computer') {
				result_h1.innerText = 'You Lose';
				result_h2.innerText = 'Against PC';
			} else {
				result_h1.innerText = 'TIE UP';
				result_h2.innerText = '';
			}
			result.style.display = 'flex';
			userScore > PCScore
				? (nextButton.style.display = 'block')
				: (nextButton.style.display = 'none');
		}, 500);
	}, 1000);
}

function computerRandomOption() {
	const options = ['stone', 'paper', 'scissor'];
	const randomIndex = Math.floor(Math.random() * options.length);
	COMPUTER_OPTION = options[randomIndex];
	return options[randomIndex];
}

function generateComputerCircle() {
	const option = computerRandomOption();
	const circle = document.createElement('div');
	circle.classList.add('computerOption', 'circle', option);

	const ringOuter = document.createElement('div');
	ringOuter.classList.add('ringOuter');

	const ringInner = document.createElement('div');
	ringInner.classList.add('ringInner');

	const image = document.createElement('div');
	image.classList.add('image');

	const img = document.createElement('img');
	img.src = `"/../assets/images/${option}.png`;

	userTagline.innerText = 'You picked';
	computerTagline.innerText = 'PC picked';

	const ripple1 = document.createElement('div');
	const ripple2 = document.createElement('div');
	const ripple3 = document.createElement('div');
	ripple1.classList.add('ring', 'ripple1');
	ripple2.classList.add('ring', 'ripple2');
	ripple3.classList.add('ring', 'ripple3');

	const rings = document.createElement('div');
	rings.classList.add('rings');
	rings.appendChild(ripple1);
	rings.appendChild(ripple2);
	rings.appendChild(ripple3);

	image.appendChild(img);
	ringInner.appendChild(image);
	ringOuter.appendChild(ringInner);
	circle.appendChild(ringOuter);
	circle.appendChild(rings);

	setTimeout(() => {
		optionsContainer.appendChild(circle);
	}, 10);
	return circle;
}

function checker() {
	console.log('clickedOption', CLICKED_OPTION);
	console.log('computerOption', COMPUTER_OPTION);
	let winner = '';
	if (CLICKED_OPTION === COMPUTER_OPTION) {
		winner = 'draw';
		return winner;
	}

	if (CLICKED_OPTION === 'stone') {
		if (COMPUTER_OPTION === 'paper') {
			winner = 'computer';
			return winner;
		} else if (COMPUTER_OPTION === 'scissor') {
			winner = 'user';
			return winner;
		}
	}

	if (CLICKED_OPTION === 'paper') {
		if (COMPUTER_OPTION === 'stone') {
			winner = 'user';
			return winner;
		} else if (COMPUTER_OPTION === 'scissor') {
			winner = 'computer';
			return winner;
		}
	}

	if (CLICKED_OPTION === 'scissor') {
		if (COMPUTER_OPTION === 'stone') {
			winner = 'computer';
			return winner;
		} else if (COMPUTER_OPTION === 'paper') {
			winner = 'user';
			return winner;
		}
	}
}

setTimeout(() => {
	loading.style.display = 'none';
}, 2000);
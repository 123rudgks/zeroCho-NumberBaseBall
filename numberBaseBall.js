let pitcher = [];
let player = [];

let count = 0;
let strike = 0;
let ball = 0;
let start = false;



const $startBtn = document.querySelector(".startBtn");
$startBtn.addEventListener('click', () => {

    //game start
    start = true;

    // make random number
    for (let i = 0; i < 4; i++) {
        while (1) {
            // 1 ~ 9 랜덤 수 생성
            let randNum = Math.floor(Math.random() * 9 + 1);
            // 만약 중복되는 값이 없다면 pitcher배열에 저장, 없으면 중복 없을때 까지 반복
            if (pitcher.indexOf(randNum) === -1) {
                pitcher[i] = randNum;
                break;
            }
        }
    }
    document.querySelector(".startBtn").remove();
    changeDisplay();
})


const buttonDisplay = () => {
    const $startBtn = document.querySelector(".startBtn");
    $startBtn.addEventListener('click', () => {
        // make random number
        for (let i = 0; i < 4; i++) {
            while (1) {
                // 1 ~ 9 랜덤 수 생성
                let randNum = Math.floor(Math.random() * 9 + 1);
                // 만약 중복되는 값이 없다면 pitcher배열에 저장, 없으면 중복 없을때 까지 반복
                if (pitcher.indexOf(randNum) === -1) {
                    pitcher[i] = randNum;
                    break;
                }
            }
        }
        document.querySelector(".startBtn").remove();
        changeDisplay();
    })
}



const changeDisplay = () => {
    document.querySelector(".gameHeader").innerHTML = '<div id="count">count : ' + count + '</div>' +
        '<div class="StrikeBall"> <span>Strike : ' + strike + '</span>' +
        '<span>Ball : ' + ball + '</span> </div>';
}


const $submitBtn = document.querySelector(".submit");

// ok버튼 클릭했을 때
$submitBtn.addEventListener("click", () => {
    // ********* 형식체크 *********
    if (start) { // 게임이 시작헀을 경우에
        for (let i = 0; i < 4; i++) {
            // i번 인덱스의 input태그 숫자
            let playerNum = Number(document.querySelector("#num" + i).value);

            // 0~9 사이 숫자가 아니라면
            if (!((0 < playerNum && playerNum < 10))) {
                alert("you can input the number which is  0 ~ 9 only");
                player = [];
                return;
            }
            // 중복 일 경우
            if (player.indexOf(playerNum) !== -1) {
                alert("duplication is not allowed");
                player = [];
                return;
            } else { // 중복이 아닐 경우
                player[i] = playerNum;
            }
        }
        referee();
    }

});



const initialize = () => {

    pitcher = [];
    player = [];
    strike = 0;
    ball = 0;
    count = 0;

    document.querySelector('.gameHeader').innerHTML = '<button class="startBtn">start</button>';

    const $startBtn = document.querySelector(".startBtn");
    $startBtn.addEventListener('click', () => {
        //game start
        start = true;

        // make random number
        for (let i = 0; i < 4; i++) {
            while (1) {
                // 1 ~ 9 랜덤 수 생성
                let randNum = Math.floor(Math.random() * 9 + 1);
                // 만약 중복되는 값이 없다면 pitcher배열에 저장, 없으면 중복 없을때 까지 반복
                if (pitcher.indexOf(randNum) === -1) {
                    pitcher[i] = randNum;
                    break;
                }
            }
        }
        document.querySelector(".startBtn").remove();
        changeDisplay();
    })

    for (let i = 0; i < 4; i++) {
        player[i] = '';
        document.querySelector("#num" + i).value = "";
    }
};


// 심판
const referee = () => {
    strike = 0;
    ball = 0;
    for (let i = 0; i < 4; i++) {
        let check = pitcher.indexOf(player[i]); // player[i]과 일치하는 pitcher의 인덱스 
        console.log("check=" + check);
        if (check === -1) {
            console.log("player[" + i + "]");
        }
        // 볼, 스트라이크, 꽝 체크
        switch (check) {
            case i: // 값도 일치, 인덱스도 일치할 경우, 스트라이크
                strike++;
                break;
            case -1: // 값이 일치하지 않을 경우, 꽝
                break;
            default: // 둘 다 아닐 경우, 볼
                ball++;
        }
    }

    if (strike === 4) {
        alert("homerun");
        initialize();
        return;
    } else {
        count++;
    }

    if (count > 9) {
        alert("game over");
        pitcher = [];
        initialize();
        document.querySelector('.gameHeader').innerHTML = '<button class="startBtn">start</button>';
        buttonDisplay();
        return;
    }

    player = [];
    console.log(pitcher);
    alert(strike + "strike " + ball + "ball");
    changeDisplay();
}
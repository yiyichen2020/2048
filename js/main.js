
var nums = new Array();
var score = 0;
var hasConflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function() {
    newgame();
});

function newgame() {
    init();
    // 随机生成两个单元格含有数字2或者4
    
    generateOneNumber();
    generateOneNumber();
}

/* 
    在空余的单元格中随机生成2或4
    1. 找到空的单元格
    2. 生成2或4
*/
function generateOneNumber() {
    // 判断是否还有空间
    if (noSpace(nums)) {
        return;
    }
    // 找到所有空的单元格
    var count = 0;
    var space = new Array();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] == 0) {
                space[count] = i * 4 + j;
                count++;
            }
        }
    }
    var pos = space[Math.floor(Math.random() * count)];
    var r = Math.floor(pos / 4);
    var c = Math.floor(pos % 4);
    var randomNum = Math.random() < 0.5 ? 2 : 4;

    nums[r][c] = randomNum;
    showNumberWithAnimation(r, c, randomNum);
}


function init() {
    // 初始化底层单元格位置
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $(`#grid-cell-${i}-${j}`);
            gridCell.css("top", 20 + 120 * i);
            gridCell.css("left", 20 + 120 * j);
        }
    }
    // 初始化上层单元格数组
    for (var i = 0; i < 4; i ++) {
        nums[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            nums[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    
    // 动态创建上层单元格并初始化
    updateView();
    score = 0;
    updateScore(score);
}

function updateView() {
    // 将上层单元格全删了, 重新渲染上层单元格
    $(".number-cell").remove();
    for (var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append(`<div class='number-cell' id='number-cell-${i}-${j}'></div>`);
            var numberCell = $("#number-cell-" + i + "-" + j);
            numberCell.css("top", 20 + 120 * i);
            numberCell.css("left", 20 + 120 * j);
            if (nums[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.text(nums[i][j]);
                numberCell.css("background-color", getNumberBackgroundColor(nums[i][j]));
                numberCell.css("color", getNumberColor(nums[i][j]));
            }
            hasConflicted[i][j] = false;
        }
    }
}





$(document).keydown(function(event) {
    event.preventDefault();
    switch(event.keyCode) {
        // left
        case 37:
            if (canMoveLeft(nums)) {
                moveLeft();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
            break;

        // up
        case 38:
            if (canMoveUp(nums)) {
                moveUp();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
            break;

        // right
        case 39:
            if (canMoveRight(nums)) {
                moveRight();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
            break;

        // down
        case 40:
            if (canMoveDown(nums)) {
                moveDown();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
            break;

        default:
            break;

    }
    
        
    
});

document.addEventListener("touchstart", function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener("touchend", function(event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;
    // 变化量特别小 -- 不算移动
    if (Math.abs(deltax) < document.documentElement.clientWidth * 0.08 && Math.abs(deltay) < document.documentElement.clientWidth * 0.08) {
        return;
    }
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) { // 向右移动
            if (canMoveRight(nums)) {
                moveRight();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
        } else {
            if (canMoveLeft(nums)) {
                moveLeft();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }

        }
    } else {
        if (deltay > 0) { // 向下移动
            if (canMoveDown(nums)) {
                moveDown();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
        } else {
            if (canMoveUp(nums)) {
                moveUp();
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(nums), 500);
            }
        }
    }
});







/*
    向左移动
    需要对每一个数左边进行判断，选择落脚点 -- 落脚点有两种情况
        1. 落脚点是空的, 并且移动过程中没有障碍物
        2. 落脚点的数字和自己相同, 并且移动过程中没有障碍物
*/
function moveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] != 0) {
                // 判断当前数字左边
                for (var k = 0; k < j; k++) {
                    if (nums[i][k]  == 0 && noBlockHorizontal(i, k, j, nums)) {
                        showMovAnimation(i, j, i, k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, k, j, nums) && !hasConflicted[i][k]) {
                        showMovAnimation(i, j, i, k);
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        // 统计分数
                        score += nums[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}

function moveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                // 判断当前数字左边
                for (var k = 3; k > j; k--) {
                    if (nums[i][k]  == 0 && noBlockHorizontal(i, j, k, nums)) {
                        showMovAnimation(i, j, i, k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, j, k, nums) && !hasConflicted[i][k]) {
                        showMovAnimation(i, j, i, k);
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        // 统计分数
                        score += nums[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}

function moveUp() {
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (nums[k][j] == 0 && noBlockVertical(j, k, i, nums)) {
                        showMovAnimation(i, j, k, j);
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[k][j] == nums[i][j] && noBlockVertical(j, k, i, nums) && !hasConflicted[k][j]) {
                        showMovAnimation(i, j, k, j);
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}

function moveDown() {
    for (var j = 0; j < 4; j++) {
        for (var i = 3; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (nums[k][j] == 0 && noBlockVertical(j, i, k, nums)) {
                        showMovAnimation(i, j, k, j);
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[k][j] == nums[i][j] && noBlockVertical(j, i, k, nums) && !hasConflicted[k][j]) {
                        showMovAnimation(i, j, k, j);
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}
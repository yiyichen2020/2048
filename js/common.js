function getNumberBackgroundColor(num) {
	switch(num) {
		case 2:
            return "#eee4da";
            break;
		case 4:
            return "#ede0c8";
            break;
		case 8:
            return "#f2b179";
            break;
		case 16:
            return "#f59563";
            break;
		case 32:
            return "#f67c5f";
            break;
		case 64:
            return "#f65e3b";
            break;
		case 128:
            return "#edcf72";
            break;
		case 256:
            return "#edcc61";
            break;
		case 512:
            return "#9c0";
            break;
		case 1024:
            return "#33b5e5";
            break;
		case 2048:
            return "#09c";
            break;
		case 4096:
            return "#a6c";
            break;
		case 8192:
            return "#93c";
            break;
	}
}


function getNumberColor(num) {
    if (num <= 4) {
        return "#776e65";
    }
    return "#fff";
}

// 判断是否没有空间
function noSpace(nums) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

// 判断数字是否能向左移动
function canMoveLeft(nums) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] != 0) {
                // 如果这个数字左边是空的, 或者左边的数字和这个数字一样 -- 能移动
                if (j > 0 && (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断数字是否能向右移动
function canMoveRight(nums) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] != 0) {
                // 如果这个数字左边是空的, 或者左边的数字和这个数字一样 -- 能移动
                if (j < 3 && (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断数字水平方向上是否有障碍物
function noBlockHorizontal(row, col1, col2, nums) {
    for (var i = col1 + 1; i < col2; i++) {
        if (nums[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function canMoveUp(nums) {
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (nums[i][j] != 0) {
                // 如果这个数字上面是空的, 或者上面的数字和这个数字一样 -- 能移动
                if (i > 0 && (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(nums) {
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (nums[i][j] != 0) {
                // 如果这个数字下面是空的, 或者下面的数字和这个数字一样 -- 能移动
                if (i < 3 && (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockVertical(col, row1, row2, nums) {
    for (var i = row1 + 1; i < row2; i++) {
        if (nums[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noMove(nums) {
    if (canMoveUp(nums) || canMoveDown(nums) || canMoveLeft(nums) || canMoveRight(nums)) {
        return false;
    }
    return true;
}

function isGameOver(nums) {
    if (noSpace(nums) && noMove(nums)) {
        alert("Game Over!");
    }
}




function updateScore(score) {
    $("#score").text(score);
}
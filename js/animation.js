function showNumberWithAnimation(i, j, num) {
    var numberCell = $(`#number-cell-${i}-${j}`);
    numberCell.text(num);
    numberCell.css("background-color", getNumberBackgroundColor(nums[i][j]));
    numberCell.css("color", getNumberColor(nums[i][j]));
    numberCell.animate({
        width: '100px',
        height: '100px',
        top: 20 + 120 * i,
        left: 20 + 120 * j
    }, 200);
}

function showMovAnimation(fromi, fromj, toi, toj) {
    var numberCell = $(`#number-cell-${fromi}-${fromj}`);
    numberCell.animate({
        top:  20 + 120 * toi,
        left: 20 + 120 * toj
    }, 300);
}
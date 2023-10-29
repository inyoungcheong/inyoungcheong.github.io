const rows = document.querySelectorAll(".row");

let currentRow = 0;

function rotateText() {
    rows[currentRow].style.display = "none";
    currentRow = (currentRow + 1) % rows.length;
    rows[currentRow].style.display = "block";
}

setInterval(rotateText, 2000);
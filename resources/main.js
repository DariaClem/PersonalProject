function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    let today = new Date();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    document.getElementById('date').innerHTML = today.toLocaleDateString('default', {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    setTimeout(function () {
        startTime();
    }, 250);
}

startTime();

window.onload = function () {
    let icons = document.querySelectorAll(".icon");
    let popUp = document.querySelectorAll("div.project-menu");

    icons[0].onclick = function () {
        popUp[0].classList.add("windows-visible");
    }

    let toolBar = document.querySelectorAll(".toolBar")[0];

    document.onmousedown = function (ev) {
        let flag = true;
        let posWindow = popUp[0].getBoundingClientRect();
        let posWindowX = ev.clientX - posWindow.left;
        let posWindowY = posWindow.top - ev.clientY;
        if (ev.target === toolBar && !popUp[0].classList.contains("windows-full")) {
            popUp[0].style.cursor = "grab";
            document.onmousemove = function (event) {
                if (flag) {
                    if (event.clientX - posWindowX + 700 > window.innerWidth) {
                        popUp[0].style.left = window.innerWidth - 700 + "px";
                    } else if (event.clientX - posWindowX < 0) {
                        popUp[0].style.left = "0";
                    } else {
                        popUp[0].style.left = event.clientX - posWindowX + "px";
                    }
                    if (event.clientY + posWindowY + 560 > window.innerHeight) {
                        popUp[0].style.top = window.innerHeight - 560 + "px";
                    } else if (event.clientY + posWindowY < 0) {
                        popUp[0].style.top = "0";
                    } else {
                        popUp[0].style.top = event.clientY + posWindowY + "px";
                    }
                }
            }
            document.onmouseup = function () {
                popUp[0].style.cursor = "default";
                flag = false;
            }
        }
    }

    let x = document.querySelectorAll(".minimize-max-close div:last-child");
    let max = document.querySelectorAll(".minimize-max-close div:nth-child(2)");
    let min = document.querySelectorAll(".minimize-max-close div:first-child");

    x[0].onclick = function () {
        popUp[0].classList.remove("windows-visible");
        popUp[0].classList.remove("windows-full");
    }

    max[0].onclick = function () {
        popUp[0].classList.toggle("windows-full");
    }

    min[0].onclick = function () {
        console.log("ceva");
        popUp[0].classList.remove("windows-full");
        popUp[0].classList.remove("windows-visible");
        let minWindow = document.createElement("div");
        minWindow.innerHTML = "document";
        minWindow.style.backgroundColor = "purple";
        minWindow.style.width = "30px";
        minWindow.style.height = "30px";
        let barMenu = document.querySelectorAll(".bar-menu")[0];
        barMenu.appendChild(minWindow);
    }

}
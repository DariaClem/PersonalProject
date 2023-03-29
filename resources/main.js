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

function foreground() {
    let otherPopUps = document.querySelectorAll(`.windows > div`);
    for (let otherPopUp of otherPopUps) {
        otherPopUp.onclick = function (e) {
            if (otherPopUp.style.zIndex !== "3") {
                e.stopPropagation();
                let pops = document.querySelectorAll(`.windows > div`);
                for (let pop of pops) {
                    if (pop.classList.contains("windows-visible")) {
                        pop.style.zIndex = `${pop.style.zIndex - 1 >= 0 ? pop.style.zIndex - 1 : 0}`;
                    }
                }
                otherPopUp.style.zIndex = "3";
            }
        }
    }
}

startTime();

window.onload = function () {
    let icons = document.querySelectorAll(".icon");

    foreground();

    for (let icon of icons) {
        icon.onclick = function (event) {
            if (event.detail === 2) {

                let popUp = document.querySelectorAll(`div.${icon.id}`)[0];
                let found = false;
                let openUpPages = document.querySelectorAll(".bar-app div");
                for (let openPage of openUpPages) {
                    if (openPage.innerHTML === icon.id) {
                        found = true;
                        break;
                    }
                }

                if (!popUp.classList.contains("windows-visible")) {
                    let pops = document.querySelectorAll(`.windows > div`);
                    for (let pop of pops) {
                        if (pop.classList.contains("windows-visible")) {
                            pop.style.zIndex = `${pop.style.zIndex - 1 >= 0 ? pop.style.zIndex - 1 : 0}`;
                        }
                    }
                    popUp.style.zIndex = "3";
                    popUp.classList.add("windows-visible");
                }

                if (!found) {
                    let minWindow = document.createElement("div");

                    minWindow.innerHTML = popUp.classList[0];
                    minWindow.style.backgroundColor = "var(--window-bar)";
                    minWindow.style.width = "150px";
                    minWindow.style.height = "100%";
                    minWindow.style.borderRadius = "5px";
                    minWindow.style.display = "flex";
                    minWindow.style.justifyContent = "center";
                    minWindow.style.alignItems = "center";
                    minWindow.style.cursor = "pointer";
                    minWindow.style.zIndex = "3";

                    minWindow.onclick = function () {
                        let currentPage = document.querySelectorAll(`.${popUp.classList[0]}`)[0];
                        popUp.classList.toggle("windows-visible");
                        currentPage.classList.toggle("visible");

                        let otherPopUps = document.querySelectorAll(`.windows > div`);
                        if (popUp.classList.contains("windows-visible")) {
                            for (let otherPopUp of otherPopUps) {
                                if (otherPopUp.classList.contains("windows-visible")) {
                                    otherPopUp.style.zIndex = `${otherPopUp.style.zIndex - 1 >= 0 ? otherPopUp.style.zIndex - 1 : 0}`;
                                }
                            }
                            popUp.style.zIndex = "3";
                        }
                    }

                    let barMenu = document.querySelectorAll(".bar-app")[0];
                    barMenu.appendChild(minWindow);
                }
            }
        }
    }

    document.onmousedown = function (ev) {
        let toolBars = document.querySelectorAll(`.toolBar`);
        for (let toolBar of toolBars) {
            let popUp = toolBar.parentElement;
            let x = document.querySelectorAll(`.${popUp.classList[0]} .minimize-max-close div:last-child`)[0];
            let max = document.querySelectorAll(`.${popUp.classList[0]} .minimize-max-close div:nth-child(2)`)[0];
            let min = document.querySelectorAll(`.${popUp.classList[0]} .minimize-max-close div:first-child`)[0];

            x.onclick = function () {
                popUp.classList.remove("windows-visible");
                popUp.classList.remove("windows-full");

                let openUpPages = document.querySelectorAll(".bar-app div");
                for (let openPage of openUpPages) {
                    if (openPage.innerHTML === popUp.classList[0]) {
                        openPage.remove();
                        break;
                    }
                }
            }

            max.onclick = function () {
                popUp.classList.toggle("windows-full");
            }

            min.onclick = function (ev) {
                ev.stopPropagation();

                popUp.classList.remove("windows-full");
                popUp.classList.remove("windows-visible");

                let found = false;
                let openUpPages = document.querySelectorAll(".bar-app div");
                for (let openPage of openUpPages) {
                    if (openPage.innerHTML === popUp.classList[0]) {
                        found = true;
                        break;
                    }
                }
            }

            if (ev.target === toolBar) {
                let popUp = toolBar.parentElement;
                let otherPopUps = document.querySelectorAll(`.windows > div`);
                if (popUp.style.zIndex !== "3") {
                    for (let otherPopUp of otherPopUps) {
                        if (otherPopUp.classList.contains("windows-visible")) {
                            otherPopUp.style.zIndex = `${otherPopUp.style.zIndex - 1 >= 0 ? otherPopUp.style.zIndex - 1 : 0}`;
                        }
                    }
                    popUp.style.zIndex = "3";
                }
                if (!popUp.classList.contains("windows-full")) {
                    let flag = true;
                    let posWindow = popUp.getBoundingClientRect();
                    let posWindowX = ev.clientX - posWindow.left;
                    let posWindowY = posWindow.top - ev.clientY;
                    popUp.style.cursor = "grab";
                    document.onmousemove = function (event) {
                        if (flag) {
                            if (event.clientX - posWindowX + 700 > window.innerWidth) {
                                popUp.style.left = window.innerWidth - 700 + "px";
                            } else if (event.clientX - posWindowX < 0) {
                                popUp.style.left = "0";
                            } else {
                                popUp.style.left = event.clientX - posWindowX + "px";
                            }
                            if (event.clientY + posWindowY + 560 > window.innerHeight) {
                                popUp.style.top = window.innerHeight - 560 + "px";
                            } else if (event.clientY + posWindowY < 0) {
                                popUp.style.top = "0";
                            } else {
                                popUp.style.top = event.clientY + posWindowY + "px";
                            }
                        }
                    }
                    document.onmouseup = function () {
                        popUp.style.cursor = "default";
                        flag = false;
                    }
                }
            }
        }
    }
}
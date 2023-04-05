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
                    if (openPage.title === icon.id) {
                        openPage.classList.add("darker-background");
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

                    minWindow.title = popUp.classList[0];
                    minWindow.style.borderRadius = "5px";
                    minWindow.style.width = "60px";
                    minWindow.style.background = "rgba(121, 134, 168, 0.22)";
                    minWindow.style.borderBottom = "4px solid transparent";
                    minWindow.style.height = "100%";
                    minWindow.style.display = "flex";
                    minWindow.style.justifyContent = "center";
                    minWindow.style.alignItems = "center";
                    minWindow.style.cursor = "pointer";
                    minWindow.style.zIndex = "3";
                    minWindow.classList.add("darker-background");

                    minWindow.onclick = function () {
                        let currentPage = document.querySelectorAll(`.${popUp.classList[0]}`)[0];
                        popUp.classList.toggle("windows-visible");
                        currentPage.classList.toggle("visible");
                        minWindow.classList.toggle("darker-background");

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

                    let image = document.createElement("img");
                    image.src = popUp.classList[0] === "projects" ? "/resources/images/open-folder.png" : (popUp.classList[0] === "about-me" ? "resources/images/girl%20(1).png" : "resources/images/communicate.png");
                    image.style.width = "45px";
                    minWindow.appendChild(image);

                    let barMenu = document.querySelectorAll(".bar-app")[0];
                    barMenu.appendChild(minWindow);
                }
            }
        }
    }

    let onToolBar = false;
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
                    if (openPage.title === popUp.classList[0]) {
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
                    if (openPage.title === popUp.classList[0]) {
                        openPage.classList.remove("darker-background");
                        found = true;
                        break;
                    }
                }
            }

            if (ev.target === toolBar) {
                onToolBar = true;
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
                            if (event.clientX - posWindowX + posWindow.width > window.innerWidth) {
                                popUp.style.left = window.innerWidth - posWindow.width + "px";
                            } else if (event.clientX - posWindowX < 0) {
                                popUp.style.left = "0";
                            } else {
                                popUp.style.left = event.clientX - posWindowX + "px";
                            }
                            if (event.clientY + posWindowY + posWindow.height + 60 > window.innerHeight) {
                                popUp.style.top = window.innerHeight - posWindow.height - 60 + "px";
                            } else if (event.clientY + posWindowY < 0) {
                                popUp.style.top = "0";
                            } else {
                                popUp.style.top = event.clientY + posWindowY + "px";
                            }
                        }
                    }

                    document.onmouseup = function () {
                        if (onToolBar) {
                            popUp.style.cursor = "default";
                            flag = false;
                        }
                    }
                }
            }
        }
    }

    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        input.onclick = function () {
            navigator.clipboard.writeText(input.value)
                .then(() => {
                    let success = document.createElement("div");
                    success.innerHTML = `The ${input.id === "email" ? "email" : `${input.id} link`} has been copied to the clipboard!`;
                    success.style.padding = "15px";
                    success.style.background = " green";
                    success.style.borderRadius = "10px";
                    success.style.position = "absolute";
                    success.style.bottom = "10%";
                    success.style.color = "white";
                    success.classList.add("anim");

                    let contact = document.querySelectorAll(".contact-form")[0];
                    contact.appendChild(success);
                    setTimeout(function () {
                        contact.removeChild(success);
                    }, 1500);
                })
                .catch(err => {
                    console.error('Error copying the text to the clipboard:', err);
                });
        }
    }

    let projects = document.querySelectorAll(".computer-science, .blender, .painting");
    let folderFiles = document.querySelectorAll(".folder-files")[0];
    let openProjects = document.querySelectorAll("#computer-science-files, #blender-files, #painting-files");

    let leftArrow = document.getElementsByClassName("fi-rr-arrow-circle-left")[0];
    let rightArrow = document.getElementsByClassName("fi-rr-arrow-circle-right")[0];

    let history = null;
    for (let project of projects) {
        project.onclick = function () {
            history = folderFiles;

            for (let openProj of openProjects) {
                openProj.classList.remove("show");
            }

            let newProject = document.getElementById(`${project.classList[0]}-files`);
            folderFiles.style.display = "none";
            newProject.classList.add("show");

            leftArrow.style.color = "var(--main-color-text)";
            leftArrow.style.cursor = "pointer";
            rightArrow.style.color = "var(--main-color-text-unavailable)";
            rightArrow.style.cursor = "default";
        }
    }

    leftArrow.onclick = function () {
        if (history !== null) {
            for (let openProj of openProjects) {
                if (openProj.classList.contains("show"))
                    history = openProj;
                openProj.classList.remove("show");
            }
            leftArrow.style.color = "var(--main-color-text-unavailable)";
            leftArrow.style.cursor = "default";
            rightArrow.style.color = "var(--main-color-text)";
            rightArrow.style.cursor = "pointer";

            folderFiles.style.display = "block";
        }
    }

    rightArrow.onclick = function () {
        if (history !== null) {
            leftArrow.style.color = "var(--main-color-text)";
            leftArrow.style.cursor = "pointer";
            rightArrow.style.color = "var(--main-color-text-unavailable)";
            rightArrow.style.cursor = "default";

            folderFiles.style.display = "none";

            for (let openProj of openProjects) {
                if (openProj === history)
                    openProj.classList.add("show");
            }
            history = folderFiles;
        }
    }

}
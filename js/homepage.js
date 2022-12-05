const authors = document.querySelector(".testimonial__author-list");
const cards = document.querySelector(".popular__card-list");
const cardsMenu = document.querySelector(".popular__card-list2");
const btnshop = document.querySelector(".navbar__shop");
const btngiohang = document.querySelector(".navbar__giohang");
const addgiohang = document.querySelector("#giohang");
const hiddenElement = document.querySelectorAll(".hidden");
const navbarHidden = document.querySelectorAll(".navbar__link");
const showMore_btn = document.querySelector(".popular__btn-showmore");

const arrGioHang = [];
function renderCardInCart(obj) {
    arrGioHang.push(obj);
    addgiohang.innerHTML = arrGioHang
        .map(
            (obj) => `
    <div class="navbar__giohang--sanpham">
        <div class="navbar__giohang--image">
            <img src=${obj.img} alt="" />
        </div>
        <div class="navbar__giohang--name">${obj.name}</div>
        <div class="navbar__giohang--cost">${obj.cost} K</div>
        <div class="navbar__giohang--x">              
            <img src="./img/rubbish-bin.png" alt="" />
         </div>
    </div>
    `
        )
        .join("");
    removeItemGioHang();
}

function renderCoffee() {
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/coffee")
        .then((res) => res.json())
        .then((data) => {
            cardsMenu.innerHTML = data
                .map(
                    (obj) => ` <div class="popular__card " card-id="${obj.id}" >
                    <div class="popular__rating">
                        <img
                            src="./img/rating_product.png"
                            alt=""
                        />
                    </div>
                    <div class="popular__card--img">
                        <img
                            src=${obj.img}
                            alt=""
                        />
                    </div>
                    <div class="popular__card--info">
                        <div class="popular__card--name">
                            ${obj.name}
                        </div>
                        <div class="popular__card--cost">${obj.cost} K</div>
                    </div>
                    <div class="popular__card--decribe">
                    <div class="popular__card--subline">
                        ${obj.feedback}
                    </div>
                        <div class="popular__card--buy">
                            <img
                                src="./img/card.png"
                                alt=""
                            />
                        </div>
                    </div>
                    </div>`
                )
                .join("");

            muahang();
        });
}

function renderCoffeebest() {
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/coffee-food")
        .then((res) => res.json())
        .then((data) => {
            cards.innerHTML = data
                .map(
                    (
                        obj
                    ) => ` <div class="popular__card-best" card-idBest="${obj.id}" >
        <div class="popular__rating">
            <img
                src="./img/rating_product.png"
                alt=""
            />
        </div>
        <div class="popular__card--img">
            <img
                src=${obj.img}
                alt=""
            />
        </div>
        <div class="popular__card--info">
            <div class="popular__card--name">
                ${obj.name}
            </div>
            <div class="popular__card--cost">${obj.cost} K</div>
        </div>
        <div class="popular__card--decribe">
            <div class="popular__card--btn">Hot</div>
            <div class="popular__card--btn">Cold</div>
            <div class="popular__card--buy">
                <img
                    src="./img/card.png"
                    alt=""
                />
            </div>
        </div>
    </div>`
                )
                .slice(0, 3)
                .join("");
            muahangBestCoffee();
        });
}
function renderUser() {
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/user")
        .then((res) => res.json())
        .then((data) => {
            authors.innerHTML = data
                .map(
                    (obj) => `<div class="testimonial__author">
                    <div class="testimonial__author--avt">
                        <img src="${obj.avt}" alt="" />
                    </div>
                    <div class="testimonial__author--info">
                        <div class="testimonial__author--name">
                            ${obj.name}
                        </div>
                        <div class="testimonial__author--title">
                            I really love the cappucino, the coffee
                            was very smooth
                        </div>
                    </div>
                </div>`
                )
                .slice(0, 3)
                .join("");
        });
}

function getCoffeeId(id) {
    fetch(`https://6369cb9028cd16bba72488d3.mockapi.io/coffee/${id}`)
        .then((res) => res.json())
        .then((data) => {
            renderCardInCart(data);
        });
}
function getBestCoffeeId(id) {
    fetch(`https://6369cb9028cd16bba72488d3.mockapi.io/coffee-food/${id}`)
        .then((res) => res.json())
        .then((data) => {
            renderCardInCart(data);
        });
}

function giohang() {
    const btnYourCoffee = document.querySelector(".about__content--btn-get");
    btnshop.addEventListener("click", (e) => {
        e.preventDefault();
        btngiohang.classList.toggle("disable");
    });
    btnYourCoffee.addEventListener("click", (e) => {
        e.preventDefault();
        btngiohang.classList.toggle("disable");
    });
}

function muahang() {
    const btncard = document.querySelectorAll(".popular__card");
    btncard.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idCard = btn.getAttribute("card-id");
            getCoffeeId(idCard);
        });
    });
}

function muahangBestCoffee() {
    const btncard = document.querySelectorAll(".popular__card-best");
    btncard.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idCard = btn.getAttribute("card-idBest");
            getBestCoffeeId(idCard);
        });
    });
}

function removeItemGioHang() {
    const timesItems = document.querySelectorAll(".navbar__giohang--x");

    timesItems.forEach(
        (timesItem, index) =>
            (timesItem.onclick = () => {
                arrGioHang.splice(arrGioHang.indexOf(arrGioHang[index]), 1);
                timesItem.parentElement.remove();
            })
    );
}
function hiddenElm() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });
    hiddenElement.forEach((el) => observer.observe(el));
}

function navbarActive() {
    navbarHidden.forEach((button) => {
        button.addEventListener("click", () => {
            removeClass();
            button.classList.add("active");
        });
    });
}

function removeClass() {
    navbarHidden.forEach((button) => {
        button.classList.remove("active");
    });
}

// btn show more
function showMoreCard() {
    showMore_btn.addEventListener("click", () => {
        console.log(showMore_btn);
        cardsMenu.classList.toggle("show1");
    });
}

function homepage() {
    navbarActive();
    renderCoffeebest();
    renderCoffee();
    renderUser();
    giohang();
    hiddenElm();
    showMoreCard();
}

homepage();

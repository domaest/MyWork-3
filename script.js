const food = [
    {
        name: 'Гамбургер непростой',
        price: 10000,
        amount: 0,
        kcall: 550,
        id: 'plainBurger',
        
    },
    {
        name: 'Гамбургер Fresh',
        price: 20500,
        amount: 0,
        kcall: 600,
        id: 'freshBurger',
       
    },
    {
        name: 'Fresh Combo',
        price: 31900,
        amount: 0,
        kcall: 800,
        id: 'freshCombo',
    
    },
];

const dataExtra = [
    {
        name: 'Двойной майонез',
        kcall: 99,
        price: 2000,
        extraId: 'doubleMayonnaise'
    },
    {
        name: 'Салатный лист',
        kcall: 39,
        price: 1000,
        extraId: 'lettuce'
    },
    {
        name: 'Сыр',
        kcall: 65,
        price: 3000,
        extraId: 'cheese'
    },
];

const calc = (count, something) => count * something;
const btns = document.querySelectorAll('.main__product-btn');
btns.forEach(item => {
    item.addEventListener('click', function(e){
        e.preventDefault();
        mathSaidazim(this);
    });
});

function mathSaidazim(btn){
    const parent = btn.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        count = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        symbol = btn.getAttribute('data-symbol');
    let index = food.findIndex(item => item.id == parentId);
    if(symbol == '+' && food[index].amount < 100){
        food[index].amount++;
    }
    else if(symbol == '-' && food[index].amount > 0){
        food[index].amount--;
    }
    count.textContent = food[index].amount;
    price.textContent = calc(food[index].amount,  food[index].price);
    kcall.textContent = calc(food[index].amount,  food[index].kcall);
};

const check = document.querySelectorAll('.main__product-checkbox');

for (const it of check) {
    it.addEventListener('click', function(){
        countExtraProducts(this);
    });
}
function countExtraProducts(btn){
    const parent = btn.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        symbol = btn.getAttribute('data-extra');
    let index = food.findIndex(item => item.id == parentId);
    let extra = dataExtra.findIndex(item => item.extraId == symbol);
    food[index][symbol] = btn.checked;
    if(food[index][symbol]){
        food[index].price += dataExtra[extra].price;
        food[index].kcall += dataExtra[extra].kcall;
    }
    else {
        food[index].price -= dataExtra[extra].price;
        food[index].kcall -= dataExtra[extra].kcall;
    }
    price.textContent = calc(food[index].amount,  food[index].price);
    kcall.textContent = calc(food[index].amount,  food[index].kcall);
}

//вывод заказа

const orderBtn = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn');

orderBtn.addEventListener('click', function(){
    if(food.some(item => item.amount > 0 ? item : false)){
        receipt.classList.add('active');
        let totalName = '';
        let totalPrice = 0;
        let totalKcall = 0;
        for (let i = 0; i < food.length; i++) {
           if(food[i].amount > 0) {
               totalPrice += calc(food[i].amount, food[i].price);
               totalKcall += calc(food[i].amount, food[i].kcall);
               totalName += `${food[i].name} - ${food[i].amount}шт\n`;
               for (const key in food[i]) {
                    if(food[i][key] === true){
                        let data = dataExtra.findIndex(item => item.extraId == key);
                        totalName += `\t${dataExtra[data].name}\n`;
                    }
               }
           }
        }
        receiptWindow.innerHTML = `Вы заказали: \n${totalName}<p class="some">Общая стоимость: ${totalPrice}</p><p class="some">Общая калорийность: ${totalKcall}</p>`;
    }
    else alert('Вы ничего не заказали');
});
const audio = document.querySelector('.audio');
payBtn.addEventListener('click', function(){
    audio.play();
    setTimeout(() => {
        window.location.reload();
    }, 500);
});

const mainProductInfo = document.querySelectorAll('.main__product-info'),
    view = document.querySelector('.view'),
    viewImg = view.querySelector('img');

// mainProductInfo.forEach(item => {
//     item.addEventListener('click', function(){
//         let curImg = this.querySelector('img');
//         view.classList.add('active');
//         viewImg.src = curImg.src;
//     });
// });
// //1 способ закрытия
// // view.addEventListener('click', function(e){
// //     if(!e.target.closest('img')) view.classList.remove('active');
// // });

// //2 способ закрытия
// view.addEventListener('click', function(e){
//     view.classList.remove('active');
// });
// viewImg.addEventListener('click', function(e){
//     e.stopPropagation();
// })




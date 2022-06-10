const s = (qs) =>document.querySelector(qs);
const a = (qa) =>document.querySelectorAll(qa);

pizzaJson.map((item, index)=>{
    let pizzaItem = s('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML =  `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    s('.pizza-area').append(pizzaItem);

});
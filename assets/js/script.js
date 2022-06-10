// Declarações das variáveis //
let cart = [];
let modalQtd = 1;
let modalKey = 0;
const s = (qs) => document.querySelector(qs);
const a = (qa) => document.querySelectorAll(qa);

// Listagem do menu (Pizzas) //
pizzaJson.map((item, index) => {
    let pizzaItem = s('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('date-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('date-key');
        modalQtd = 1;
        modalKey = key;

        s('.pizzaBig img').src = pizzaJson[key].img;
        s('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        s('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        s('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        s('.pizzaInfo--size.selected').classList.remove('selected');
        a('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        s('.pizzaInfo--qt').innerHTML = modalQtd;
        s('.pizzaWindowArea').style.opacity = '0';
        s('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            s('.pizzaWindowArea').style.opacity = '1';
        }, 200);

    });

    s('.pizza-area').append(pizzaItem);

});

// Eventos do MODAL //
// Função para fechar o modal
function closeModal() {
    s('.pizzaWindowArea').style.opacity = '0';
    setTimeout(() => {
        s('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

// Chamada da função closeModal para fechar o modal
a('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

// Evento de aumentar/diminuir as quantidades dos itens selecionados
s('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--;
        s('.pizzaInfo--qt').innerHTML = modalQtd;
    }


});
s('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    s('.pizzaInfo--qt').innerHTML = modalQtd;

});

// Evento de seleção do tamanho do produto selecionado
a('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        s('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

//Evento de adicionar produto ao carrinho
s('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(s('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1){
        cart[key].qt += modalQtd;
    } else {

        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQtd
        });
    }
    closeModal();
});
$(document).ready( () => {
    $('#showTech').mouseenter( () => { 
        $('#showContent').css({
            'display' : 'block'
        })
    })

    $('#showTech').mouseleave( () => { 
        $('#showContent').css({
            'display' : 'none'
        })
    })

    $('#showContent').mouseenter( () => { 
        $('#showContent').css({
            'display': 'block'
        })
        
    });

    $('#showContent').mouseleave( () => { 
        $('#showContent').css({
            'display': 'none'
        })
    });

})


async function requestAllProducts() {
    try {
        const allProducts = await fetch('https://dummyjson.com/products', {
            method: 'GET'
        })

        const dataAllProducts = await allProducts.json()

        console.log(dataAllProducts)

        if (dataAllProducts.products) {
            const carouselContainer = document.querySelector('.content-carroseul-dynamic')

            dataAllProducts.products.forEach(product => {
                const cardTemplate = document.createElement('div')
                cardTemplate.classList.add('card')
                

                // Calcula o preço com desconto
                let discountedPrice = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)

                window.discountedPrice

                // Formata o preço original
                const formattedPrice = product.price.toFixed(2);

                cardTemplate.innerHTML = `
                    <div class="cards-images">
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <div class="cards-informatios">
                        <div class="offers">
                            <p>Ofertas do dia</p>
                        </div>
                        <span class="original">
                            <p>R$ ${formattedPrice}</p>
                        </span>
                        <div class="discount-price">
                            <span>R$ ${discountedPrice}</span><sup>${product.discountPercentage}% OFF</sup>
                        </div>
                        <div class="free-shipping">
                            <span class="shipping">
                                <p>Frete grátis</p>
                            </span>
                            <img src="../assets/icons/asset 13.svg" alt="Free Shipping Icon">
                        </div>
                        <h3 class="title-content-card">
                            ${product.title}
                        </h3>
                    </div>
                `

                carouselContainer.appendChild(cardTemplate);
            })


            // Inicialize o carrossel após adicionar todos os cards
            initializeSlickCarousel()

        } 

        else {
            console.log('No products found.')
        }

        /* Request products offers*/

            const productsOffers = await fetch('https://dummyjson.com/products?limit=20&skip=30&select=title,price,images', {
                method: 'GET'
            });
    
            const dataProductsOffers = await productsOffers.json();
    
            console.log('Dados dos produtos recebidos:', dataProductsOffers);
    
            if (dataProductsOffers.products) {
                const contentOffersCards = document.querySelector('.content-offers-cards');
    
                dataProductsOffers.products.forEach(product => {
                    console.log('Produto:', product);
    
                    
                    // Verificar se 'product.images' existe e é um array com pelo menos um elemento
                    if (Array.isArray(product.images) && product.images.length > 0) {
                        const offersTemplate = document.createElement('div');
                        offersTemplate.classList.add('card-offers');
    

                        let discountOffer = (product.price * 10 / 100).toFixed(2)

                        let priceDiscount = product.price - discountOffer

                        offersTemplate.innerHTML = `
                        <div class="cards-images-offers">
                            <img src="${product.images[0]}" alt="${product.title}">
                        </div>
                        <div class="cards-informatios offers-informations">
                            <div class="offers">
                                <p>Ofertas do dia</p>
                            </div>
                            <h3 class="title-content-card effect-title-cards">
                                ${product.title}
                            </h3>
                            <span class="original  offers-original">
                                <p>R$ ${product.price} </p>
                            </span>
                            <div class="discount-price">
                                <span>R$ ${priceDiscount.toFixed(2)} </span><sup>% OFF</sup>
                            </div>
                            <div class="installment-offer">
                                <p>em <span>10x de ${(product.price / 10).toFixed(2)} sem juros</span></p>
                            </div>
                            <div class="free-shipping">
                                <span class="shipping">
                                    <p>Frete grátis</p>
                                </span>
                                <img src="../assets/icons/asset 13.svg" alt="Free Shipping Icon">
                            </div>
                            
                        </div>
                        `;
    
                        contentOffersCards.appendChild(offersTemplate);
                    } else {
                        console.warn('Imagens do produto não estão disponíveis:', product);
                    }
                });
    
                initializeSlickCarouselTwo();

            }
            else {
                console.log('Produtos não encontrados');
            }

            //Main card offer

            const mainCardOffer = document.querySelector('.card-main')

            const containerMainCardOffer = document.createElement('div')

            const product = dataAllProducts.products[9].images[0]

            const priceOrigin = dataAllProducts.products[9].price
            
            const titleOrigin = dataAllProducts.products[9].title

            const descripitionTitle = dataAllProducts.products[9].description

            console.log(descripitionTitle)

            const discountMain = (priceOrigin  - (priceOrigin * 40 / 100)).toFixed(2)

            console.log(discountMain)

            //console.log(priceMainOrigin)
            //console.log(product)

            containerMainCardOffer.innerHTML = `
                <div class="cards-images-offers-main">
                    <img src="${product}" alt="${dataAllProducts.title}">
                </div>
                <div class="cards-informations informations-offers">
                    <div class="title-product-offer effect-title-cards">
                        <h3> ${titleOrigin} </h3>
                        <span> ${descripitionTitle}</span>
                    </div>
                    <p class="price-origin"> R$ ${priceOrigin} </p>
    
                    <div class="offer-price">
                        <p id="discount-offer"> R$ ${discountMain} </p>
                        <sup>40% off </sup>
                    </div>
                    <div class="options-payment">
                        <p>em <span>10x de R$ ${ (discountMain / 10).toFixed(2) } </span>sem juros</p>
                    </div>
                    <div class="free-shipping">
                        <span class="shipping">
                            <p>Frete grátis</p>
                        </span>
                        <img src="../assets/icons/asset 13.svg" alt="Free Shipping Icon">
                    </div>
                </div>
            `
            
            mainCardOffer.appendChild(containerMainCardOffer)

    }
    catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }

}



function initializeSlickCarousel() {
    $('.content-carroseul-dynamic').slick({
        infinite: false,
        speed: 300,
        arrow: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next" id="arrowNext"><i class="fa-solid fa-chevron-right"></i></button>',
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })

}


function initializeSlickCarouselTwo() {
    $('.content-offers-cards').slick({
        infinite: false,
        speed: 300,
        arrow: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next" id="arrowNext"><i class="fa-solid fa-chevron-right"></i></button>',
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })

}


requestAllProducts()


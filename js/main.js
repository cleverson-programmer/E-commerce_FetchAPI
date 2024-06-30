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
                const discountedPrice = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)

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

        } else {
            console.log('No products found.')
        }
    } catch (error) {
        console.log("Erro ao carregar os produtos", error)
    }
}

function initializeSlickCarousel() {
    $('.content-carroseul-dynamic').slick({
        speed: 300,
        arrow: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next" id="arrowNext"><i class="fa-solid fa-chevron-right"></i></button>',
        infinite: false,
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

requestAllProducts()


        const productsOffers = await fetch('https://dummyjson.com/products?limit=20&skip=30&select=title,price', {
            method: 'GET'
        })

        const dataAllProducts = await allProducts.json()

        console.log(dataAllProducts)

        const dataProductsOffers = await productsOffers.json()

        console.log(dataProductsOffers)
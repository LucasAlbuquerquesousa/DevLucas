let produtos = [
    {
        id: 1,
        nome: "iPhone 15 Pro",
        categoria: "smartphones",
        preco: 7999,
        precoOriginal: 8999,
        desconto: 11,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
        descricao: "Smartphone Apple com câmera avançada"
    },
    {
        id: 2,
        nome: "MacBook Air M2",
        categoria: "laptops",
        preco: 8999,
        precoOriginal: 10999,
        desconto: 18,
        imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        descricao: "Notebook Apple ultrafino e potente"
    },
    {
        id: 3,
        nome: "AirPods Pro",
        categoria: "headphones",
        preco: 1899,
        precoOriginal: 2299,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
        descricao: "Fones sem fio com cancelamento de ruído"
    },
    {
        id: 4,
        nome: "Samsung Galaxy S24",
        categoria: "smartphones",
        preco: 5499,
        precoOriginal: 6299,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        descricao: "Smartphone Samsung com tela AMOLED"
    },
    {
        id: 5,
        nome: "Apple Watch Series 9",
        categoria: "smartwatch",
        preco: 3299,
        precoOriginal: 3799,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400",
        descricao: "Relógio inteligente com monitoramento"
    },
    {
        id: 6,
        nome: "Teclado Mecânico",
        categoria: "accessories",
        preco: 499,
        precoOriginal: 699,
        desconto: 29,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        descricao: "Teclado mecânico RGB para gamers"
    },
    {
        id: 7,
        nome: "Sony WH-1000XM5",
        categoria: "headphones",
        preco: 2499,
        precoOriginal: 2999,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
        descricao: "Fone com cancelamento de ruído"
    },
    {
        id: 8,
        nome: "Dell XPS 13",
        categoria: "laptops",
        preco: 7999,
        precoOriginal: 9299,
        desconto: 14,
        imagem: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
        descricao: "Notebook Windows premium"
    },
    {
        id: 9,
        nome: "Mouse Razer Branco",
        categoria: "accessories",
        preco: 899,
        precoOriginal: 1099,
        desconto: 18,
        imagem: "https://images.unsplash.com/photo-1705332112231-4dff35a9587c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Mouse gamer com iluminação RGB"
    },
    {
        id: 10,
        nome: "Controle Sony DualSense PS5",
        categoria: "accessories",
        preco: 599,
        precoOriginal: 699,
        desconto: 14,
        imagem: "https://images.unsplash.com/photo-1683137813518-07d0d3f68921?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Controle Dual Sense"
    },
    {
        id: 11,
        nome: "Headset ASTRO Gaming A50",
        categoria: "headphones",
        preco: 2699,
        precoOriginal: 2999,
        desconto: 10,
        imagem: "https://images.unsplash.com/photo-1616081118936-562f7c13d9ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Headset sem fio com som surround"
    },
    {
        id: 12,
        nome: "Iphone 16 Pro Max",
        categoria: "smartphones",
        preco: 11790,
        precoOriginal: 13999,
        desconto: 16,
        imagem: "https://images.unsplash.com/photo-1727079513748-d03e7b8c8947?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Smartphone top de linha da Apple"
    },
    {
        id: 13,
        nome: "Notebook Gamer Alienware",
        categoria: "laptops",
        preco: 15750,
        precoOriginal: 18999,
        desconto: 17,
        imagem: "https://telesintese.com.br/wp-content/uploads/2021/09/Alienware-m15-teclado.jpg",
        descricao: "Notebook de alta perfomance para gamers"
    },
    {
        id: 14,
        nome: "Smartwatch Polar Vantage V3",
        categoria: "smartwatch",
        preco: 5500,
        precoOriginal: 8999,
        desconto: 39,
        imagem: "https://images.unsplash.com/photo-1722152531202-20758050b006?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        descricao: "Smartwatch de alta perfomance para atletas"
    },
    {
        id: 15,
        nome: "Apple Watch Ultra 2",
        categoria: "smartwatch",
        preco: 10500,
        precoOriginal: 20000,
        desconto: 47,
        imagem: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXKF3ref_VW_34FR+watch-case-49-titanium-black-ultra2_VW_34FR+watch-face-49-milanese-ultra2_VW_34FR_GEO_BR?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=YzIydmRRS2pDN0FSOWdJYkhNbERrbmpDV2hhem5qNnpDenFtKzI1OXdzWjRaeVR4RW9XWXhWVHRHeXZEa3AwcGZsNDErT2hQbWVmS0VCWlVweVY1UHJPZDFtOFdYdEpGc2pnVWxteWY3dWcxYjU0WFQ4WXdVdGhrWTJkV200SUkrTHJuRytyTThJUXNINGhRVFFndnU1R3ZiM1VVanlXUmVvN3dXbUd0SjFNcDIxSk5peW5HTWQ0c004MmJwMkNtdGl6SHg4ZE5NYmlWSVQ5akRTdGpCWEN5bk81L3JjYjlSc0RPN2lHSFA1MA",
        descricao: "Smartwatch top de linha da Apple"
    }
];
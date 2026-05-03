const data = {
    produtos: [
        {
            id: 1,
            nome: "AirPods",
            preco: 1000,
            categoria: "Acessórios",
            imagem: "https://m.media-amazon.com/images/I/416ZUxb5TiL.jpg",
            descricao: "Fone de ouvido da Apple.",
            emEstoque: true 
        },

        {
            id: 2,
            nome: "iPhone 15 Pro",
            preco: 7500,
            categoria: "Celulares",
            imagem: "https://m.media-amazon.com/images/I/81Sig6biNGL._AC_SL1500_.jpg",
            descricao: "O chip A17 Pro garante o melhor desempenho.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "MacBook Air M2",
            preco: 8200,
            categoria: "Notebooks",
            imagem: "https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SL1500_.jpg",
            descricao: "Fino, leve e absurdamente rápido.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "PlayStation 5",
            preco: 3800,
            categoria: "Games",
            imagem: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_SL1000_.jpg",
            descricao: "Experimente o carregamento ultrarrápido do SSD.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Mouse Gamer Logitech",
            preco: 250,
            categoria: "Acessórios",
            imagem: "https://m.media-amazon.com/images/I/51S3E3-3pYL._AC_SL1500_.jpg",
            descricao: "Alta precisão para suas partidas.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico RGB",
            preco: 450,
            categoria: "Acessórios",
            imagem: "https://m.media-amazon.com/images/I/71Y8SndX6HL._AC_SL1500_.jpg",
            descricao: "Switch blue com iluminação personalizável.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Monitor 4K 27'",
            preco: 2100,
            categoria: "Notebooks",
            imagem: "https://m.media-amazon.com/images/I/71Vj3T9p3yL._AC_SL1500_.jpg",
            descricao: "Resolução máxima para trabalho e lazer.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Controle DualSense Edge",
            preco: 1200,
            categoria: "Games",
            imagem: "https://m.media-amazon.com/images/I/61N6K6lS6EL.jpg",
            descricao: "Controle profissional com botões mapeáveis.",
            emEstoque: false
        }
    ]
}

function formatPrice(preco) {
    const valorComCentavos = preco.toFixed(2);
    return "R$ " + valorComCentavos;
}

function createProductCard(produto) {
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 80px;">
        <h3>${produto.nome}</h3>
        <p>${formatPrice(produto.preco)}</p>
        <p><small>${produto.categoria}</small></p>
        <div class="acoes">
            <button class="btn-detalhes">Ver detalhes</button>
            <button class="btn-destacar">Destacar</button>
        </div>
    `;

    const btnDetalhes = card.querySelector('.btn-detalhes');
    btnDetalhes.addEventListener('click', (e) => {
        e.stopPropagation();
        showProductDetails(produto);
    })

    const bntDestacar = card.querySelector('.btn-destacar');
    bntDestacar.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('destaque');
    });

    return card;
}

function renderProducts(produtos) {

    const container = document.getElementById('product-list');
    
    container.innerHTML = "";

    produtos.forEach(produto => {

        const card = createProductCard(produto);        
        container.appendChild(card);
    });

    const todosOsCards = document.querySelectorAll(".card");

    todosOsCards.forEach((card, index) => {
        console.log(`Card ${index + 1} renderizado.`);

        card.style.opacity = "0";
        card.style.transition = "opacity 0.5s ease-in-out";

        setTimeout(() => {
            card.style.opacity = "1";
        }, index * 100);
    });
}

function renderCategories() {
    const select = document.getElementById('category');
    select.innerHTML = '<option value="all">Todas</option>';
    
    let categoriasAdicionadas = [];

    data.produtos.forEach(produto => {
        if (!categoriasAdicionadas.includes(produto.categoria)) {
            const opt = document.createElement('option');
            opt.textContent = produto.categoria;
            opt.value = produto.categoria;

            select.appendChild(opt);

            categoriasAdicionadas.push(produto.categoria);
        }
    })
}

function showProductDetails(produto) {
    const areaDetalhes = document.getElementById('product-details');
    const statusEstoque = produto.emEstoque ? "Disponível" : "Esgotado";

    areaDetalhes.innerHTML = `
        <div class="detail-box">
            <h2>${produto.nome}</h2>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
            <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
            <p><strong>Status:</strong> ${statusEstoque}</p>
        </div>
    `;
}

function filterProducts() {
    const termoBusca = document.getElementById('search').value.toLowerCase();
    const categoriaSelecionada = document.getElementById('category').value;

    return data.produtos.filter(produto => {
        const bateNome = produto.nome.toLowerCase().includes(termoBusca);
        const bateCategoria = categoriaSelecionada === "all" || produto.categoria === categoriaSelecionada;

        return bateNome && bateCategoria;
    });
}

document.getElementById('btnRender').addEventListener('input', () => {
    renderProducts(filterProducts());
});

document.getElementById('category').addEventListener('change', () => {
    renderProducts(filterProducts());
})

renderProducts(data.produtos);
renderCategories();
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
            imagem: "https://files.tecnoblog.net/wp-content/uploads/2025/01/iphone-15-pro-titanio-azul.png",
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
            imagem: "https://www.manualpdf.com.br/gallery/46722010.webp",
            descricao: "Experimente o carregamento ultrarrápido do SSD.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Mouse Gamer Logitech",
            preco: 650,
            categoria: "Acessórios",
            imagem: "https://primetek.vtexassets.com/arquivos/ids/181220/mouse-gamer-logitech-g-pro-2-rgb-32000dpi-8-botoes-wireless-preto-910-007294-1.jpg?v=638694524277530000",
            descricao: "Alta precisão para suas partidas.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico RGB",
            preco: 450,
            categoria: "Acessórios",
            imagem: "https://http2.mlstatic.com/D_NQ_NP_900856-MLB79078620818_092024-O.webp",
            descricao: "Switch blue com iluminação personalizável.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Monitor 4K 27'",
            preco: 2100,
            categoria: "Periférico",
            imagem: "https://www.lg.com/content/dam/channel/wcms/br/images/produtos/it/27up650-w/1-1600-27up650-w.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800",
            descricao: "Resolução máxima para trabalho e lazer.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Controle DualSense Edge",
            preco: 500,
            categoria: "Games",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07MESCqFKNBUuZyWJ4zDlNsbHi3hA7TF-Sw&s",
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
    
    card.setAttribute('data-id', produto.id);

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
        const idDoProduto = card.getAttribute('data-id');
        console.log(`Card ${index + 1} encontrado no DOM. ID do Produto: ${idDoProduto}`);

        card.style.border = "1px solid #3498db";
        card.style.opacity = "0";

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

document.getElementById('search').addEventListener('input', () => {
    renderProducts(filterProducts());
});

document.getElementById('btnRender').addEventListener('input', () => {
    renderProducts(filterProducts());
});

document.getElementById('category').addEventListener('change', () => {
    renderProducts(filterProducts());
});

renderProducts(data.produtos);
renderCategories();
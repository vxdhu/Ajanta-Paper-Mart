const products = [
    {
        name: "Duplex Board (LWC / HWC)",
        description: "Coated Grey Back board with a printable white surface.",
        image_src: "images/duplex_board 1.png",
        uses: "FMCG packaging, pharmaceutical cartons, and garment boxes.",
        specs: "230 GSM – 450 GSM"
    },
    {
        name: "Grey Board (Solid Board)",
        description: "A dense, 100% recycled board known for its high stiffness and smooth finish.",
        image_src: "images/grey_board 1.png",
        uses: "Rigid boxes, bookbinding, and calendar stands.",
        specs: "High caliper/thickness 1mm - 4mm"
    },
    {
        name: "Kraft Board",
        description: "Strong, brown-faced board made from recycled pulp. High bursting strength for industrial use.",
        image_src: "images/kraft_board.png",
        uses: "Corrugated boxes, heavy-duty cartons, and liners.",
        specs: "120 GSM – 300 GSM. 18 BF – 24 BF."
    },
    {
        name: "Virgin Kraft Board",
        description: "Premium virgin kraft board with superior strength properties and bright white appearance.",
        image_src: "images/virgin_kraft_board.png",
        uses: "High-end packaging, premium boxes, and specialty applications.",
        specs: "150 GSM – 350 GSM"
    },
    {
        name: "Kuppa Board",
        description: "Specialized board with excellent printability and stiffness for various applications.",
        image_src: "images/kuppa_board.png",
        uses: "Bakery boxes, food packaging, and display boxes.",
        specs: "180 GSM – 280 GSM"
    },
    {
        name: "Hardboard",
        description: "High-density hardboard manufactured from compressed wood fibers for maximum durability.",
        image_src: "images/hardboard.png",
        uses: "Construction, backing for furniture, and industrial applications.",
        specs: "2mm – 6mm thickness"
    },
    {
        name: "Millboard",
        description: "Thick, multi-layered board made from recycled paper with excellent structural integrity.",
        image_src: "images/millboard.png",
        uses: "Bookbinding, rigidity elements, and backing material.",
        specs: "0.5mm – 3mm thickness"
    },
    {
        name: "Art Card",
        description: "High-quality coated art card with superior printing surface and vibrant color reproduction.",
        image_src: "images/art_card.png",
        uses: "Business cards, greeting cards, and premium brochures.",
        specs: "200 GSM – 350 GSM"
    },
    {
        name: "Art Paper",
        description: "Premium art paper with excellent coating for fine printing and color accuracy.",
        image_src: "images/art_paper.png",
        uses: "Brochures, catalogues, art prints, and promotional materials.",
        specs: "100 GSM – 300 GSM"
    },
    {
        name: "SBS Board",
        description: "Solid Bleached Sulfate board with bright white finish and excellent printability.",
        image_src: "images/sbs_board.png",
        uses: "Premium packaging, food containers, and high-end branding.",
        specs: "200 GSM – 400 GSM"
    }
];

// Function to render products dynamically
function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Loop through products and create HTML for each
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'products-card';
        productCard.innerHTML = `
            <img src="${product.image_src}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <br>
            <p><span>Uses : </span>${product.uses}</p>
            <p><span>Specs : </span>${product.specs}</p>
            <button>request quote &rarr;</button>
        `;
        container.appendChild(productCard);
    });
}

// Render products when the DOM is loaded
document.addEventListener('DOMContentLoaded', renderProducts);

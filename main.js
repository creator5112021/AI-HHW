const data = {
    "Plastic Bottle": ["PET Plastic", "Recyclable", "Blue Recycling Bin", "~450 years", "97.89828"],
    "Banana Peel": ["Organic Matter", "Organic Waste", "Green Compost Bin", "3-4 weeks", "99.10231"],
    "Newspaper": ["Paper", "Recyclable", "Blue Recycling Bin", "2-6 weeks", "97.21452"],
    "Metal Can": ["Aluminium", "Recyclable", "Blue Recycling Bin", "80-200 years", "96.88231"],
    "Cardboard Box": ["Cardboard", "Recyclable", "Blue Recycling Bin", "2 months", "95.77891"],
    "Glass Bottle": ["Glass", "Recyclable", "Blue Recycling Bin", "1 million years", "98.11234"],
    "Milk Carton": ["Composite Packaging", "Recyclable", "Blue Recycling Bin", "5 years", "94.88213"],
    "Apple Core": ["Organic Matter", "Organic Waste", "Green Compost Bin", "2 months", "98.99421"],
    "Plastic Bag": ["Plastic", "Non-Biodegradable", "Plastic Collection Bin", "20 years", "93.55127"],
    "Battery": ["Mixed Chemicals", "Hazardous Waste", "E-Waste Bin", "100+ years", "99.33112"],
    "Animal Bones": ["Organic Matter", "Bio Waste", "Green Bio-Waste Bin", "1–6 months", "97.54321"],
    "Fish Remains": ["Organic Matter", "Bio Waste", "Green Bio-Waste Bin", "2–4 weeks", "98.22134"],
    "Chicken Bones": ["Organic Matter", "Bio Waste", "Green Bio-Waste Bin", "1–6 months", "97.88451"],
    "Egg Shells": ["Calcium Carbonate", "Bio Waste", "Green Bio-Waste Bin", "Up to 1 year", "96.99231"],
    "Food Scraps": ["Organic Matter", "Bio Waste", "Green Bio-Waste Bin", "1–4 weeks", "98.66782"],
    "Garden Waste": ["Organic Plant Matter", "Bio Waste", "Green Bio-Waste Bin", "2–8 weeks", "97.11245"]
};
function analyze(name) {
    const idle = document.getElementById('idle');
    const analysis = document.getElementById('analysis');
    const result = document.getElementById('result');
    const fill = document.getElementById('fill');
    const pct = document.getElementById('pct');
    const anTitle = document.getElementById('anTitle');
    const scan = document.getElementById('scanline');

    idle.style.display = 'none';
    result.style.display = 'none';
    analysis.style.display = 'block';

    anTitle.textContent = 'Analyzing Object...';
    fill.style.width = '0%';

    scan.style.animation = 'sweep .9s linear infinite';

    let target = parseFloat(data[name][4]);
    let value = 0;

    const timer = setInterval(() => {
        value += Math.random() * 2.8 + 0.9;

        if (value >= target) {
            value = target;
            clearInterval(timer);

            scan.style.animation = 'none';
            scan.style.opacity = '0';

            analysis.style.display = 'none';

            result.innerHTML = `
   <h2>${name}</h2>
   <p><span class="badge">${data[name][1]}</span></p>

   <div class="row"><span>Material</span><strong>${data[name][0]}</strong></div>
   <div class="row"><span>Dustbin</span><strong>${data[name][2]}</strong></div>
   <div class="row"><span>Decomposition Time</span><strong>${data[name][3]}</strong></div>
   <div class="row"><span>Confidence</span><strong>${data[name][4]}%</strong></div>

   <p class="muted" style="margin-top:16px">
   Dispose responsibly to reduce environmental impact.
   </p>
   `;

            result.style.display = 'block';
        }

        pct.textContent = value.toFixed(5) + '%';
        fill.style.width = value + '%';
        scan.style.opacity = '1';

    }, 35);
}

document.getElementById('bioBag').addEventListener('click', () => {
    const open = document.body.classList.toggle('bio-open');
    document.getElementById('bioTray').classList.toggle('open', open);
    document.getElementById('bioBag').classList.toggle('open', open);
    if (!open) {
        document.querySelectorAll('.obj.bio-hidden').forEach(el => {
            el.style.left = el.dataset.homeLeft + 'px';
            el.style.top = el.dataset.homeTop + 'px';
        });
    }
});

document.querySelectorAll('.obj').forEach(el => {
    let drag = false,
        ox = 0,
        oy = 0;

    el.addEventListener('pointerdown', e => {
        drag = true;
        ox = e.clientX - el.offsetLeft;
        oy = e.clientY - el.offsetTop;
        el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', e => {
        if (!drag) return;
        el.style.left = (e.clientX - ox) + 'px';
        el.style.top = (e.clientY - oy) + 'px';
    });

    el.addEventListener('pointerup', () => {
        drag = false;

        const s = document.getElementById('screen').getBoundingClientRect();
        const b = el.getBoundingClientRect();

        const hit = !(b.right < s.left || b.left > s.right || b.bottom < s.top || b.top > s.bottom);

        if (hit) {
            analyze(el.dataset.name);
        }
    });
});
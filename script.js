// NAVIGASI HALAMAN
const tombolNavigasi = document.querySelectorAll("[data-target]");
const semuaHalaman = document.querySelectorAll("main section");

semuaHalaman.forEach(function(halaman) {
    halaman.style.display = "none";
});

document.getElementById("beranda").style.display = "block";

const tombolAwal = document.querySelector('[data-target="beranda"]');
if (tombolAwal) {
    tombolAwal.classList.add("aktif");
}

tombolNavigasi.forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        const target = tombol.dataset.target;

        semuaHalaman.forEach(function(halaman) {
            halaman.style.display = "none";
        });

        document.getElementById(target).style.display = "block";

        tombolNavigasi.forEach(function(btn) {
            btn.classList.remove("aktif");
        });

        tombol.classList.add("aktif");
    });
});


// KONVERTER BILANGAN
const form = document.querySelector('form');
const bilangan = document.getElementById('bilangan');
const teksBiner = document.getElementById('hasil_biner');
const teksOktal = document.getElementById('hasil_oktal');
const teksDesimal = document.getElementById('hasil_desimal');
const teksHeksa = document.getElementById('hasil_heksa');
const semuaNilai = document.querySelectorAll('input[name="sistem_bilangan"]');
const hasil = document.getElementById('hasil');

const hasilSama = document.getElementById('hasil_sama');
const hasilLain = document.getElementById('hasil_lain');
const teksHasil = {
    'biner': document.getElementById('kotak_biner'),
    'oktal': document.getElementById('kotak_oktal'),
    'desimal': document.getElementById('kotak_desimal'),
    'heksadesimal': document.getElementById('kotak_heksa')
};

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
}


function inputInteraktif(pilihan) {
    const semuaOpsi = document.querySelectorAll('.opsi');
    const aktif = document.querySelector(`input[value="${pilihan}"]`);
    const opsiAktif = aktif.parentElement;

    semuaOpsi.forEach(opsi => {
        opsi.style.backgroundColor = 'transparent';
        opsi.style.color = 'black';
    });

    opsiAktif.style.backgroundColor = '#57707a';
    opsiAktif.style.color = 'white';

    hasilSama.innerHTML = '';
    hasilLain.innerHTML = '';

    for(let opsi in teksHasil) {
        if (opsi === pilihan) {
            hasilSama.appendChild(teksHasil[opsi]);
        }

        else {
            hasilLain.appendChild(teksHasil[opsi]);
        }
    }
}

function prosesKonversi() {
    const pilihan = document.querySelector('input[name="sistem_bilangan"]:checked').value;

    inputInteraktif(pilihan);

    if (pilihan === 'biner'){
        bilangan.value = bilangan.value.replace(/[^01]/g, '');
    }

    if (pilihan === 'oktal'){
        bilangan.value = bilangan.value.replace(/[^01234567]/g, '');
    }

    if (pilihan === 'desimal'){
        bilangan.value = bilangan.value.replace(/[^0123456789]/g, '');
    }

    if (pilihan === 'heksadesimal'){
        bilangan.value = bilangan.value.replace(/[^0123456789abcdefABCDEF]/g, '');
    }

    if (bilangan.value === ''){
        teksBiner.textContent = "";
        teksOktal.textContent = "";
        teksDesimal.textContent = "";
        teksHeksa.textContent = "";
        return;
    }

    let nilaiDesimal = 0;

    if (pilihan === 'biner'){
        nilaiDesimal = parseInt(bilangan.value, 2);
    }

    if (pilihan === 'oktal'){
        nilaiDesimal = parseInt(bilangan.value, 8);
    }

    if (pilihan === 'desimal'){
        nilaiDesimal = parseInt(bilangan.value, 10);
    }

    if (pilihan === 'heksadesimal'){
        nilaiDesimal = parseInt(bilangan.value, 16);
    }

    teksBiner.textContent = nilaiDesimal.toString(2);
    teksOktal.textContent = nilaiDesimal.toString(8);
    teksDesimal.textContent = nilaiDesimal.toString(10);
    teksHeksa.textContent = nilaiDesimal.toString(16).toUpperCase();
}

bilangan.addEventListener('input', prosesKonversi);

semuaNilai.forEach(function(nilai) {
    nilai.addEventListener('change', function() {
        bilangan.value = '';

        inputInteraktif(this.value);
        prosesKonversi();
    });
});

prosesKonversi();


// VISUALISASI BIT + CARA KERJA
const visualInput = document.getElementById('visual-input');
const bitBoxes = document.getElementById('bit-boxes');
const caraKerja = document.getElementById('cara-kerja');

function renderVisualisasi() {
    visualInput.value = visualInput.value.replace(/[^0-9]/g, '');

    if (visualInput.value === '') {
        bitBoxes.innerHTML = '';
        caraKerja.innerHTML = '';
        return;
    }

    let n = parseInt(visualInput.value, 10);
    const biner = n.toString(2).padStart(8, '0');

    bitBoxes.innerHTML = biner.split('').map(function(bit) {
        return '<div class="bit-box ' +
            (bit === '1' ? 'on' : '') +
            '">' + bit + '</div>';
    }).join('');

    let langkah = [];
    let sisa = n;

    if (sisa === 0) {
        langkah.push('0 ÷ 2 = 0, sisa 0');
    }

    while (sisa > 0) {
        const hasilBagi = Math.floor(sisa / 2);
        const sisaBagi = sisa % 2;

        langkah.push(
            sisa + ' ÷ 2 = ' + hasilBagi + ', sisa ' + sisaBagi
        );

        sisa = hasilBagi;
    }

    langkah.push(
        'Baca sisa dari bawah ke atas untuk mendapatkan hasil biner: ' +
        n.toString(2)
    );

    caraKerja.innerHTML = langkah.map(function(l) {
        return '<div class="step-row">' + l + '</div>';
    }).join('');
}

if (visualInput) {
    visualInput.addEventListener('input', renderVisualisasi);
}

// Kalkulator
const radioBasis = document.querySelectorAll('input[name="basis"]');
const inputAngka1 = document.getElementById('angka1');
const inputAngka2 = document.getElementById('angka2');
const selectOperator = document.getElementById('operator');

const kalHasilBiner = document.getElementById('kal_hasil_biner');
const kalHasilOktal = document.getElementById('kal_hasil_oktal');
const kalHasilDesimal = document.getElementById('kal_hasil_desimal');
const kalHasilHeksa = document.getElementById('kal_hasil_heksa');

function setSemuaHasil(teks) {
    kalHasilBiner.textContent = teks;
    kalHasilOktal.textContent = teks;
    kalHasilDesimal.textContent = teks;
    kalHasilHeksa.textContent = teks;
}

function filterInput(input, tipe) {
    if (tipe === '2') {
        input.value = input.value.replace(/[^01]/g, '');
    } 
    else if (tipe === '8') {
        input.value = input.value.replace(/[^0-7]/g, '');
    } 
    else if (tipe === '10') {
        input.value = input.value.replace(/[^0-9]/g, '');
    } 
    else if (tipe === '16') {
        input.value = input.value.replace(/[^0-9a-fA-F]/g, '');
    }
}

function hitung() {
    const basis = parseInt(document.querySelector('input[name="basis"]:checked').value);
    const val1 = inputAngka1.value.trim();
    const val2 = inputAngka2.value.trim();
    const operator = selectOperator.value;

    if (val1 === '' || val2 === '') {
        setSemuaHasil('-');
        return;
    }

    const desimal1 = parseInt(val1, basis);
    const desimal2 = parseInt(val2, basis);
    let hasilDesimal = 0;

    switch (operator) {
        case '+': hasilDesimal = desimal1 + desimal2; break;
        case '-': hasilDesimal = desimal1 - desimal2; break;
        case '*': hasilDesimal = desimal1 * desimal2; break;
        case '/':
            if (desimal2 === 0) {
                setSemuaHasil('Error: Dibagi 0');
                return;
            }
            hasilDesimal = desimal1 / desimal2; 
            break;
    }

    function Persamaan(targetBasis) {
        if (isNaN(hasilDesimal)) return '-';
        const strAngka1 = desimal1.toString(targetBasis).toUpperCase();
        const strAngka2 = desimal2.toString(targetBasis).toUpperCase();
        const strHasil = hasilDesimal.toString(targetBasis).toUpperCase();
        
        return `${strAngka1} ${operator} ${strAngka2} = ${strHasil}`;
    }

    kalHasilBiner.textContent = Persamaan(2);
    kalHasilOktal.textContent = Persamaan(8);
    kalHasilDesimal.textContent = Persamaan(10);
    kalHasilHeksa.textContent = Persamaan(16);
}

function tanganiInput() {
    const basisSaatIni = document.querySelector('input[name="basis"]:checked').value;
    filterInput(this, basisSaatIni);
    hitung();
}

inputAngka1.addEventListener('input', tanganiInput);
inputAngka2.addEventListener('input', tanganiInput);
selectOperator.addEventListener('change', hitung);

radioBasis.forEach(radio => {
    radio.addEventListener('change', () => {
        inputAngka1.value = '';
        inputAngka2.value = '';
        setSemuaHasil('-');
    });
});
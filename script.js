const bilangan = document.getElementById('bilangan');
const teksBiner = document.getElementById('hasil_biner');
const teksOktal = document.getElementById('hasil_oktal');
const teksDesimal = document.getElementById('hasil_desimal');
const teksHeksa = document.getElementById('hasil_heksa');

bilangan.addEventListener('input', function(){
    const pilihan = document.querySelector('input[name="sistem_bilangan"]:checked').value;

    if (pilihan === 'biner'){
        this.value = this.value.replace(/[^01]/g, '');
    }

    if (pilihan === 'oktal'){
        this.value = this.value.replace(/[^01234567]/g, '');
    }

    if (pilihan === 'desimal'){
        this.value = this.value.replace(/[^0123456789]/g, '');
    }

    if (pilihan === 'heksadesimal'){
        this.value = this.value.replace(/[^0123456789abcdefABCDEF]/g, '');
    }

    if (this.value === ''){
        teksBiner.textContent = "Biner: ";
        teksOktal.textContent = "Oktal: ";
        teksDesimal.textContent = "Desimal: ";
        teksHeksa.textContent = "Heksa Desimal: ";
        return;
    }

    let nilaiDesimal = 0;

    if (pilihan === 'biner'){
        nilaiDesimal = parseInt(this.value, 2);
    }

    if(pilihan === 'oktal'){
        nilaiDesimal = parseInt(this.value, 8);
    }

    if(pilihan === 'desimal'){
        nilaiDesimal = parseInt(this.value, 10);
    }

    if(pilihan === 'heksadesimal'){
        nilaiDesimal = parseInt(this.value, 16);
    }

    teksBiner.textContent = "Biner: " + nilaiDesimal.toString(2);
    teksOktal.textContent = "Oktal: " + nilaiDesimal.toString(8);
    teksDesimal.textContent = "Desimal: " + nilaiDesimal.toString(10);
    teksHeksa.textContent = "Heksa Desimal: " + nilaiDesimal.toString(16);
});
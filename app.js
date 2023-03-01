const namap1 = document.getElementById('p1-nama');
const namap2 = document.getElementById('p2-nama');

const umurp1 = document.getElementById('p1-umur');
const umurp2 = document.getElementById('p2-umur');

const genderp1 = document.getElementById('p1-gender');
const genderp2 = document.getElementById('p2-gender');

const hpp1 = document.getElementById('p1-hp');
const hpp2 = document.getElementById('p2-hp');

const battlebtn = document.getElementById('battlebtn');
const p1deff = document.getElementById('p1-deff');
const p1atk = document.getElementById('p1-atk');
const p2deff = document.getElementById('p2-deff');
const p2atk = document.getElementById('p2-atk');
const listLog = document.getElementById('ronde');
const listDetail = document.getElementById('detailRonde');

let ronde = 1;
let atkp1 = null;
let atkp2 = null;

class player {
    constructor(nama, umur) {
        this.nama = nama;
        this.umur = umur;
    }

    serang(dmg) {
        return this.nama + ' Menyerang! Memberikan Kerusakan Sebesar : ' + dmg;
    }

    bertahan(dmg) {
        return this.nama + 'Bertahan! Menahan Kerusakan Sebesar : ' + dmg;
    }
}

class player1 extends player {
    constructor(nama, umur, gender) {
        super(nama, umur);
        this.hp = 18;
        this.atk = 4;
        this.deff = 2;
        this.sisa = this.hp;
        if (gender === 0)
            this.gender = 'Laki-laki';
    }

    sekarang(dmg) {
        if (dmg === true) {
            return Math.floor(this.sisa / this.hp * 100);
        } else {
            return Math.floor(this.hp / this.hp * 100) + '%';
        }
    }

    serang() {
        return `<u><b>${this.nama}</b> Menyerang!</u> dengan Kekuatan sebesar : <span class="text-success">${this.atk}</span>.`;
    }

    tahan() {
        return `<u><b>${this.nama}</b> Bertahan!</u> dengan Ketahanan sebesar : <span class="text-success">${this.deff}</span>.`;
    }
}

class player2 extends player {
    constructor(nama, umur, gender) {
        super(nama, umur);
        this.hp = 20;
        this.atk = 3;
        this.deff = 3;
        this.sisa = this.hp;
        if (gender === 1)
            this.gender = 'Perempuan';
    }

    sekarang(dmg) {
        if (dmg === true) {
            return Math.floor(this.sisa / this.hp * 100);
        } else {
            return Math.floor(this.hp / this.hp * 100) + '%';
        }
    }

    serang() {
        return `<u><b>${this.nama}</b> Menyerang!</u> dengan Kekuatan sebesar : <span class="text-success">${this.atk}</span>.`;
    }

    tahan() {
        return `<u><b>${this.nama}</b> Bertahan!</u> dengan Ketahanan sebesar : <span class="text-success">${this.deff}</span>.`;
    }
}

const button = (p, e) => {
    if (p === 1) {
        p1atk.disabled = true;
        p1deff.disabled = true;
        if (e === 'atk') {
            p1atk.classList = 'btn btn-success mx-2';
            atkp1 = true;
        } else if (e === 'deff') {
            p1deff.classList = 'btn btn-success mx-2';
            atkp1 = false;
        }
    } else if (p === 2) {
        p2atk.disabled = true;
        p2deff.disabled = true;
        if (e === 'atk') {
            p2atk.classList = 'btn btn-success mx-2';
            atkp2 = true;
        } else if (e === 'deff') {
            p2deff.classList = 'btn btn-success mx-2';
            atkp2 = false;
        }
    }
}

function stance(p, e) {
    event.preventDefault();
    if (p === 1) {
        button(p, e);
    } else if (p === 2) {
        button(p, e);
    }

    if (p1atk.disabled === true && p2atk.disabled === true) {
        battlebtn.disabled = false;
    }
}

function catatan(r, msg) {
    let createListLog = document.createElement('a');
    createListLog.className = 'list-group-item list-group-item-action animate__animated animate__bounce';
    createListLog.href = `#ronde${r}`;
    createListLog.textContent = `Ronde ${r}`;
    listLog.appendChild(createListLog);

    let createListUl = document.createElement('ul');
    createListUl.className = 'list-group list-group-flush mb-3';

    let createListJudul = document.createElement('li');
    createListJudul.className = 'list-group-item fw-bold text-white text-center bg-primary animate__animated animate__fadeInUp';
    createListJudul.id = `ronde${r}`;
    createListJudul.textContent = `Ronde ${r}`;

    createListUl.appendChild(createListJudul);

    for (i = 0; i < msg.length; i++) {
        let pesan = msg[i];
        let j = i + 1;
        setTimeout(() => {
            let createListLi = document.createElement('li');
            createListLi.className = 'list-group-item text-secondary animate__animated animate__fadeInUp';
            createListLi.innerHTML = '<small>' + pesan + '</small>';
            
            createListUl.appendChild(createListLi);
        }, j * 1000);
    }

    listDetail.appendChild(createListUl);

}

function end(draw, w, l) {
    let createListLog = document.createElement('a');
    createListLog.className = 'list-group-item list-group-item-action animate__animated animate__bounce';
    createListLog.href = `#rondeAkhir`;
    createListLog.textContent = `Ronde Akhir`;
    listLog.appendChild(createListLog);

    let createListUl = document.createElement('ul');
    createListUl.className = 'list-group list-group-flush mb-3';

    let createListJudul = document.createElement('li');
    createListJudul.id = `rondeAkhir`;
    if (!draw) {
        createListJudul.className = 'list-group-item fw-light text-light text-center bg-success animate__animated animate__fadeInUp';
        createListJudul.innerHTML = `Dikarenakan darah <u>${l}</u> Habis, Maka Pemenangnya Adalah <span class="fs-5 fw-bold">${w}</span>. Selamat Untuk Pemenang!`;
    } else {
        createListJudul.className = 'list-group-item fw-light text-light text-center bg-danger animate__animated animate__fadeInUp';
        createListJudul.innerHTML = 'Kedua darah Pemain habis, Sehingga pertandingan dinyatakan Draw! :(';
    }
    setTimeout(() => {
        createListUl.appendChild(createListJudul);
        listDetail.appendChild(createListUl);
    }, 8000)
}

battlebtn.addEventListener('click', () => {
    event.preventDefault();

    battlebtn.disabled = true;
    let log = [];
    let warna = 'success';
    const progress = document.getElementsByClassName('progress');
    const hide = document.getElementById('showLoading');
    const show = document.getElementById('hideLoading');

    if (atkp1 === true) {
        p1atk.classList = 'btn btn-primary mx-2';
        log.push(p1.serang());
    } else if (atkp1 === false) {
        p1deff.classList = 'btn btn-primary mx-2';
        log.push(p1.tahan());
    }

    if (atkp2 === true) {
        p2atk.classList = 'btn btn-primary mx-2';
        log.push(p2.serang());
    } else if (atkp2 === false) {
        p2deff.classList = 'btn btn-primary mx-2';
        log.push(p2.tahan());
    }

    if (atkp1 === true && atkp2 === true) {
        p1.sisa -= p2.atk;
        p2.sisa -= p1.atk;

        let warna2 = 'success';
        if (p1.sekarang(true) <= 0) {
            p1.sisa = 0;
            warna = 'danger';
        } else if (p1.sekarang(true) <= 40) {
            warna = 'danger';
        }

        if (p2.sekarang(true) <= 0) {
            p2.sisa = 0;
            warna2 = 'danger';
        } else if (p2.sekarang(true) <= 40) {
            warna2 = 'danger';
        }

        log.push('Kedua Pemain saling Baku Hantam, seru sekali Pemirsa... Kita liat siapa yang Tumbang lebih dulu.');
        log.push(`<u>Sisa Darah <b>${p1.nama}</b></u> tinggal : <span class="text-${warna}">${p1.sisa}</span>`);
        log.push(`<u>Sementara sisa Darah <b>${p2.nama}</b></u> tinggal : <span class="text-${warna2}">${p2.sisa}</span>`);
    } else if (atkp1 === false && atkp2 === false) {
        log.push('Kedua Pemain sama-sama Bertahan, Tidak ada yang Baku Hantam, wkwkwk... Serang dong!');
        log.push('Sisa darah Kedua Pemain masih tetap ya, Gak ada yg gebuk juga... Lol')
    } else if (atkp1 === true && atkp2 === false) {
        let damage = p1.atk - p2.deff;
        p2.sisa -= damage;

        if (p2.sekarang(true) <= 0) {
            p2.sisa = 0;
            warna = 'danger';
        } else if (p2.sekarang(true) <= 40) {
            warna = 'danger';
        }

        log.push(`<u><b>${p1.nama}</b> Menyerang, sementara <b>${p2.nama}</b> Bertahan...</u> Sehingga <b>${p2.nama}</b> hanya menerima Kerusakan sebanyak : <span class="text-success">${damage}</span>.`);
        log.push(`<u>Sehingga sisa Darah <b>${p2.nama}</b></u> tinggal : <span class="text-${warna}">${p2.sisa}</span>`);
    } else if (atkp1 === false && atkp2 === true) {
        let damage = p2.atk - p1.deff;
        p1.sisa -= damage;

        if (p1.sekarang(true) <= 0) {
            p1.sisa = 0;
            warna = 'danger';
        } else if (p1.sekarang(true) <= 40) {
            warna = 'danger';
        }

        log.push(`<u><b>${p1.nama}</b> Bertahan, sementara <b>${p2.nama}</b> Menyerang...</u> Sehingga <b>${p1.nama}</b> hanya menerima Kerusakan sebanyak : <span class="text-success">${damage}</span>.`);
        log.push(`<u>Sehingga sisa Darah <b>${p1.nama}</b></u> tinggal : <span class="text-${warna}">${p1.sisa}</span>`);
    }

    show.className = 'row';
    hide.className = 'd-none';
    p1atk.disabled = false;
    p1deff.disabled = false;
    p2atk.disabled = false;
    p2deff.disabled = false;
    hpp1.style.width = p1.sekarang(true) + '%';
    hpp1.innerText = `${p1.sisa} (${p1.sekarang(true)}%)`;
    hpp2.style.width = p2.sekarang(true) + '%';
    hpp2.innerText = `${p2.sisa} (${p2.sekarang(true)}%)`;

    if (p1.sisa <= 0) {
        log.push(`<i><u>Darah <b>${p1.nama}</b> Habis</u>. Omagaaa...!!!</i>`);
    } else if (p1.sekarang(true) <= 40) {
        hpp1.classList = 'progress-bar bg-danger';
        log.push(`<u>Nampaknya Darah <b>${p1.nama}</b> sudah mau Habis</u>. Segera gunakan Jusur pamungkas!`);
    }

    if (p2.sisa <= 0) {
        log.push(`<i><u>Darah <b>${p2.nama}</b> Habis</u>. Omagaaa...!!!</i>`);
    } else if (p2.sekarang(true) <= 40) {
        hpp2.classList = 'progress-bar bg-danger';
        log.push(`<u>Nampaknya Darah <b>${p2.nama}</b> sudah mau Habis</u>. Segera gunakan Jusur pamungkas!`);
    }

    catatan(ronde, log);
    ronde++;

    setTimeout(() => {
        if (p1.sisa <= 0 && p2.sisa <= 0)
            end(true, p1.nama, p2.nama);
        else if (p1.sisa <= 0)
            end(false, p2.nama, p1.nama);
        else if (p2.sisa <= 0)
            end(false, p1.nama, p2.nama);
    }, 1000);

    if (p1.sisa <= 0) {
        p1atk.disabled = true;
        p1deff.disabled = true;
        p2atk.disabled = true;
        p2deff.disabled = true;
        progress[0].innerHTML = '<span class="text-danger">Darah Habis</span>';
    }

    if (p2.sisa <= 0) {
        p2atk.disabled = true;
        p2deff.disabled = true;
        p1atk.disabled = true;
        p1deff.disabled = true;
        progress[1].innerHTML = '<span class="text-danger">Darah Habis</span>';
    }
})

const p1 = new player1('Ari Budiman', 27, 0);
const p2 = new player2('Kobo Kanaeru', 21, 1);

namap1.textContent = p1.nama;
umurp1.textContent = p1.umur;
genderp1.textContent = p1.gender;
hpp1.style.width = p1.sekarang();
hpp1.innerText = `${p1.sisa} (${p1.sekarang()})`;

namap2.textContent = p2.nama;
umurp2.textContent = p2.umur;
genderp2.textContent = p2.gender;
hpp2.style.width = p2.sekarang();
hpp2.innerText = `${p2.sisa} (${p2.sekarang()})`;

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const nilaiPilihan = {
      "Sangat Setuju": 5,
      "Setuju": 4,
      "Netral": 3,
      "Tidak Setuju": 2,
      "Sangat Tidak Setuju": 1
    };

    const skor = {
      "Extrovert": 0,
      "Introvert": 0,
      "Sensing": 0,
      "Intuition": 0,
      "Thinking": 0,
      "Feeling": 0,
      "Judging": 0,
      "Perceiving": 0
    };

    let nomorPertanyaan = 0;

    const containerPertanyaan = document.getElementById('questionContainer');
    const tombolSelanjutnya = document.getElementById('nextButton');
    const containerHasil = document.getElementById('resultContainer');
    const hasilMBTI = document.getElementById('mbtiResult');
    const deskripsiMBTI = document.getElementById('mbtiDescription');

    function tampilkanPertanyaan(index) {
      const pertanyaan = data.Pernyataan[index];
      containerPertanyaan.innerHTML = "";

      const teksPertanyaan = document.createElement('p');
      teksPertanyaan.className = 'question-text';
      teksPertanyaan.textContent = pertanyaan.question;
      containerPertanyaan.appendChild(teksPertanyaan);

      pertanyaan.pilihan.forEach(option => {
        const button = document.createElement('button');
        button.className = `option-button ${option.toLowerCase().replace(/\s+/g, "-")}`;
        button.dataset.question = `question_${index}`;
        button.dataset.value = option;
        button.title = option;

        button.addEventListener('click', () => {
          document.querySelectorAll(`button[data-question="question_${index}"]`)
            .forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        });

        containerPertanyaan.appendChild(button);
      });
    }

    tombolSelanjutnya.addEventListener('click', function(event) {
      event.preventDefault();

      const opsiYangDipilih = document.querySelector(`button[data-question="question_${nomorPertanyaan}"].selected`);
      if (opsiYangDipilih) {
        const nilai = nilaiPilihan[opsiYangDipilih.dataset.value];
        const pertanyaan = data.Pernyataan[nomorPertanyaan];

        // untuk menambah nilai ke skor
        if (pertanyaan.positive === "Extrovert") {
          skor["Extrovert"] += nilai;
        } else if (pertanyaan.negative === "Extrovert") {
          skor["Introvert"] += nilai;
        }

        if (pertanyaan.positive === "Sensing") {
          skor["Sensing"] += nilai;
        } else if (pertanyaan.negative === "Sensing") {
          skor["Intuition"] += nilai;
        }

        if (pertanyaan.positive === "Thinking") {
          skor["Thinking"] += nilai;
        } else if (pertanyaan.negative === "Thinking") {
          skor["Feeling"] += nilai;
        }

        if (pertanyaan.positive === "Judging") {
          skor["Judging"] += nilai;
        } else if (pertanyaan.negative === "Judging") {
          skor["Perceiving"] += nilai;
        }

        nomorPertanyaan++;

        if (nomorPertanyaan < data.Pernyataan.length) {
          tampilkanPertanyaan(nomorPertanyaan);
        } else {
          let hasil = "";

          if (skor["Extrovert"] > skor["Introvert"]) {
            hasil += "E";
          } else {
            hasil += "I";
          }

          if (skor["Sensing"] > skor["Intuition"]) {
            hasil += "S";
          } else {
            hasil += "N";
          }

          if (skor["Thinking"] > skor["Feeling"]) {
            hasil += "T";
          } else {
            hasil += "F";
          }

          if (skor["Judging"] > skor["Perceiving"]) {
            hasil += "J";
          } else {
            hasil += "P";
          }

          const hasilMBTIString = hasil;
          const deskripsi = {
            ISTJ: "ISTJ: Si Tanggung Jawab - Tipe yang disiplin, teratur, dan sangat bisa diandalkan. Suka rutinitas, mematuhi aturan, dan bekerja dengan teliti.",
            ISFJ: "ISFJ: Si Penjaga - Setia, sabar, dan suka membantu. Mereka perhatian pada kebutuhan orang lain dan sering bekerja di belakang layar.",
            INFJ: "INFJ: Si Visioner - Pendiam tapi punya idealisme kuat. Sangat peduli pada makna hidup dan suka membantu orang lain dengan cara yang mendalam.",
            INTJ: "INTJ: Si Perencana Strategis - Cerdas, fokus, dan punya visi jangka panjang. Suka membuat rencana matang dan bekerja secara mandiri.",
            ESTJ: "ESTJ: Si Pemimpin Tangguh - Tegas, praktis, dan suka mengatur. Mereka suka ketertiban dan memastikan semua berjalan sesuai aturan.",
            ESFJ: "ESFJ: Si Pengasuh - Hangat, perhatian, dan peduli pada kesejahteraan orang lain. Suka menjaga harmoni dalam kelompok.",
            ENFJ: "ENFJ: Si Motivator - Karismatik, peduli, dan bisa menginspirasi banyak orang. Pandai membaca perasaan orang lain dan sering jadi pemimpin alami.",
            ENTJ: "ENTJ: Si Komandan - Penuh percaya diri, tegas, dan visioner.  Mereka cepat mengambil keputusan dan suka memimpin dengan strategi.",
            ESTP: "ESTP: Si Petualang - Aktif, berani, dan suka hidup cepat. Mereka senang aksi langsung dan cepat mengambil keputusan.", 
            ESFP: "ESFP: Si Penghibur - Ramah, suka bersenang-senang, dan hidup di saat ini. Tipe ini mudah bergaul dan menyenangkan.",
            ENFP: "ENFP: Si Inspirator - Antusias, penuh ide, dan kreatif. Mereka suka berbagi energi positif, cepat bosan dengan rutinitas, dan penuh semangat mengejar impian.",
            ENTP: "ENTP: Si Debater - Penuh ide, suka tantangan, dan pandai bicara. Suka berdiskusi dan memecahkan masalah dengan cara tak biasa.",
            ISTP: "ISTP: Si Pemecah Masalah - Praktis, suka mencoba hal baru, dan tenang di situasi krisis. Tipe yang sangat logis dan suka tantangan teknis.",
            ISFP: "ISFP: Si Seniman - Lembut, artistik, dan lebih suka tindakan daripada kata-kata. Suka hidup damai dan menikmati momen sekarang.",
            INFP: "INFP: Si Idealistis - Penuh imajinasi dan nilai-nilai pribadi yang kuat. Tipe ini sensitif, penuh empati, dan ingin membuat dunia jadi lebih baik.",
            INTP: "INTP: si Pemikir Logis - Suka menganalisis, penasaran, dan sering memikirkan ide-ide kompleks. Lebih suka konsep daripada emosi."
          };

          hasilMBTI.textContent = `Hasil MBTI Anda: ${hasilMBTIString}`;
          deskripsiMBTI.textContent = deskripsi[hasilMBTIString] || "Deskripsi tidak ditemukan.";

          containerHasil.style.display = "block";
          containerPertanyaan.style.display = "none";
          tombolSelanjutnya.style.display = "none";
          document.getElementById('info-timer').style.display= "none";
          document.getElementById('info-sidebar').style.display= "none";
          document.getElementById('homeButton').style.display= "inline-block";
        }
      } else {
        alert("Pilih salah satu jawaban terlebih dahulu.");
      }
    });

    tampilkanPertanyaan(nomorPertanyaan);
  })
  .catch(error => console.error('Gagal memuat data JSON:', error));

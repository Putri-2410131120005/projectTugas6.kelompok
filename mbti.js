fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const values = {
      "Sangat Setuju": 5,
      "Setuju": 4,
      "Netral": 3,
      "Tidak Setuju": 2,
      "Sangat Tidak Setuju": 1
    };

    const scores = {
      "Extrovert": 0,
      "Introvert": 0,
      "Sensing": 0,
      "Intuition": 0,
      "Thinking": 0,
      "Feeling": 0,
      "Judging": 0,
      "Perceiving": 0
    };

    let currentQuestionIndex = 0;

    const questionsContainer = document.getElementById('questionContainer');
    const nextButton = document.getElementById('nextButton');
    const resultContainer = document.getElementById('resultContainer');
    const mbtiResult = document.getElementById('mbtiResult');
    const mbtiDescription = document.getElementById('mbtiDescription');

    function displayQuestion(index) {
      const question = data.Pernyataan[index];
      questionsContainer.innerHTML = ""; // Bersihkan kontainer

      const questionText = document.createElement('p');
      questionText.className = 'question-text';
      questionText.textContent = question.question;
      questionsContainer.appendChild(questionText);

      question.pilihan.forEach(option => {
        const button = document.createElement('button');
        
        // Jangan tampilkan teks
        // button.textContent = option;

        // Tambahkan class warna
        button.className = `option-button ${option.toLowerCase().replace(/\s+/g, "-")}`;

        // Tetap gunakan dataset untuk logika pemrosesan
        button.dataset.question = `question_${index}`;
        button.dataset.value = option;

        // Tambahkan tooltip untuk info saat hover
        button.title = option;

        // Event klik
        button.addEventListener('click', () => {
          document.querySelectorAll(`button[data-question="question_${index}"]`)
            .forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        });

        questionsContainer.appendChild(button);
      });
    }
    
    nextButton.addEventListener('click', function(event) {
      event.preventDefault();

      const selectedOption = document.querySelector(`button[data-question="question_${currentQuestionIndex}"].selected`);
      if (selectedOption) {
        const score = values[selectedOption.dataset.value];
        const question = data.Pernyataan[currentQuestionIndex];

        if (question.positive === "Extrovert") scores["Extrovert"] += score;
        if (question.negative === "Extrovert") scores["Introvert"] += score;

        if (question.positive === "Sensing") scores["Sensing"] += score;
        if (question.negative === "Sensing") scores["Intuition"] += score;

        if (question.positive === "Thinking") scores["Thinking"] += score;
        if (question.negative === "Thinking") scores["Feeling"] += score;

        if (question.positive === "Judging") scores["Judging"] += score;
        if (question.negative === "Judging") scores["Perceiving"] += score;

        currentQuestionIndex++;

        if (currentQuestionIndex < data.Pernyataan.length) {
          displayQuestion(currentQuestionIndex);
        } else {
          const result = {
            "E/I": scores["Extrovert"] > scores["Introvert"] ? "E" : "I",
            "S/N": scores["Sensing"] > scores["Intuition"] ? "S" : "N",
            "T/F": scores["Thinking"] > scores["Feeling"] ? "T" : "F",
            "J/P": scores["Judging"] > scores["Perceiving"] ? "J" : "P"
          };

          const homeButton = document.getElementById("homeButton");
          homeButton.addEventListener("click", () => {
            // Arahkan kembali ke halaman home, misalnya index.html
            window.location.href = "homepage.html";
          });
          const mbtiResultText = result["E/I"] + result["S/N"] + result["T/F"] + result["J/P"];
          const mbtiDescriptions = {
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

          mbtiResult.textContent = `Hasil MBTI Anda: ${mbtiResultText}`;
          mbtiDescription.textContent = mbtiDescriptions[mbtiResultText] || "Deskripsi tidak ditemukan.";
          
          resultContainer.style.display = "block";
          questionsContainer.style.display = "none";
          nextButton.style.display = "none";
          document.getElementById('info-sidebar').style.display = "none";
          document.getElementById('info-timer').style.display = "none";
          homeButton.style.display = "inline-block"; // <--- tampilkan tombol "Kembali ke Home"
          
          
        }
      } else {
        alert("Pilih salah satu jawaban terlebih dahulu.");
      }
      
    });

    displayQuestion(currentQuestionIndex);
  })
  .catch(error => console.error('Gagal memuat data JSON:', error));

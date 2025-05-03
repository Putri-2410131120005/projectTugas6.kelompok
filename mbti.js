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
            ISTJ: "ISTJ: Si Tanggung Jawab - Tipe yang disiplin, teratur, dan sangat bisa diandalkan...",
            ISFJ: "ISFJ: Si Penjaga - Setia, sabar, dan suka membantu...",
            INFJ: "INFJ: Si Visioner - Pendiam tapi punya idealisme kuat...",
            INTJ: "INTJ: Si Perencana Strategis - Cerdas, fokus, dan punya visi jangka panjang...",
            ESTJ: "ESTJ: Si Pemimpin Tangguh - Tegas, praktis, dan suka mengatur...",
            ESFJ: "ESFJ: Si Pengasuh - Hangat, perhatian, dan peduli pada kesejahteraan orang lain...",
            ENFJ: "ENFJ: Si Motivator - Karismatik, peduli, dan bisa menginspirasi banyak orang...",
            ENTJ: "ENTJ: Si Komandan - Penuh percaya diri, tegas, dan visioner...",
            ESTP: "ESTP: Si Petualang", 
            ESFP: "ESFP: Si Penghibur",
            ENFP: "ENFP: Si Inspirator",
            ENTP: "ENTP: Si Debater",
            ISTP: "ISTP: Si Pemecah Masalah",
            ISFP: "ISFP: Si Seniman",
            INFP: "INFP: Si Idealistis",
            INTP: "INTP: si Pemikir Logis"
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

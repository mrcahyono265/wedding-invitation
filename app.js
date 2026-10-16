const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyZe7oVYd9KKfFd5RgxxyQ220syM182cqSVgHOHKlQIP_uizJL79uNhvLkrnhB-LZNh/exec"; // Paste the Google Apps Script Web App URL here.
const eventStart = new Date("2026-10-23T16:00:00+07:00");

const opening = document.querySelector("#opening");
const soundToggle = document.querySelector("#sound-toggle");
let audioContext;
let musicTimer;

function updateCountdown() {
  const remaining = Math.max(0, eventStart - new Date());
  const units = [
    ["days", 86400000],
    ["hours", 3600000],
    ["minutes", 60000],
    ["seconds", 1000],
  ];
  let rest = remaining;
  units.forEach(([id, size]) => {
    const value = Math.floor(rest / size);
    rest %= size;
    document.querySelector(`#${id}`).textContent = String(value).padStart(
      2,
      "0",
    );
  });
}

function playNote(frequency, start, duration) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.045, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.1);
}

function startMusic() {
  if (!audioContext) audioContext = new AudioContext();
  audioContext.resume();
  const notes = [261.63, 329.63, 392, 523.25, 392, 329.63];
  let index = 0;
  const play = () => {
    playNote(notes[index++ % notes.length], audioContext.currentTime, 1.45);
  };
  play();
  musicTimer = setInterval(play, 1500);
  soundToggle.setAttribute("aria-pressed", "true");
  soundToggle.setAttribute("aria-label", "Matikan musik latar");
  document.querySelector("#sound-label").textContent = "Musik aktif";
}

function stopMusic() {
  clearInterval(musicTimer);
  soundToggle.setAttribute("aria-pressed", "false");
  soundToggle.setAttribute("aria-label", "Nyalakan musik latar");
  document.querySelector("#sound-label").textContent = "Musik";
}

document.querySelector("#open-invitation").addEventListener("click", () => {
  opening.classList.add("is-open");
  startMusic();
});

soundToggle.addEventListener("click", () =>
  soundToggle.getAttribute("aria-pressed") === "true"
    ? stopMusic()
    : startMusic(),
);

document.querySelectorAll('input[name="attendance"]').forEach((input) =>
  input.addEventListener("change", (event) => {
    document.querySelector("#guest-count").hidden =
      event.target.value !== "hadir";
  }),
);

document
  .querySelector("#rsvp-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector("#form-status");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (!RSVP_ENDPOINT) {
      status.textContent =
        "RSVP sedang disiapkan. Silakan hubungi mempelai untuk konfirmasi.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Mengirim…";
    try {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        body: new URLSearchParams(data),
        mode: "no-cors",
      });
      status.textContent =
        data.get("attendance") === "hadir"
          ? "Jazakumullahu khairan. Konfirmasi kehadiran Anda telah kami terima."
          : "Jazakumullahu khairan atas konfirmasinya. Semoga Allah membalas kebaikan Anda.";
      form.reset();
      document.querySelector("#guest-count").hidden = true;
    } catch {
      status.textContent =
        "Maaf, konfirmasi belum terkirim. Silakan coba kembali.";
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Kirim Konfirmasi <span aria-hidden="true">→</span>';
    }
  });

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach(
      (entry) => entry.isIntersecting && entry.target.classList.add("visible"),
    ),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));
updateCountdown();
setInterval(updateCountdown, 1000);

# Kannada Courtroom Simulator — updated version

## Run on a computer

1. Extract the whole folder. Keep `vendor/`, JavaScript and CSS beside `index.html`.
2. Open a terminal in this folder and run `python3 -m http.server 8000 --bind 127.0.0.1`.
3. Open http://localhost:8000 in a current Chrome or Edge browser.
4. Allow microphone access. Select an installed Kannada voice and speaking speed.
5. Edit/import the bank, choose up to 20 questions (or another number), select whether to randomize question order, and start.

No build, API key, account or app backend is required. The Excel library is bundled.

## On a phone

Upload the complete folder to an HTTPS static host you control, then open that HTTPS URL on your phone. Do not use an ordinary LAN HTTP address for microphone access. Chrome on Android is the preferred starting point. Browser recognition, recording formats and Kannada voices vary by device. Test your actual phone before relying on a trial. This package has not been deployed for you.

Install Kannada speech synthesis in your phone/computer's speech or accessibility settings if the voice selector is empty, then reload. The app deliberately only lists Kannada voices. If there is no Kannada voice, it displays the question and waits for **Begin answer**. A browser-native voice is used; studio-quality pronunciation is not guaranteed.

## Question bank

- Add, edit and delete in the Question bank section. Changes persist in local browser storage when permitted.
- TXT: UTF-8, one question per line. Blank lines and duplicate questions are removed on import.
- XLSX: first worksheet, first-row column header `Question` (also accepts `Questions` or `ಪ್ರಶ್ನೆ`). The export creates this format. Other columns are ignored.
- Select Append or Replace, choose the file, inspect the preview, then Apply import. Maximum 5 MB, 2,000 questions, 3,000 characters each.
- Export Excel or text at any time. Sample files are included.
- Before starting each trial, choose whether to randomize question order. Randomization is enabled by default; when disabled, questions follow their order in the bank. No repeats within a trial. If fewer than the requested count exist, all available questions are used. Random order can coincidentally match a previous trial.
- Editing the bank during a trial changes future trials only.

## Answer flow and safeguards

The microphone is off while the question is spoken. On successful playback completion the microphone starts. If playback is missing, errors or times out, read the question and tap Begin answer. Manual playback/retry saves existing text and audio segments.

The Web Audio analyser checks microphone energy every 100 ms. Three consecutive above-threshold samples mark speech activity. Only after that does continuous silence count toward the ten-second limit. Further speech resets the timer. The app never uses recognition end/error events as a reason to advance. Before detected speech, it waits indefinitely.

This is energy-based activity detection, not a semantic speech classifier. Loud background noise can start/reset the timer, and a very soft voice may not register. Use headphones and a quiet room; choose Soft voice or Noisy room sensitivity. The microphone meter helps check input. Pause/Begin answer resets the speech gate. A missing/denied/disconnected microphone or suspended audio context disables auto advance and provides a retry/manual path. A hidden page pauses the answer; returning requires Begin answer. Browsers can throttle background pages; keep the page visible.

Kannada recognition (`kn-IN`) uses the browser's SpeechRecognition implementation where available. Temporary results are shown; review all text. Recognition retries at most three times per answer segment, then falls back to typed text while recording and energy detection continue. Network/permission/language failures stop retries. Recognition may use the browser provider's remote service and require internet. Typing while recognition runs may be overwritten by a later recognition result: pause before manual transcript edits.

- **Save answer & next** saves text/audio and advances manually, including when no speech was detected.
- **Pause** stops microphone/recognition and keeps the question. **Begin answer** resumes in a new recording segment.
- **Read question again** pauses recording and replays before restarting listening.
- **Stop & review** saves the current answer and produces a partial report.

## Review, storage and privacy

Correct each transcript in Review & report. Export TXT/JSON or Print/save PDF. The summary includes saved question count, missing transcripts and automatic advances; it does not assess legal truth, contradictions or credibility. Empty transcripts are flagged for preparation/review.

Question banks, optional notes and the most recent finished/stopped text report are stored locally in this browser. Active trials are not recovery-saved. Browser clearing/private mode/storage limits can remove these records. Export what you need. Starting a new trial replaces the previous report after confirmation.

Audio stays in page memory and is split into segments when paused/retried. Play/download each segment before reload, closing, clearing or starting a new trial. TXT/JSON/PDF do not contain audio. Use the downloaded files for long-term audio retention. No app server receives your notes, reports or recordings, but browser recognition may transmit audio to its provider.

## Files and verification

- `index.html`, `style.css`, `app.js`: interface and device integration.
- `core.js`: shuffle and silence-gate logic.
- `vendor/xlsx.full.min.js`: SheetJS Community Edition 0.20.3, Apache-2.0. Source: https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js . See bundled license.
- `test.cjs`: run `node test.cjs` for timing, shuffle, deduplication and Kannada Excel round-trip checks.

Before real use, verify on the target device: wait silently for more than ten seconds before answering (must stay on the question); speak, pause briefly, speak again (timer must reset); stop speaking for ten seconds (must advance); deny the microphone (manual next must work); disable internet (recognition failure must not advance prematurely); pause/retry and play all recorded segments; import/export both sample files; finish and correct/export the report.

Automated checks verify the state logic and Excel round trip. Actual Kannada voice clarity, microphone permissions, recognition service behavior and mobile audio recording need the device checks above.

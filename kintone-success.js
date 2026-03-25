(function() {
  'use strict';
  // kintoneの画面が開いたときに動く魔法
  const STYLE_ID = 'kintone-rainbow-success-style';
  const MSG_ID = 'kintone-rainbow-success';

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @keyframes kintoneRainbowShift {
        0% { background-position: 0 0, 0% 50%; }
        50% { background-position: 0 0, 100% 50%; }
        100% { background-position: 0 0, 0% 50%; }
      }

      @keyframes kintoneTextShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes kintoneSheen {
        0% { transform: translateX(-65%) rotate(8deg); opacity: 0.0; }
        15% { opacity: 0.55; }
        35% { opacity: 0.25; }
        100% { transform: translateX(65%) rotate(8deg); opacity: 0.0; }
      }

      @keyframes kintoneGlowPulse {
        0%, 100% { filter: drop-shadow(0 0 12px rgba(124, 58, 237, 0.30)); }
        50% { filter: drop-shadow(0 0 22px rgba(255, 0, 110, 0.35)); }
      }

      .kintone-rainbow-success {
        position: relative;
        z-index: 0;
        padding: 18px 22px;
        margin: 10px 0;
        border-radius: 14px;
        border: 1px solid transparent;
        background:
          linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.05)) padding-box,
          linear-gradient(90deg, #ff006e, #ffbe0b, #fbff12, #00d4ff, #7c3aed, #ff006e) border-box;
        background-size: auto, 320% 320%;
        background-position: 0 0, 0% 50%;
        box-shadow:
          0 16px 42px rgba(124, 58, 237, 0.18),
          0 0 0 1px rgba(255, 255, 255, 0.12) inset;
        overflow: hidden;
        animation: kintoneRainbowShift 7s ease-in-out infinite, kintoneGlowPulse 3.5s ease-in-out infinite;
      }

      .kintone-rainbow-success::before {
        content: '';
        position: absolute;
        inset: -30% -20%;
        background: linear-gradient(
          120deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.65) 45%,
          rgba(255, 255, 255, 0) 70%
        );
        transform: translateX(-65%) rotate(8deg);
        pointer-events: none;
        animation: kintoneSheen 3.8s ease-in-out infinite;
      }

      .kintone-rainbow-success::after {
        content: '';
        position: absolute;
        inset: 0;
        background:
          repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.06) 0px,
            rgba(255, 255, 255, 0.06) 1px,
            rgba(0, 0, 0, 0) 3px,
            rgba(0, 0, 0, 0) 6px
          );
        opacity: 0.18;
        pointer-events: none;
        mix-blend-mode: overlay;
      }

      .kintone-rainbow-success__text {
        position: relative;
        z-index: 1;
        font-size: 24px;
        font-weight: 900;
        letter-spacing: 0.02em;
        text-align: center;
        line-height: 1.35;
        color: transparent;
        background: linear-gradient(
          90deg,
          #ffffff 0%,
          #ff006e 18%,
          #ffbe0b 38%,
          #fbff12 55%,
          #00d4ff 72%,
          #7c3aed 86%,
          #ffffff 100%
        );
        background-size: 300% 100%;
        background-position: 0% 50%;
        -webkit-background-clip: text;
        background-clip: text;
        animation: kintoneTextShift 6s ease infinite;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.15);
      }

      @media (prefers-reduced-motion: reduce) {
        .kintone-rainbow-success,
        .kintone-rainbow-success::before,
        .kintone-rainbow-success__text {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderMessage(header) {
    const old = document.getElementById(MSG_ID);
    if (old) old.remove();

    const msg = document.createElement('div');
    msg.id = MSG_ID;
    msg.className = 'kintone-rainbow-success';

    const text = document.createElement('div');
    text.className = 'kintone-rainbow-success__text';
    text.textContent = '🎉 中学生最強エンジニア、爆誕！環境構築成功おめでとう！';

    msg.appendChild(text);
    header.appendChild(msg);
  }

  kintone.events.on('app.record.index.show', function(event) {
    const header = kintone.app.getHeaderMenuSpaceElement();
    ensureStyle();
    renderMessage(header);
    return event;
  });
})();

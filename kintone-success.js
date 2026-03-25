(function() {
  'use strict';
  // kintoneの画面が開いたときに動く魔法
  kintone.events.on('app.record.index.show', function(event) {
    const header = kintone.app.getHeaderMenuSpaceElement();
    const msg = document.createElement('div');
    msg.style.cssText = 'padding: 20px; font-size: 24px; color: #ffffff; font-weight: bold; background-color: #4b0082; border-radius: 10px; text-align: center; margin: 10px;';
    msg.innerText = '🎉 中学生最強エンジニア、爆誕！環境構築成功おめでとう！';
    header.appendChild(msg);
    return event;
  });
})();

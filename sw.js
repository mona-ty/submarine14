// 変更前: notifyNow(title, body)
// 変更後:
function notifyNow(title, body, { sticky = false } = {}) {
  const options = {
    body,
    tag: sticky ? String(Date.now()) : 'ff14-submarine', // sticky時は統合しない
    renotify: !sticky,
    requireInteraction: sticky || document.hidden, // stickyなら手動で閉じるまで残る
    silent: false
  };
  // SW 経由は現行のまま
  if ('Notification' in window && Notification.permission === 'granted') {
    (swReady ? swReady.then(reg => reg.showNotification(title, options)) : Promise.resolve(new Notification(title, options)))
      .catch(() => new Notification(title, options));
  } else {
    alert(`${title}\n${body}`);
  }
  if (document.visibilityState === 'visible') { /* beep() は現状のままでOK */ }
}

// テストボタン側（今は notifyNow('テスト通知', ...); になっている箇所）
notifyNow('テスト通知', delay ? `${delay/1000}秒テスト完了` : '即時テスト完了', { sticky: true });

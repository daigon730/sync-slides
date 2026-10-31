// 同期クライアント：Apps Script の Webアプリと JSONP で通信する。
// （クロスドメインでも読み書きできるようにするための方式）
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cbName = "__sync_cb_" + Math.random().toString(36).slice(2);
    const script = document.createElement("script");
    const timer = setTimeout(() => { cleanup(); reject(new Error("timeout")); }, 8000);
    function cleanup() {
      clearTimeout(timer);
      delete window[cbName];
      script.remove();
    }
    window[cbName] = (data) => { cleanup(); resolve(data); };
    script.onerror = () => { cleanup(); reject(new Error("network")); };
    script.src = url + (url.includes("?") ? "&" : "?") + "callback=" + cbName;
    document.head.appendChild(script);
  });
}

function roomFromURL() {
  return new URLSearchParams(location.search).get("room") || "main";
}

const Sync = {
  configured() { return typeof SYNC_ENDPOINT === "string" && SYNC_ENDPOINT.startsWith("http"); },
  async getState(room) {
    const u = `${SYNC_ENDPOINT}?action=get&room=${encodeURIComponent(room)}`;
    return jsonp(u);
  },
  async setSlide(room, slide, key) {
    const u = `${SYNC_ENDPOINT}?action=set&room=${encodeURIComponent(room)}&slide=${slide}&key=${encodeURIComponent(key)}`;
    return jsonp(u);
  }
};

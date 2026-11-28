// GitHub Pages and Apps Script are different origins. This public web app
// authenticates writes with the presenter key and needs no Google cookies.
const Sync = {
  async request(params) {
    const endpoint = new URL(SYNC_ENDPOINT);
    endpoint.search = new URLSearchParams(params);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(endpoint, {
        credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
        signal: controller.signal
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      if (!(response.headers.get('content-type') || '').includes('application/json'))
        throw new Error('JSON以外の応答');
      return await response.json();
    } catch (error) {
      if (controller.signal.aborted) throw new Error('timeout');
      throw error;
    } finally {
      clearTimeout(timer);
    }
  },
  getState(room) { return this.request({action:'get',room}); },
  setSlide(room,slide,key) { return this.request({action:'set',room,slide,key}); }
};

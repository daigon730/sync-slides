// 11/25選択研修スライド（全面画像モードのテスト版）
const SLIDES = [
  {
    title: "新しいGemini、どこまで頼める？",
    imageFull: "slide-01.png",
    note: "表紙。開会。今日の進め方とゴールを宣言する。"
  },
  {
    title: "今日は「型」を1周します",
    imageFull: "slide-02.png",
    note: "0〜2分：開会と体験の約束（パスOK／評価しない／軽い話題だけ）。"
  },
  {
    title: "まず、使ってみます",
    imageFull: "slide-03.png",
    note: "2〜8分：チェックイン。その場でランダムに3〜4人のグループを組み、グループに1台がQRで試作アプリを開き1周遊ぶ（1人30秒）。"
  },
  {
    title: "Hydrogenは「作る」Geminiです",
    imageFull: "slide-04.png",
    note: "8〜10分：Hydrogenの説明。従来のGeminiとの対比で短く。"
  },
  {
    title: "約束は2つだけ",
    imageFull: "slide-05.png",
    note: "10〜12分：情報の約束（個人情報・生徒情報を入れない／学校のシステムにつなげない）と操作。手順は各自のペースで。"
  },
  {
    title: "書くのは5つだけ",
    imageFull: "slide-06.png",
    note: "12〜19分：具体化。ワークシートに5項目を自分の言葉で書く。"
  },
  {
    title: "5つをつなぐだけ",
    imageFull: "slide-07.png",
    note: "19〜22分：組み立てと試作。5項目を1つの指示文にしてGeminiに投げる。"
  },
  {
    title: "まず意図を見てから触る",
    imageFull: "slide-08.png",
    note: "26〜33分：確かめる。グループで試し合い、フィードバックは「良かった点1つ＋直す候補1つ」。生成待ち（22〜26分）は雑談。"
  },
  {
    title: "直すのは1点だけ",
    imageFull: "slide-09.png",
    note: "33〜38分：直す。一番直したい1点だけを選んで修正を投げる。38〜40分：直ったところだけ見せ合う。"
  },
  {
    title: "型のまとめ",
    imageFull: "slide-10.png",
    note: "40〜44分：型のまとめ。転用の例としてシミュレーション教材（本人の実例）を挙げる。"
  },
  {
    title: "エージェントは、任せられるAI",
    imageFull: "slide-11.png",
    note: "締め：AIエージェントとは。今日使ったHydrogenもこのタイプ。"
  },
  {
    title: "チャット型と、何が違う？",
    imageFull: "slide-12.png",
    note: "締め：チャット型AIとの違い。答えで終わるか、仕事が終わるまで回るか。"
  },
  {
    title: "Museは協力者の画面で",
    imageFull: "slide-13.png",
    note: "Muse紹介：近くの協力者のところへ集まり、普段の使い方の1場面を見せてもらう。"
  },
  {
    title: "ワークシートを持ち帰って、自分の題材で1回試してみてください",
    imageFull: "slide-14.png",
    note: "49〜50分：最後の一言。ワークシートを持ち帰って自分の題材で1回試す提案で閉会。"
  }
];

// スライド1枚分のHTMLを組み立てる（発表者・参加者の両方で使う）
function slideHTML(i) {
  const s = SLIDES[i];
  const total = SLIDES.length;
  if (s.imageFull) {
    return `
    <section class="slide full">
      <img src="images/${s.imageFull}" alt="">
      <div class="counter">${i + 1} / ${total}</div>
      <div class="progress"><span style="width:${((i + 1) / total) * 100}%"></span></div>
    </section>`;
  }
  const img = s.image
    ? `<div class="photo"><img src="images/${s.image}" alt=""></div>`
    : "";
  const lis = s.lines.map(t => `<li>${t}</li>`).join("");
  return `
    <section class="slide" style="--accent:${s.accent}">
      <div class="kicker">${s.kicker}</div>
      <h1>${s.title}</h1>
      <ul>${lis}</ul>
      ${img}
      <div class="counter">${i + 1} / ${total}</div>
      <div class="progress"><span style="width:${((i + 1) / total) * 100}%"></span></div>
    </section>`;
}

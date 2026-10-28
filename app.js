
// === 假資料與設定 ===
var LOGO = "https://i.imgur.com/3q1wB2Q.png"; // 測試用 Logo
var ACC = { "青": ["#38e8ff", "#8b7bff"], "紫": ["#b18bff", "#ff7bd5"] };
var DS = { a: "青", b: 24 };

var DEF = {
  users: [{ u: "admin", p: "admin123", n: "管理員", r: "admin", s: { a: "青", b: 24 } }],
  works: [{ id: 1, y: 2025, t: "校慶紀錄片", l: "#" }]
};

// === LocalStorage 模擬資料庫 ===
var db, me = null;
function loadDB() {
  var s = localStorage.getItem("qsmst_test");
  return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEF));
}
function saveDB() { localStorage.setItem("qsmst_test", JSON.stringify(db)); }
function loadAuth() {
  var s = localStorage.getItem("qsmst_test_user");
  if (s) me = JSON.parse(s);
}

// === 共用 UI 邏輯 ===
function theme() {
  var s = me && me.s ? me.s : DS, c = ACC[s.a] || ACC["青"], r = document.documentElement.style;
  r.setProperty("--ac", c[0]); r.setProperty("--ac2", c[1]); r.setProperty("--bl", s.b + "px");
}
function renderNavbar() {
  var linksEl = document.getElementById("links");
  if (!linksEl) return;
  if (me) {
    linksEl.innerHTML = '<span class="avw"><button class="av" onclick="alert('登出功能')">' + me.n.charAt(0) + '</button></span>';
  } else {
    linksEl.innerHTML = '<a href="index.html" class="on">主頁</a><a href="#">歷年作品</a><a href="#">拍攝申請</a><a href="#">登入</a>';
  }
}

document.addEventListener("DOMContentLoaded", function() {
  db = loadDB();
  loadAuth();
  theme();
  renderNavbar();
  document.querySelectorAll(".lg").forEach(i => i.src = LOGO);
});

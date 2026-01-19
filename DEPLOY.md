# BV Shop 商品圖層選擇器 - 部署指南

## 方法一：GitHub Pages（推薦，免費）

### 步驟 1：建立 GitHub 帳號
1. 前往 https://github.com
2. 點擊「Sign up」建立帳號（如果已有帳號可跳過）

### 步驟 2：建立新的 Repository
1. 登入 GitHub 後，點擊右上角的「+」→「New repository」
2. Repository name 填入：`product-layer-selector`（或其他名稱）
3. 選擇「Public」（免費版只能公開）
4. 點擊「Create repository」

### 步驟 3：上傳檔案
**方法 A：使用網頁上傳**
1. 在新建的 repository 頁面，點擊「uploading an existing file」
2. 將整個 `bv-shop-layer-selector` 資料夾內的所有檔案拖曳上傳
3. 點擊「Commit changes」

**方法 B：使用 Git 命令**
```bash
cd bv-shop-layer-selector
git init
git add .
git commit -m "初始化商品圖層選擇器"
git branch -M main
git remote add origin https://github.com/你的帳號/product-layer-selector.git
git push -u origin main
```

### 步驟 4：啟用 GitHub Pages
1. 進入 repository 的「Settings」頁面
2. 左側選單點擊「Pages」
3. Source 選擇「Deploy from a branch」
4. Branch 選擇「main」，資料夾選擇「/ (root)」
5. 點擊「Save」

### 步驟 5：取得網址
- 等待幾分鐘後，頁面會顯示你的網站網址
- 格式為：`https://你的帳號.github.io/product-layer-selector/`

---

## 方法二：Vercel（免費，部署更快）

### 步驟 1：建立 Vercel 帳號
1. 前往 https://vercel.com
2. 使用 GitHub 帳號登入（推薦）

### 步驟 2：部署
1. 點擊「Add New」→「Project」
2. 選擇「Import Git Repository」並選擇你的 repository
3. 直接點擊「Deploy」
4. 部署完成後會取得網址

---

## 方法三：Netlify（免費，有拖放功能）

### 步驟 1：建立 Netlify 帳號
1. 前往 https://netlify.com
2. 點擊「Sign up」建立帳號

### 步驟 2：拖放部署
1. 登入後，在主畫面找到「Drop」區域
2. 將整個 `bv-shop-layer-selector` 資料夾拖曳到該區域
3. 自動部署完成後會取得網址

---

## 嵌入 BV Shop 的方法

部署完成取得網址後，在 BV Shop 後台的商品描述區加入以下 HTML：

```html
<iframe
  src="https://你的網址/product-layer-selector/"
  width="100%"
  height="600"
  style="border:none; max-width:800px; display:block; margin:0 auto;"
  loading="lazy"
  title="商品規格選擇器">
</iframe>
```

### iframe 參數說明
| 參數 | 建議值 | 說明 |
|------|--------|------|
| width | 100% | 自適應寬度 |
| height | 600 | 高度（像素），可依實際內容調整 |
| style | border:none | 移除邊框 |
| loading | lazy | 延遲載入，提升頁面效能 |

### 注意事項
1. 確保網址使用 HTTPS（GitHub Pages/Vercel/Netlify 預設都是 HTTPS）
2. 如果 BV Shop 是 HTTPS，iframe 來源也必須是 HTTPS
3. 部分平台可能需要在 BV Shop 後台的「原始碼模式」中貼上 iframe 代碼

---

## 測試清單

部署完成後，請測試以下項目：

- [ ] 頁面可正常開啟
- [ ] 選擇規格時圖層正確疊加
- [ ] 手機版顯示正常
- [ ] 嵌入 BV Shop 後顯示正常
- [ ] 所有圖片都能正確載入

---

## 常見問題

### Q: 圖片沒有顯示？
A: 檢查以下項目：
1. 圖片是否已上傳到 images 資料夾
2. 檔名是否與 config.js 中的設定一致
3. 檔名是否有中文或空格

### Q: iframe 沒有顯示？
A: 檢查以下項目：
1. 網址是否正確
2. 是否使用 HTTPS
3. 是否在原始碼模式中貼上代碼

### Q: 圖層位置不對？
A: 確保所有圖片尺寸相同（建議 800x800 像素）

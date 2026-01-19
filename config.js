/**
 * BV Shop 商品圖層選擇器 - 設定檔
 *
 * 修改此檔案來設定你的規格選項
 * 圖片路徑相對於 index.html 的位置
 */

const CONFIG = {
  // 商品名稱（可選）
  productName: "CNC油箱蓋外圈組合",

  // 底圖設定
  baseImage: "images/base.svg",

  // 規格設定
  specs: {
    // 規格1
    spec1: {
      label: "車種",           // 規格名稱
      options: [
        { value: "yamaha", text: "YAMAHA", image: "images/spec1/yamaha.svg" },
        { value: "honda", text: "HONDA", image: "images/spec1/honda.svg" },
        { value: "suzuki", text: "SUZUKI", image: "images/spec1/suzuki.svg" },
        { value: "kawasaki", text: "KAWASAKI", image: "images/spec1/kawasaki.svg" },
      ]
    },

    // 規格2
    spec2: {
      label: "外圈顏色",       // 規格名稱
      options: [
        { value: "black", text: "黑色", image: "images/spec2/black.svg" },
        { value: "red", text: "紅色", image: "images/spec2/red.svg" },
        { value: "blue", text: "藍色", image: "images/spec2/blue.svg" },
        { value: "gold", text: "金色", image: "images/spec2/gold.svg" },
        { value: "silver", text: "銀色", image: "images/spec2/silver.svg" },
      ]
    },

    // 規格3
    spec3: {
      label: "油箱蓋顏色",     // 規格名稱
      options: [
        { value: "black", text: "黑色", image: "images/spec3/black.svg" },
        { value: "red", text: "紅色", image: "images/spec3/red.svg" },
        { value: "blue", text: "藍色", image: "images/spec3/blue.svg" },
        { value: "gold", text: "金色", image: "images/spec3/gold.svg" },
        { value: "titanium", text: "鈦色", image: "images/spec3/titanium.svg" },
      ]
    }
  },

  // BV Shop 購買連結設定（可選）
  // 如果要啟用「前往購買」按鈕，請設定以下內容
  buyLink: {
    enabled: false,                                    // 是否啟用購買按鈕
    baseUrl: "https://你的網站.com/item/商品ID",       // 商品頁面基礎 URL
    // 規格對應的 variant ID（需要從 BV Shop 後台取得）
    // 格式：'spec1Value-spec2Value-spec3Value': 'variantID'
    variants: {
      // 範例：
      // 'yamaha-black-black': 'variant123',
      // 'yamaha-black-red': 'variant124',
    }
  },

  // 顯示設定
  display: {
    showLoading: true,         // 是否顯示載入動畫
    showResultText: true,      // 是否顯示選擇結果文字
  }
};

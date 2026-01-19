/**
 * BV Shop 商品圖層選擇器 - 主程式
 */

(function() {
  'use strict';

  // DOM 元素
  const elements = {
    layerContainer: document.getElementById('layerContainer'),
    baseLayer: document.getElementById('baseLayer'),
    spec1Layer: document.getElementById('spec1Layer'),
    spec2Layer: document.getElementById('spec2Layer'),
    spec3Layer: document.getElementById('spec3Layer'),
    spec1Select: document.getElementById('spec1Select'),
    spec2Select: document.getElementById('spec2Select'),
    spec3Select: document.getElementById('spec3Select'),
    spec1Label: document.getElementById('spec1Label'),
    spec2Label: document.getElementById('spec2Label'),
    spec3Label: document.getElementById('spec3Label'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    selectionResult: document.getElementById('selectionResult'),
    buyButton: document.getElementById('buyButton'),
  };

  // 目前選擇狀態
  const currentSelection = {
    spec1: null,
    spec2: null,
    spec3: null,
  };

  /**
   * 初始化
   */
  function init() {
    // 設定標籤
    elements.spec1Label.textContent = CONFIG.specs.spec1.label;
    elements.spec2Label.textContent = CONFIG.specs.spec2.label;
    elements.spec3Label.textContent = CONFIG.specs.spec3.label;

    // 填充下拉選單
    populateSelect(elements.spec1Select, CONFIG.specs.spec1.options);
    populateSelect(elements.spec2Select, CONFIG.specs.spec2.options);
    populateSelect(elements.spec3Select, CONFIG.specs.spec3.options);

    // 綁定事件
    elements.spec1Select.addEventListener('change', handleSpec1Change);
    elements.spec2Select.addEventListener('change', handleSpec2Change);
    elements.spec3Select.addEventListener('change', handleSpec3Change);

    // 載入底圖
    loadBaseImage();

    // 更新結果顯示
    updateResultDisplay();
  }

  /**
   * 填充下拉選單
   */
  function populateSelect(selectElement, options) {
    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.text;
      selectElement.appendChild(optionEl);
    });
  }

  /**
   * 載入底圖
   */
  function loadBaseImage() {
    const baseImg = elements.baseLayer;
    baseImg.src = CONFIG.baseImage;

    baseImg.onerror = function() {
      elements.layerContainer.classList.add('no-base');
      console.warn('底圖載入失敗:', CONFIG.baseImage);
    };

    baseImg.onload = function() {
      elements.layerContainer.classList.remove('no-base');
    };
  }

  /**
   * 規格1 變更處理
   */
  function handleSpec1Change(e) {
    const value = e.target.value;
    currentSelection.spec1 = value || null;

    const option = CONFIG.specs.spec1.options.find(opt => opt.value === value);
    updateLayer(elements.spec1Layer, option);
    updateResultDisplay();
  }

  /**
   * 規格2 變更處理
   */
  function handleSpec2Change(e) {
    const value = e.target.value;
    currentSelection.spec2 = value || null;

    const option = CONFIG.specs.spec2.options.find(opt => opt.value === value);
    updateLayer(elements.spec2Layer, option);
    updateResultDisplay();
  }

  /**
   * 規格3 變更處理
   */
  function handleSpec3Change(e) {
    const value = e.target.value;
    currentSelection.spec3 = value || null;

    const option = CONFIG.specs.spec3.options.find(opt => opt.value === value);
    updateLayer(elements.spec3Layer, option);
    updateResultDisplay();
  }

  /**
   * 更新圖層
   */
  function updateLayer(layerElement, option) {
    if (!option || !option.image) {
      layerElement.classList.remove('active');
      layerElement.src = '';
      return;
    }

    // 顯示載入中
    if (CONFIG.display.showLoading) {
      showLoading();
    }

    // 預載圖片
    const img = new Image();
    img.onload = function() {
      layerElement.src = option.image;
      layerElement.classList.add('active');
      hideLoading();
    };

    img.onerror = function() {
      console.warn('圖層載入失敗:', option.image);
      layerElement.classList.remove('active');
      hideLoading();
    };

    img.src = option.image;
  }

  /**
   * 顯示載入中
   */
  function showLoading() {
    elements.loadingOverlay.classList.add('show');
  }

  /**
   * 隱藏載入中
   */
  function hideLoading() {
    elements.loadingOverlay.classList.remove('show');
  }

  /**
   * 更新結果顯示
   */
  function updateResultDisplay() {
    if (!CONFIG.display.showResultText) {
      elements.selectionResult.style.display = 'none';
      return;
    }

    const { spec1, spec2, spec3 } = currentSelection;
    const allSelected = spec1 && spec2 && spec3;

    let html = '';

    if (allSelected) {
      const spec1Text = CONFIG.specs.spec1.options.find(o => o.value === spec1)?.text;
      const spec2Text = CONFIG.specs.spec2.options.find(o => o.value === spec2)?.text;
      const spec3Text = CONFIG.specs.spec3.options.find(o => o.value === spec3)?.text;

      html = `
        <p class="result-text complete">✓ 已選擇完整規格組合</p>
        <ul class="result-specs">
          <li><strong>${CONFIG.specs.spec1.label}：</strong>${spec1Text}</li>
          <li><strong>${CONFIG.specs.spec2.label}：</strong>${spec2Text}</li>
          <li><strong>${CONFIG.specs.spec3.label}：</strong>${spec3Text}</li>
        </ul>
      `;

      // 更新購買按鈕
      updateBuyButton();
    } else {
      const missing = [];
      if (!spec1) missing.push(CONFIG.specs.spec1.label);
      if (!spec2) missing.push(CONFIG.specs.spec2.label);
      if (!spec3) missing.push(CONFIG.specs.spec3.label);

      html = `<p class="result-text">請選擇：${missing.join('、')}</p>`;

      // 隱藏購買按鈕
      elements.buyButton.style.display = 'none';
    }

    elements.selectionResult.innerHTML = html;
  }

  /**
   * 更新購買按鈕
   */
  function updateBuyButton() {
    if (!CONFIG.buyLink.enabled) {
      elements.buyButton.style.display = 'none';
      return;
    }

    const { spec1, spec2, spec3 } = currentSelection;
    const key = `${spec1}-${spec2}-${spec3}`;
    const variantId = CONFIG.buyLink.variants[key];

    if (variantId) {
      const url = `${CONFIG.buyLink.baseUrl}?variant=${variantId}`;
      elements.buyButton.href = url;
      elements.buyButton.style.display = 'block';
    } else {
      // 沒有對應的 variant，只連到商品頁
      elements.buyButton.href = CONFIG.buyLink.baseUrl;
      elements.buyButton.style.display = 'block';
    }
  }

  // 頁面載入後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

;(function () {
  'use strict'
  GM_addStyle(
    `
    .notify{
      margin-right:25px
      }
    /* 遮罩层样式 */
    .myOverlay{
      display:none
    }
        #overlay {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
          z-index:100000;
        }
  
        /* Tabs容器样式 */
        #tabsContainer {
          position: relative;
          width: 35vw;
          min-width: 400px;
          height: 400px;
          background-color: #fff;
          margin: 0 auto;
          padding: 20px;
        }
  
        /* Tabs切换按钮样式 */
        .tabButton {
          margin-right: 10px;
          padding: 10px 20px;
          background-color: #ddd;
          border-radius: 5px;
          cursor: pointer;
        }
  
        /* 关闭按钮样式 */
        .closeIcon {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
  
        /* Tabs内容样式 */
        .tabContent {
          display: none;
        }
  
        .tabContent.active {
          display: block;
        }
  
    `,
  )

  //#region 遮罩层
  const overlayDom = document.createElement('div')
  overlayDom.classList.add('myOverlay')
  overlayDom.innerHTML = `
    <div id="overlay">
    <div id="tabsContainer">
    <div>
      <button class="tabButton" id="tab1Button">星球设置</button>
      <button class="tabButton" id="tab2Button">全局设置</button>
    </div>
    <div class="tabContent active" id="tab1Content">
      <h2>星球设置</h2>
      <p>这是第一个Tab的内容。</p>
    </div>
    <div class="tabContent" id="tab2Content">
      <h2>全局设置</h2>
      <p>这是第二个Tab的内容。</p>
    </div>
    <div class="closeIcon">
      <svg
        t="1690015829778"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1376"
        width="24"
        height="24"
      >
        <path
          d="M509.866667 32C245.333333 32 32 247.466667 32 512s213.333333 480 477.866667 480S987.733333 776.533333 987.733333 512 774.4 32 509.866667 32z m0 896C281.6 928 96 742.4 96 512S281.6 96 509.866667 96 923.733333 281.6 923.733333 512s-185.6 416-413.866666 416z"
          fill="#8a8a8a"
          p-id="1377"
        ></path>
        <path
          d="M693.333333 330.666667c-12.8-12.8-32-12.8-44.8 0L512 467.2l-136.533333-136.533333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l136.533333 136.533333-136.533333 136.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l136.533333-136.533333 136.533334 136.533333c6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8L556.8 512l136.533333-136.533333c12.8-12.8 12.8-32 0-44.8z"
          fill="#8a8a8a"
          p-id="1378"
        ></path>
      </svg>
    </div>
  </div>
  </div>
    `
  document.body.appendChild(overlayDom)

  // 隐藏遮罩层
  const overlay = overlayDom.querySelector('#overlay')
  const closeDom = overlayDom.querySelector('.closeIcon')
  overlay.addEventListener('click', hideOverlay)
  closeDom.addEventListener('click', hideOverlay)
  function hideOverlay() {
    overlayDom.style.display = 'none'
  }
  //#endregion

  //#region tabs
  // 切换Tab
  let tabsContainer = overlayDom.querySelector('#tabsContainer')
  let tab1Button = overlayDom.querySelector('#tab1Button')
  let tab2Button = overlayDom.querySelector('#tab2Button')
  let tab1Content = overlayDom.querySelector('#tab1Content')
  let tab2Content = overlayDom.querySelector('#tab2Content')
  //   阻止冒泡
  tabsContainer.addEventListener('click', (event) => {
    event.stopPropagation()
  })
  tab1Button.addEventListener('click', switchTab)
  tab2Button.addEventListener('click', switchTab)
  function switchTab(event) {
    const title = event.target.innerText
    if (title === '星球设置') {
      tab1Button.classList.add('active')
      tab2Button.classList.remove('active')
      tab1Content.classList.add('active')
      tab2Content.classList.remove('active')
    } else if (title === '全局设置') {
      tab1Button.classList.remove('active')
      tab2Button.classList.add('active')
      tab1Content.classList.remove('active')
      tab2Content.classList.add('active')
    }
  }
  //#endregion

  //#region 设置icon
  // 创建设置icon图标
  const settingDom = document.createElement('div')
  settingDom.addEventListener('click', () => {
    overlayDom.style.display = 'block'
  })
  settingDom.style.cursor = 'pointer'
  settingDom.style.height = '37px'
  settingDom.innerHTML = `
    <svg t="1690013293428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2268" width="37" height="37">
    <path d="M439.264 208a16 16 0 0 0-16 16v67.968a239.744 239.744 0 0 0-46.496 26.896l-58.912-34a16 16 0 0 0-21.856 5.856l-80 138.56a16 16 0 0 0 5.856 21.856l58.896 34a242.624 242.624 0 0 0 0 53.728l-58.88 34a16 16 0 0 0-6.72 20.176l0.848 1.68 80 138.56a16 16 0 0 0 21.856 5.856l58.912-34a239.744 239.744 0 0 0 46.496 26.88V800a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-67.968a239.744 239.744 0 0 0 46.512-26.896l58.912 34a16 16 0 0 0 21.856-5.856l80-138.56a16 16 0 0 0-4.288-20.832l-1.568-1.024-58.896-34a242.624 242.624 0 0 0 0-53.728l58.88-34a16 16 0 0 0 6.72-20.176l-0.848-1.68-80-138.56a16 16 0 0 0-21.856-5.856l-58.912 34a239.744 239.744 0 0 0-46.496-26.88V224a16 16 0 0 0-16-16h-160z m32 48h96v67.376l28.8 12.576c13.152 5.76 25.632 12.976 37.184 21.52l25.28 18.688 58.448-33.728 48 83.136-58.368 33.68 3.472 31.2a194.624 194.624 0 0 1 0 43.104l-3.472 31.2 58.368 33.68-48 83.136-58.432-33.728-25.296 18.688c-11.552 8.544-24.032 15.76-37.184 21.52l-28.8 12.576V768h-96v-67.376l-28.784-12.576c-13.152-5.76-25.632-12.976-37.184-21.52l-25.28-18.688-58.448 33.728-48-83.136 58.368-33.68-3.472-31.2a194.624 194.624 0 0 1 0-43.104l3.472-31.2-58.368-33.68 48-83.136 58.432 33.728 25.296-18.688a191.744 191.744 0 0 1 37.184-21.52l28.8-12.576V256z m47.28 144a112 112 0 1 0 0 224 112 112 0 0 0 0-224z m0 48a64 64 0 1 1 0 128 64 64 0 0 1 0-128z" fill="#c5c6cb" p-id="2269">
    </path></svg>
    `

  // 等待icon容器加载结束添加
  waitForElm('.user-container').then((elm) => {
    creatSettingIcon(elm) //添加设置icon
  })

  // 创建设置icon
  function creatSettingIcon(element) {
    element.appendChild(settingDom)
  }
  //#endregion

  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector))
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector))
          observer.disconnect()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    })
  }
  const _historyWrap = function (type) {
    const orig = history[type]
    const e = new Event(type)
    return function () {
      const rv = orig.apply(this, arguments)
      e.arguments = arguments
      window.dispatchEvent(e)
      return rv
    }
  }
  history.pushState = _historyWrap('pushState')
  history.replaceState = _historyWrap('replaceState')
  window.addEventListener('pushState', function (e) {
    console.log('change pushState', location.href.split('/').at(-1))
  })
  window.addEventListener('replaceState', function (e) {
    console.log('change replaceState', location.href)
  })
})()

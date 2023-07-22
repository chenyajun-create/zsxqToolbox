;(function () {
  'use strict'
  GM_addStyle('.notify{margin-right:25px}')

  // 创建设置icon图标
  const settingDom = document.createElement('div')
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

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
        width: 45vw;
        min-width: 400px;
        height: 500px;
        background-color: #fff;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
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
        flex: 1;
        flex-direction: column;
        overflow-y: auto;
        margin-top:20px;
        margin-bottom:20px
      }

      .tabContent.active {
        display: flex;
      }
      /* table */
      thead {
        height: 30px;
      }
      th {
        width: 50px;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        width: 50px;
      }
      th {
        border-bottom: transparent;
        background-color: #f2f2f2;
      }
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      .tabStarBody {
        max-height: 300px;
        /* overflow-y: scroll; */
        position: relative;
      }
      .tabHead {
        position: sticky;
        top: 0;
        z-index: 10;
      }
      .Jackson-notification.success {
        box-shadow: rgba(22, 185, 152, 0.2) 0px 2px 8px;
        background: rgba(22, 185, 152, 0.9);
    }
      .Jackson-notification {
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        margin-top: 5px;
        min-height: 40px;
        color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 9999;
        padding: 10px 12px;
        border-radius: 4px;
    }
    .overlayMessage {
      z-index: 100000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2); /* 半透明黑色背景 */
      display: none;
      justify-content: center;
      align-items: center;
    }
    
    .message-box {
      width: 340px;
      background-color: #fff;
      border-radius: 5px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    
    .message-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .message-body {
      margin-bottom: 20px;
    }
    
    .message-actions {
      text-align: right;
      margin-top: 20px;
    }
    
    .confirm-button,.cancel-button  {
      margin-left: 10px;
      width: 45px;
      height: 25px;
    }
    .confirm-button:hover,.cancel-button:hover{
      cursor:pointer
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
  <div class="tabHead">
  <table border="0" cellpadding="0" cellspacing="0">
    <thead>
      <tr>
        <th style="width: 100px;">星球名字</th>
        <th>展示</th>
        <th>自动展开内容</th>
        <th>显示通知数字</th>
        <th>隐藏置顶</th>
        <th>隐藏作业</th>
      </tr>
    </thead>
  </table>
</div>
<div class="tabStarBody">
  <table border="0" cellpadding="0" cellspacing="0">
    <tbody>
    </tbody>
  </table>
</div>
  </div>
  <div class="tabContent" id="tab2Content">
  <div class="tabHead">
  <table border="0" cellpadding="0" cellspacing="0">
    <thead>
      <tr>
        <th>隐藏发表主题</th>
        <th>低分辨率下隐藏</th>
        <th>隐藏滚动条</th>
        <th>隐藏点赞过的主题</th>
      </tr>
    </thead>
  </table>
</div>
<div class="tabGloabalStarBody">
  <table border="0" cellpadding="0" cellspacing="0">
    <tbody>
    </tbody>
  </table>
</div>
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
  <div style="display: flex; justify-content: flex-end">
  <button class="tabButton" id="saveStar">保存</button>
  <button class="tabButton cancelOverlay">取消</button>
</div>
</div>
</div>
<div class="overlayMessage">
  <div class="message-box">
    <div class="message-content">
      <div class="message-title">提示</div>
      <div class="message-body"></div>
      <div class="message-actions">
        <button class="confirm-button"></button>
        <button class="cancel-button"></button>
      </div>
    </div>
  </div>
</div>
  `
  document.body.appendChild(overlayDom)

  // 隐藏遮罩层
  class OverlayStyle {
    // 显示弹出框
    showOverlayDom() {
      overlayDom.style.display = 'block'
      document.body.style.overflowY = 'hidden'
    }
    // 显示弹出框
    hiddenOverlayDom() {
      overlayDom.style.display = 'none'
      document.body.style.overflowY = 'scroll'
    }
  }
  const overlayState = new OverlayStyle()
  const overlay = overlayDom.querySelector('#overlay')
  const closeDom = overlayDom.querySelector('.closeIcon')
  const cancelDom = overlayDom.querySelector('.cancelOverlay')
  overlay.addEventListener('click', overlayState.hiddenOverlayDom)
  closeDom.addEventListener('click', overlayState.hiddenOverlayDom)
  cancelDom.addEventListener('click', overlayState.hiddenOverlayDom)
  //#endregion

  //#region 设置icon
  // 创建设置icon图标
  const settingDom = document.createElement('div')
  settingDom.addEventListener('click', overlayState.showOverlayDom)

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

  //#region tabs
  // 切换Tab
  let tabsContainer = overlayDom.querySelector('#tabsContainer')
  let tab1Button = overlayDom.querySelector('#tab1Button')
  let tab2Button = overlayDom.querySelector('#tab2Button')
  let tab1Content = overlayDom.querySelector('#tab1Content')
  let tab2Content = overlayDom.querySelector('#tab2Content')
  tabsContainer.addEventListener('click', (event) => {
    event.stopPropagation()
  })
  tab1Button.addEventListener('click', switchTab)
  tab2Button.addEventListener('click', switchTab)
  function switchTab(event) {
    const title = event.target.innerText
    if (title === '星球设置') {
      // console.log('title: ', title)
      tab1Button.classList.add('active')
      tab2Button.classList.remove('active')
      tab1Content.classList.add('active')
      tab2Content.classList.remove('active')
    } else if (title === '全局设置') {
      // console.log('title: ', title)
      tab1Button.classList.remove('active')
      tab2Button.classList.add('active')
      tab1Content.classList.remove('active')
      tab2Content.classList.add('active')
    }
  }
  //#endregion

  //#region 处理星球设置数据
  waitForElm('.group-list').then(() => {
    handleStarSettingData()
    handleGlobalSettingData()
  })
  const tbody = overlayDom.querySelector('.tabStarBody tbody')
  let saveStarInfo = [] //拿到每次最新数据信息

  function handleStarSettingData() {
    const startInfo = document.querySelectorAll('.group-list a')
    const localSaveStarData = JSON.parse(localStorage.getItem('saveStarInfo'))

    let tbodyContent = ''

    saveStarInfo = Array.from(startInfo).map((item) => {
      let starId = item.href.split('/').at(-1)
      let isExistSetting = {}

      // 本地存的有就用本地的，没有直接添加新的
      if (localSaveStarData?.length) {
        isExistSetting = localSaveStarData.find((element) => element.id === starId)
      }

      return {
        id: isExistSetting?.id ?? starId,
        name: isExistSetting?.name ?? item.firstChild.nodeValue,
        show: isExistSetting?.show ?? true,
        autoExpand: isExistSetting?.autoExpand ?? false,
        showInformNumber: isExistSetting?.showInformNumber ?? true,
        hideTop: isExistSetting?.hideTop ?? false,
        hideWork: isExistSetting?.hideWork ?? false,
      }
    })

    handleSettingState(startInfo)

    saveStarInfo.forEach((item) => {
      tbodyContent += `
      <tr>
      <td style="width: 100px;">${item.name}</td>
      <td><input type="checkbox" ${item.show && 'checked'} /></td>
      <td><input type="checkbox" ${item.autoExpand && 'checked'} /></td>
      <td><input type="checkbox" ${item.showInformNumber && 'checked'} /></td>
      <td><input type="checkbox" ${item.hideTop && 'checked'} /></td>
      <td><input type="checkbox" ${item.hideWork && 'checked'} /></td>
    </tr>
      `
    })
    // localStorage.setItem('saveStarInfo', JSON.stringify(saveStarInfo))
    tbody.innerHTML = tbodyContent
  }

  //#endregion

  //#region 处理星球全局设置
  const tabGloabalStarBody = overlayDom.querySelector('.tabGloabalStarBody tbody')
  let saveGlobalStarInfo = [] //拿到每次最新数据信息
  function handleGlobalSettingData() {
    const localGlobalStarData = JSON.parse(localStorage.getItem('saveGlobalStarInfo'))
    let isExistSetting = {}

    // 本地存的有就用本地的，没有直接添加新的
    for (let index = 0; index < 4; index++) {
      saveGlobalStarInfo.push({
        hidePublication: localGlobalStarData?.length ? localGlobalStarData[index].hidePublication : false, //隐藏发表主题框
        hideLowResolution: localGlobalStarData?.length ? localGlobalStarData[index].hideLowResolution : false, //隐藏低分辨
        hideScroller: localGlobalStarData?.length ? localGlobalStarData[index].hideScroller : false, //隐藏滚动条
        hideLikedTheme: localGlobalStarData?.length ? localGlobalStarData[index].hideLikedTheme : false, //隐藏喜欢过的主题
      })
    }
    let tbodyContent = ''
    saveGlobalStarInfo.forEach((item) => {
      tbodyContent += `
      <tr>
      <td><input type="checkbox" ${item.hidePublication && 'checked'} /></td>
      <td><input type="checkbox" ${item.hideLowResolution && 'checked'} /></td>
      <td><input type="checkbox" ${item.hideScroller && 'checked'} /></td>
      <td><input type="checkbox" ${item.hideLikedTheme && 'checked'} /></td>
    </tr>
      `
    })

    tabGloabalStarBody.innerHTML = tbodyContent
  }
  //#endregion
  //#region 保存功能
  const saveStarDom = overlayDom.querySelector('#saveStar')
  saveStarDom.addEventListener('click', showSaveTip)
  function showSaveTip() {
    showConfirm({
      message: '确认进行设置保存吗？',
    })
  }

  const confirmBtn = document.querySelector('.confirm-button') //保存确认按钮
  confirmBtn.addEventListener('click', confirmMessage) // 给确认按钮添加点击事件
  function confirmMessage() {
    confirmBox(() => {
      alertTip({
        message: '保存成功！',
        duration: 3000,
      })
      // 进行实时设置
      saveStarSetting()
      saveGlobalStarSetting()
    })
  }

  //保存星球设置
  function saveStarSetting() {
    let starInfo = []
    // console.log('tbody: ', Array.from(tbody.children))
    Array.from(tbody.children).forEach((item) => {
      const trChildren = Array.from(item.children)
      let checkedShow = trChildren[1].querySelector('input').checked //显示星球名字
      let checkedAutoExpand = trChildren[2].querySelector('input').checked //自动展开
      let checkedShowInformNumber = trChildren[3].querySelector('input').checked //显示星球通知数字
      let checkedHideTop = trChildren[4].querySelector('input').checked //隐藏置顶
      let checkedHideWork = trChildren[5].querySelector('input').checked //隐藏作业
      starInfo.push({
        show: checkedShow,
        showInformNumber: checkedShowInformNumber,
        autoExpand: checkedAutoExpand,
        hideTop: checkedHideTop,
        hideWork: checkedHideWork,
      })
    })

    // 进行设置
    saveStarInfo.forEach((item, index) => {
      item.show = starInfo[index].show
      item.showInformNumber = starInfo[index].showInformNumber
      item.autoExpand = starInfo[index].autoExpand
      item.hideTop = starInfo[index].hideTop
      item.hideWork = starInfo[index].hideWork
    })

    localStorage.removeItem('saveStarInfo')
    localStorage.setItem('saveStarInfo', JSON.stringify(saveStarInfo))

    handleSettingState() //进行实时设置
  }
  //保存全局星球设置
  function saveGlobalStarSetting() {
    let starInfo = []
    // console.log('tbody: ', Array.from(tbody.children))
    Array.from(tabGloabalStarBody.children).forEach((item) => {
      const trChildren = Array.from(item.children)
      let checkedHidePublication = trChildren[0].querySelector('input').checked //显示星球名字
      let checkedHideLowResolution = trChildren[1].querySelector('input').checked //自动展开
      let checkedHideScroller = trChildren[2].querySelector('input').checked //显示星球通知数字
      let checkedHideLikedTheme = trChildren[3].querySelector('input').checked //隐藏置顶
      starInfo.push({
        hidePublication: checkedHidePublication,
        hideLowResolution: checkedHideLowResolution,
        hideScroller: checkedHideScroller,
        hideLikedTheme: checkedHideLikedTheme,
      })
    })

    // 进行设置
    saveGlobalStarInfo.forEach((item, index) => {
      item.hidePublication = starInfo[index].hidePublication
      item.hideLowResolution = starInfo[index].hideLowResolution
      item.hideScroller = starInfo[index].hideScroller
      item.hideLikedTheme = starInfo[index].hideLikedTheme
    })

    localStorage.removeItem('saveGlobalStarInfo')
    localStorage.setItem('saveGlobalStarInfo', JSON.stringify(saveGlobalStarInfo))
  }
  function handleSettingState() {
    handleSideMenu() // 侧边栏
    handleStarMainPage() //主内容区
  }

  //保存成功提示
  function alertTip({ message, duration = 2000 }) {
    const divDom = document.createElement('div')
    divDom.classList.add('Jackson-notification')
    divDom.classList.add('success')
    divDom.innerText = message
    document.body.appendChild(divDom)
    setTimeout(() => {
      divDom.remove()
    }, duration)
  }

  // 保存-取消确认框
  const cancelBtn = document.querySelector('.cancel-button') //取消按钮
  const overlayMes = document.querySelector('.overlayMessage') //弹出窗
  const messageBox = document.querySelector('.message-box') //消息确认框
  messageBox.addEventListener('click', (event) => {
    event.stopPropagation()
  })
  overlayMes.addEventListener('click', hiddenConfirm)
  cancelBtn.addEventListener('click', hiddenConfirm)
  function showConfirm({ message, confirm = '确认', cancel = '取消' }) {
    document.querySelector('.message-body').innerText = message
    document.querySelector('.confirm-button').innerText = confirm
    document.querySelector('.cancel-button').innerText = cancel
    overlayMes.style.display = 'flex'
  }
  function hiddenConfirm() {
    overlayMes.style.display = 'none'
  }
  // 对确认弹窗封装
  function confirmBox(fn) {
    hiddenConfirm()
    overlayState.hiddenOverlayDom()
    fn()
  }
  //#endregion

  //#region 星球设置处理
  // 侧边栏
  function handleSideMenu() {
    const element = document.querySelectorAll('.group-list a')
    Array.from(element).forEach((item, index) => {
      // 控制元素显示隐藏
      item.style.display = saveStarInfo[index].show ? 'block' : 'none'
      // 控制是否显示数字
      let isShowNumber = item.querySelector('span')
      if (isShowNumber) {
        isShowNumber.style.display = saveStarInfo[index].showInformNumber ? 'block' : 'none'
      }
    })
  }

  // 页面设置
  let starId = ''
  function handleStarMainPage() {
    waitForElm('.main-content-container').then((ele) => {
      const localSaveStarData = JSON.parse(localStorage.getItem('saveStarInfo'))
      if (localSaveStarData?.length) {
        const starItem = localSaveStarData.find((item) => item.id === starId)

        // 设置自动展开
        const showAll = document.querySelectorAll('.showAll')
        if (starItem?.autoExpand) {
          showAll.forEach((item) => {
            item.click()
            item.remove()
          })
        }

        if (starItem) {
          // 设置隐藏置顶
          const hideEle = ele.querySelector('.sticky-topic-container')
          if (hideEle) {
            hideEle.style.display = Boolean(starItem.hideTop) ? 'none' : 'block'
          }
          // 隐藏作业
          waitForElm('.checkins-and-tasks').then((ele) => {
            ele.style.display = Boolean(starItem.hideWork) ? 'none' : 'flex'
          })
        }
      }
    })
  }

  const target = document.querySelector('.main-content-container')
  const observer = new MutationObserver(function (mutations) {
    starId = location.href.split('/').at(-1)
    handleSettingState()
  })

  if (target) {
    observer.observe(target, {
      childList: true,
    })
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
    // console.log('change pushState', location.href.split('/').at(-1))
  })
  window.addEventListener('replaceState', function (e) {
    // console.log('change replaceState', location.href)
  })
})()

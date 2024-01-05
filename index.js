var area = document.querySelectorAll('#con-nav1 a');  //区域
var version = document.querySelectorAll('#con-nav2 a');  //版本
var newest = document.querySelector('.new');   // 最新
var hottest = document.querySelector('.hot');  // 最热
var cancel1 = document.querySelector('.cancel1');  // 区域标签的取消按钮
var cancel2 = document.querySelector('.cancel2');  // 版本标签的取消按钮
var downBox1 = document.querySelector('.下拉框1');  // 下拉框1
var downBox2 = document.querySelector('.下拉框2');  // 下拉框2
var newhot = 0;  // 0: 最新 1: 最热
var areaNum = 0;  // 0: 全部 1: 内地 2: 港台 3: 欧美 4: 韩国 5: 日本
var versionNum = 0;  // 0: 全部 1: MV 2: 现场 3: 翻唱 4: 舞蹈 5: 影视 6: 综艺 7: 儿歌
var allmv = document.createElement('h2');
allmv.textContent = '全部MV';

//阻止a标签跳转；

document.querySelectorAll('a').forEach(
    function (e) {
        e.onclick = event=>event.preventDefault();
    }
);  

// 下拉框悬停事件；
downBox1.onmouseover = function () {
  document.querySelector('a.vip.开通vip').classList.add('hover');
}
downBox1.onmouseout = function () {
  document.querySelector('a.vip.开通vip').classList.remove('hover');
}
downBox2.onmouseover = function () {
  document.querySelector('a.充值.vip.开通vip').classList.add('hover');
}
downBox2.onmouseout = function () {
  document.querySelector('a.充值.vip.开通vip').classList.remove('hover');
}

//区域栏点击事件；

for(let i=0;i<area.length;i++) {       
  area[i].onclick = function (e) {
    e.preventDefault();
    area[areaNum].classList.remove('selected');
    area[i].classList.add('selected');
    areaNum = i;
    if(areaNum!=0) {       //若区域不为全部，分为改标签和加标签两种情况
      if(document.querySelector('div.con-status').firstElementChild.tagName=='H2') {      //移除h2
        document.querySelector('div.con-status').removeChild(document.querySelector('div.con-status').firstElementChild);
      }
      if(document.querySelector('div.con-status').firstElementChild.className=='tag1') {      //若标签存在，改标签
        document.querySelector('div.con-status').firstElementChild.replaceWith(createAreaElement(areaNum));
      } 
      else { //若标签不存在，加标签
        document.querySelector('div.con-status').insertBefore(createAreaElement(areaNum), document.querySelector('div.con-status').firstElementChild);
      }
    }
    else if(areaNum==0) {   //若区域为全部
      if(document.querySelector('div.con-status').firstElementChild.className=='tag1') {    //若区域标签存在
        document.querySelector('div.con-status').removeChild(document.querySelector('div.con-status').firstElementChild);  //移除区域标签
      }
    }
    if((areaNum==0)&&(versionNum==0)&&(document.querySelector('div.con-status').firstElementChild.tagName!='H2')){    //若区域和版本都为全部
      document.querySelector('div.con-status').insertBefore(allmv, document.querySelector('div.con-status').firstElementChild);  //插入全部MV
    }
    document.querySelector('ul.content').innerHTML = '';    //移除所有li
    if(newhot) {    //最热
      fetch('./data/hot.json')   //重新加载数据
      .then(response => response.json())
      .then(data=>{
        let filteredData = data.filter(item=>{
          if(areaNum==0){
            if(versionNum==0){
              return true;
            }else{
                return item.verison==versionNum;
            }
          }else{
            if(versionNum==0){
              return item.area==areaNum;
            }else{
              return (item.area==areaNum)&&(item.verison==versionNum);
            }
          }
        });   //筛选数据
        for(let i=0;i<filteredData.length;i++) {
          document.querySelector('ul.content').appendChild(createLi(filteredData[i].picurl, filteredData[i].title, filteredData[i].singers[0].name, filteredData[i].playcnt, filteredData[i].pubdate));
        }}
      )
    }else {    //最新
      fetch('./data/new.json')   //重新加载数据
      .then(response => response.json())
      .then(data=>{
        let filteredData = data.filter(item=>{
          if(areaNum==0){
            if(versionNum==0){
              return true;
            }else{
                return item.verison==versionNum;
            }
          }else{
            if(versionNum==0){
              return item.area==areaNum;
            }else{
              return (item.area==areaNum)&&(item.verison==versionNum);
            }
          }
        });   //筛选数据
        for(let i=0;i<filteredData.length;i++) {
          document.querySelector('ul.content').appendChild(createLi(filteredData[i].picurl, filteredData[i].title, filteredData[i].singers[0].name, filteredData[i].playcnt, filteredData[i].pubdate));
        }}
      )
    }
  }
}

//版本栏点击事件；

for(let i=0;i<version.length;i++) {    
  version[i].onclick = function (e) {
    e.preventDefault();
    version[versionNum].classList.remove('selected');
    version[i].classList.add('selected');
    versionNum = i;
    if(versionNum!=0) {   //若版本不为全部，分为改标签和加标签两种情况
      if(document.querySelector('div.con-status').firstElementChild.tagName=='H2') {    //移除h2
        document.querySelector('div.con-status').removeChild(document.querySelector('div.con-status').firstElementChild);
      }
      if(document.querySelector('div.con-status').firstElementChild.className=='tag2') {      //若第一个标签为版本标签，改标签
        document.querySelector('div.con-status').firstElementChild.replaceWith(createVersionElement(versionNum));
      }
      else {
        let secondElement = document.querySelector('div.con-status').firstElementChild.nextElementSibling;
        if((secondElement!=null)&&(secondElement.className=='tag2')) {    //若第二个标签为版本标签，改标签
          secondElement.replaceWith(createVersionElement(versionNum));
        }
        else { //若标签不存在，加标签
          document.querySelector('div.con-status').insertBefore(createVersionElement(versionNum), document.querySelector('div.con-status ul'));
        }
      }
    }
    else if (versionNum==0) {  //若版本为全部
      if(document.querySelector('div.con-status').firstElementChild.className=='tag2') {    //若第一个标签为版本标签
        document.querySelector('div.con-status').removeChild(document.querySelector('div.con-status').firstElementChild); //移除版本标签
      }
      else if(document.querySelector('div.con-status').firstElementChild.nextElementSibling.className=='tag2') { //若第二个标签为版本标签
        document.querySelector('div.con-status').removeChild(document.querySelector('div.con-status').firstElementChild.nextElementSibling); //移除版本标签
      }
    }
    if((areaNum==0)&&(versionNum==0)&&(document.querySelector('div.con-status').firstElementChild.tagName!='H2')){   //若区域和版本都为全部
      document.querySelector('div.con-status').insertBefore(allmv, document.querySelector('div.con-status').firstElementChild);  //插入全部MV
    }
    document.querySelector('ul.content').innerHTML = '';    //移除所有li
    if(newhot) {    //最热
      fetch('./data/hot.json')   //重新加载数据
      .then(response => response.json())
      .then(data=>{
        let filteredData = data.filter(item=>{
          if(areaNum==0){
            if(versionNum==0){
              return true;
            }else{
                return item.verison==versionNum;
            }
          }else{
            if(versionNum==0){
              return item.area==areaNum;
            }else{
              return (item.area==areaNum)&&(item.verison==versionNum);
            }
          }
        });   //筛选数据
        for(let i=0;i<filteredData.length;i++) {
          document.querySelector('ul.content').appendChild(createLi(filteredData[i].picurl, filteredData[i].title, filteredData[i].singers[0].name, filteredData[i].playcnt, filteredData[i].pubdate));
        }}
      )
    }else {    //最新
      fetch('./data/new.json')   //重新加载数据
      .then(response => response.json())
      .then(data=>{
        let filteredData = data.filter(item=>{
          if(areaNum==0){
            if(versionNum==0){
              return true;
            }else{
                return item.verison==versionNum;
            }
          }else{
            if(versionNum==0){
              return item.area==areaNum;
            }else{
              return (item.area==areaNum)&&(item.verison==versionNum);
            }
          }
        });   //筛选数据
        for(let i=0;i<filteredData.length;i++) {
          document.querySelector('ul.content').appendChild(createLi(filteredData[i].picurl, filteredData[i].title, filteredData[i].singers[0].name, filteredData[i].playcnt, filteredData[i].pubdate));
        }}
      )
    }
  }
}

//第一次加载时/每次刷新页面时加载最新数据；

document.querySelector('ul.content').innerHTML = '';    //移除所有li
fetch('./data/new.json')  //加载数据
.then(response => response.json())
.then(data=>{for(let i=0;i<data.length;i++) {
    document.querySelector('ul.content').appendChild(createLi(data[i].picurl, data[i].title, data[i].singers[0].name, data[i].playcnt, data[i].pubdate));
}})

//最新点击事件；

newest.onclick = function (e) {
  e.preventDefault();
  if(newhot) {
    newest.classList.add('selected');
    hottest.classList.remove('selected');
    newhot = 0;
    document.querySelector('ul.content').innerHTML = '';    //移除所有li
    fetch('./data/new.json')   //重新加载数据
    .then(response => response.json())
    .then(data=>{
      let filteredData = data.filter(item=>{
        if(areaNum==0){
          if(versionNum==0){
            return true;
          }else{
              return item.verison==versionNum;
          }
        }else{
          if(versionNum==0){
            return item.area==areaNum;
          }else{
            return (item.area==areaNum)&&(item.verison==versionNum);
          }
        }
      });   //筛选数据
      for(let i=0;i<filteredData.length;i++) {
        document.querySelector('ul.content').appendChild(createLi(filteredData[i].picurl, filteredData[i].title, filteredData[i].singers[0].name, filteredData[i].playcnt, filteredData[i].pubdate));
      }}
    )
  }
}

//最热点击事件；

hottest.onclick = function (e) {     
  e.preventDefault();
  if(!newhot) {
    newest.classList.remove('selected');
    hottest.classList.add('selected');
    newhot = 1;
    document.querySelector('ul.content').innerHTML = '';    //移除所有li
    fetch('./data/hot.json')   //重新加载数据
    .then(response => response.json())
    .then(data=>{
      let filteredData = data.filter(item=>{
        if(areaNum==0){
          if(versionNum==0){
            return true;
          }else{
              return item.verison==versionNum;
          }
        }else{
          if(versionNum==0){
            return item.area==areaNum;
          }else{
            return (item.area==areaNum)&&(item.verison==versionNum);
          }
        }
      });   //筛选数据
      for(let i=0;i<filteredData.length;i++) {
        document.querySelector('ul.content').appendChild(createLi(filteredData[i].picurl, filteredData[i].title, filteredData[i].singers[0].name, filteredData[i].playcnt, filteredData[i].pubdate));
      }}
    )
  }
}

//创建li标签用于加载数据；

function createLi(picUrl, title, singer, playcnt, pubdate) {
  let newLi = document.createElement('li');
  newLi.className = 'mvLi';
  let newDiv = document.createElement('div');
  newDiv.className = 'liBox';
  newLi.appendChild(newDiv);
  let newPic = document.createElement('a');
  newPic.className = 'pic';
  newPic.href = 'javascript:;';     //打开空白页
  newPic.target = '_blank';         //在新标签页打开
  let newPicture = document.createElement('img');
  newPicture.src = picUrl;
  newPicture.className = 'cover';
  newPicture.style.width = '100%';
  newPicture.style.height = '100%';
  newPic.appendChild(newPicture);
  let newPlayIcon = document.createElement('img');
  newPlayIcon.className = 'overlay';
  newPlayIcon.src = './data/play_icon.png';
  newPic.appendChild(newPlayIcon);
  let newH3 = document.createElement('a');
  newH3.className = 'title';
  newH3.href = 'javascript:;';
  newH3.target = '_blank';
  newH3.textContent = title;
  let newP = document.createElement('a');
  newP.className = 'singer';
  newP.href = 'javascript:;';
  newP.target = '_blank';
  newP.textContent = singer;
  newP.style.height = '24px';
  let newSpan = document.createElement('span');
  newSpan.style.display = 'flex';
  newSpan.style.height = '20px';
  newDiv.appendChild(newPic);
  newDiv.appendChild(newH3);
  newDiv.appendChild(newP);
  newDiv.appendChild(newSpan);
  let newImg = document.createElement('img');
  newImg.src = './data/listen_icon.png';
  let textPlaycnt = document.createTextNode(formatPlaycnt(playcnt));
  let textContent = document.createTextNode('\u00A0\u00A0');
  let textPubdate = document.createTextNode(parseDate(pubdate));
  newSpan.appendChild(newImg);
  newSpan.appendChild(textPlaycnt);
  newSpan.appendChild(textContent);
  newSpan.appendChild(textPubdate);
  return newLi;
}

//将json中的日期数字转换为日期字符串；

function parseDate(num){
    // 将日期数字串转换为JavaScript时间戳（以毫秒为单位）
    let timestamp = num * 1000;

    // 使用Date对象将时间戳转换为日期字符串
    let date = new Date(timestamp);

    let year = date.getFullYear(); // 获取年份
    let month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份（月份从0开始，需要加1）
    let day = String(date.getDate()).padStart(2, '0'); // 获取日期

    // 构建日期字符串
    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

//创建区域标签；

function createAreaElement(areaNum) {
  if(areaNum) {
    let areaElement = document.createElement('span');
    areaElement.className = 'tag1';
    areaElement.textContent = area[areaNum].textContent;
    let cancel = document.createElement('a');
    cancel.className = 'cancel1';
    cancel.textContent = '×';
    cancel.href = '';
    cancel.onclick = area[0].onclick;
    areaElement.appendChild(cancel);
    return areaElement;
  }
  return null;
}

//创建版本标签；

function createVersionElement(versionNum) {
  if(versionNum) {
    let versionElement = document.createElement('span');
    versionElement.className = 'tag2';
    versionElement.textContent = version[versionNum].textContent;
    let cancel = document.createElement('a');
    cancel.className = 'cancel2';
    cancel.textContent = '×';
    cancel.href = '';
    cancel.onclick = version[0].onclick;
    versionElement.appendChild(cancel);
    return versionElement;
  }
  return null;
}

// 格式化播放量；
function formatPlaycnt(playcnt) {
  if(playcnt>10000) {
    return (playcnt/10000).toFixed(1) + '万';
  }
  return playcnt;
}
const createElement = (tag, kls, text) => {
  const $elem = document.createElement(tag);
  if (kls) $elem.className = kls;
  if (text) $elem.innerHTML = text;
  return $elem;
};

// 图片查看相关控制样式
// LESS
/*
.z-img-viewer {
  position: fixed;
  top: 0; bottom: 0; right: 0; left: 0;
  overflow: hidden;
  background-color: rgba(0,0,0,.3);
  z-index: 9999999;
  img {
    position: absolute; cursor: move;
  }
}
.z-img-closer {
  position: absolute;
  right: 0; top: 0;
  font-size: 12px;
  cursor: pointer;
  padding: 10px;
  background-color: #fff; color: #e51d49;
}
*/

export default {
  bind: (el, binding, vnode, oldVnode) => {
    // 浏览器如果不支持 addEventListener 则退出该指令
    if (!el.addEventListener) {
      return false;
    }
    // 只处理 img 标签
    if (!el.tagName.toUpperCase === 'IMG') {
      return false;
    }
    el.style.cursor = 'pointer';
    const pos = {};
    const $viewer = createElement('div', 'z-img-viewer');
    const $closer = createElement('div', 'z-img-closer', '关闭(双击图片亦可关闭)');
    const $img = createElement('img');
    $viewer.appendChild($img);
    $viewer.appendChild($closer);

    $closer.addEventListener('click', () => {
      document.body.removeChild($viewer);
    });
    $img.addEventListener('dblclick', () => {
      document.body.removeChild($viewer);
    });
    $img.addEventListener('mousedown', e => {
      e.preventDefault();
      pos.top = parseInt($img.style.top, 10);
      pos.left = parseInt($img.style.left, 10);
      pos.initX = e.clientX;
      pos.initY = e.clientY;
      pos.e = true;
    });
    $img.addEventListener('mousemove', e => {
      e.preventDefault();
      if (pos.e) {
        pos.curX = e.clientX;
        pos.curY = e.clientY;
        $img.style.top = (pos.top + pos.curY - pos.initY) + 'px';
        $img.style.left = (pos.left + pos.curX - pos.initX) + 'px';
      }
    });
    $img.addEventListener('mouseup', e => {
      e.preventDefault();
      pos.e = false;
    });

    el.addEventListener('click', () => {
      const src = el.getAttribute('src');
      if (src) {
        $img.src = src;
        $img.style.top = '40px';
        $img.style.left = '30px';
        document.body.appendChild($viewer);
      }
    });
  }
}

import CryptoJS from 'crypto-js';


//设置秘钥和秘钥偏移量
const SECRET_KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const SECRET_IV = CryptoJS.enc.Utf8.parse("1234567890123456");
/**
 * 加密方法
 * @param word
 * @returns {string}
 */

function encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, SECRET_KEY, {
      iv: SECRET_IV ,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

// 判断用户是否在线
import { useStore  } from 'vuex';
import $ from 'jquery'

function judge_online() {
  const store = useStore();
  let suc = false;
  if (store.state.user.is_login) {
    $.ajax({
      url: "http://47.105.178.110:8000/user/judge_online",
      type: "get",
      // 关闭异步，防止返回前执行后续代码
      async: false,
      headers: {
        'Authorization': 'Bearer ' + store.state.user.access,
      },
      success(resp) {
          if (resp.result === 'success') 
            suc = true;
      },
      error(resp) {
          console.log('失败', resp);
      }
    });
  }
  if (suc)
      return true;
  store.commit('logout');
  return false;
}

export { encrypt, judge_online};


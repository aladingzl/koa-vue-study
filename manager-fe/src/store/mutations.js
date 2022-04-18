/** */
import storage from "../utils/storage";

export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.setItem('userInfo', userInfo);
    // console.log(userInfo);
  },
  saveUserMenu(state, menuLIst) {
    state.menuLIst = menuLIst;
    storage.setItem('menuLIst', menuLIst);
    // console.log(userInfo);
  },
  saveUserAction(state, actionList) {
    state.actionList = actionList;
    storage.setItem('actionList', actionList);
    // console.log(userInfo);
  }
}
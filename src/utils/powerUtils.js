/*
 * @Author: your name
 * @Date: 2021-08-23 16:12:45
 * @LastEditTime: 2021-11-18 11:34:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jw-crm\src\utils\powerUtils.js
 */
class powerUtils {
  constructor() {
    this.ROLE_ADMIN = "ROLE_ADMIN"; // 超级管理员

    this.SALE_MANAGER = "SALE_MANAGER"; // 销售主管
    this.SALE_NUMBER = "SALE_NUMBER"; // 销售组员

    this.FINANCE_DEL = "FINANCE_DEL"; // 财务主管
    this.FINANCE = "FINANCE"; // 财务组员

    this.MG_MANAGER = "MG_MANAGER"; // 美工主管
    this.MG_NUMBER = "MG_NUMBER"; // 美工组员

    this.YY_MANAGER = "YY_MANAGER"; // 运营主管
    this.YY_NUMBER = "YY_NUMBER"; // 运营组员

    this.XQ_MANAGER = "XQ_MANAGER"; // 续签主管
    this.XQ_NUMBER = "XQ_NUMBER"; // 续签组员

    this.PDD_MANAGER = "PDD_MANAGER"; // 拼多多主管
    this.PDD_NUMBER = "PDD_NUMBER"; // 拼多多组员

    this.ZL_MANAGER = "ZL_MANAGER"; // 助理主管
    this.ZL_NUMBER = "ZL_NUMBER"; // 助理组员

    this.YY_TWO_MANAGER = "YY_TWO_MANAGER"; // 运营二部主管
    this.YY_TWO_NUMBER = "YY_TWO_NUMBER"; // 运营二部组员

    this.PD_MANAGER = "PD_MANAGER"; // 派单主管
    this.PD_NUMBER = "PD_NUMBER"; // 派单组员
  }
  /**
   * 管理员
   * @param roleName
   * @return
   */
  isSuperManager(roleName) {
    if (roleName) {
      if (
        roleName.includes(this.ROLE_ADMIN) ||
        roleName.includes(this.FINANCE_DEL) ||
        roleName.includes(this.FINANCE)
      ) {
        return true;
      }
    }
    return false;
  }
  /**
   * 主管
   * @param roleName
   * @return
   */
  isZhuGuan(roleName) {
    if (roleName) {
      if (roleName.indexOf("MANAGER") > 0) {
        return true;
      }
    }
    return false;
  }
  /**
   * 组员
   * @param roleName
   * @return
   */
  isZhuYuan(roleName) {
    if (roleName) {
      if (roleName.indexOf("NUMBER") > 0) {
        return true;
      }
    }
    return false;
  }
  /**
   * 运营二部主管
   * @param roleName
   * @return
   */
  isYyTwoZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.YY_TWO_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 运营二部组员
   * @param roleName
   * @return
   */
  isYyTwoZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.YY_TWO_NUMBER)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 美工主管
   * @param roleName
   * @return
   */
  isMgZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.MG_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 美工组员
   * @param roleName
   * @return
   */
  isMgZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.MG_NUMBER)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 销售主管
   * @param roleName
   * @return
   */
  isSaleZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.SALE_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 销售组员
   * @param roleName
   * @return
   */
  isSaleZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.SALE_NUMBER)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 运营主管
   * @param roleName
   * @return
   */
  isYyZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.YY_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 运营组员
   * @param roleName
   * @return
   */
  isYyZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.YY_NUMBER)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 续签主管
   * @param roleName
   * @return
   */
  isXqZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.XQ_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 续签组员
   * @param roleName
   * @return
   */
  isXqZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.XQ_NUMBER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 是否是续签
   * @param roleName
   * @return
   */
  isXQ(roleName) {
    if (roleName) {
      if (roleName.includes("XQ")) {
        return true;
      }
    }
    return false;
  }
  /**
   * 是否是美工
   * @param roleName
   * @return
   */
  isMG(roleName) {
    if (roleName) {
      if (roleName.includes("MG")) {
        return true;
      }
    }
    return false;
  }
  /**
   * 是否是运营
   * @param roleName
   * @return
   */
  isYY(roleName) {
    if (roleName) {
      if (roleName.includes("YY")) {
        return true;
      }
    }
    return false;
  }
  /**
   * 是否是财务
   * @param roleName
   * @return
   */
  isCW(roleName) {
    if (roleName) {
      if (roleName.includes("FINANCE")) {
        return true;
      }
    }
    return false;
  }

  /**
   * 拼多多主管
   * @param roleName
   * @return
   */
  isPddZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.PDD_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 拼多多组员
   * @param roleName
   * @return
   */
  isPddZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.PDD_NUMBER)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 助理主管
   * @param roleName
   * @return
   */
  isZlZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.ZL_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 助理组员
   * @param roleName
   * @return
   */
  isZlZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.ZL_NUMBER)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 派单主管
   * @param roleName
   * @return
   */
  isPdZhuGuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.PD_MANAGER)) {
        return true;
      }
    }
    return false;
  }
  /**
   * 派单组员
   * @param roleName
   * @return
   */
  isPdZhuYuan(roleName) {
    if (roleName) {
      if (roleName.includes(this.PD_NUMBER)) {
        return true;
      }
    }
    return false;
  }
}

export default new powerUtils();

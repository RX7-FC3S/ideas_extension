/**
 * 暂停执行指定的毫秒数
 * @param {number} ms - 要暂停的毫秒数
 * @returns {Promise} - 返回一个 Promise，用于等待
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 将 Date 对象格式化为自定义格式的日期时间字符串
 * @param {Date} date - 要格式化的日期对象
 * @param {string} format - 日期时间的格式字符串
 * @returns {string} - 格式化后的日期时间字符串
 */
function formatDate(date, format) {
  const map = {
    yyyy: date.getFullYear(), // 年
    MM: String(date.getMonth() + 1).padStart(2, "0"), // 月（补零）
    dd: String(date.getDate()).padStart(2, "0"), // 日（补零）
    hh: String(date.getHours()).padStart(2, "0"), // 小时（补零）
    mm: String(date.getMinutes()).padStart(2, "0"), // 分钟（补零）
    ss: String(date.getSeconds()).padStart(2, "0"), // 秒（补零）
  };

  return format.replace(/yyyy|MM|dd|hh|mm|ss/g, (matched) => map[matched]);
}

/**
 * 获取当前时间并返回格式化后的日期时间字符串
 * @param {string} format - 日期时间的格式字符串
 * @returns {string} - 格式化后的当前日期时间字符串
 */
function getCurrentDate(format) {
  const date = new Date();
  return formatDate(date, format);
}

/**
 * 获取指定天数后的日期对象并返回格式化后的日期时间字符串
 * @param {number} days - 要增加的天数
 * @param {string} format - 日期时间的格式字符串s
 * @returns {string} - 格式化后的日期时间字符串
 */
function getFutureDate(days, format) {
  const today = new Date(); // 获取当前日期
  const futureDate = new Date(today); // 创建当前日期的副本
  futureDate.setDate(today.getDate() + days); // 设置为当前日期加指定天数
  return formatDate(futureDate, format);
}

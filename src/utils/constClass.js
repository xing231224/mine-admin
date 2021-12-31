var config = require('../../config')
// const constList={
//   URL: process.env.NODE_ENV === 'production'
//     ? 'http://dev.jixuejiyong.com:31101'
//     : 'http://192.168.2.245:31101'
// }
const UPLOAD_URL=process.env.NODE_ENV === 'production'
  ? 'http://dev.jixuejiyong.com:31101'
  : 'http://192.168.3.232:9310'
//ws
const WS_URL=process.env.NODE_ENV === 'production'
  ? 'http://192.168.3.239:30001'
  : 'http://192.168.3.239:30001'
export default{
  UPLOAD_URL,WS_URL
}

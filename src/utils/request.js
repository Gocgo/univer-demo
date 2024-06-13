/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import {notification, message, Modal} from 'antd';
// import { clearUserInfo, loginSWX } from '@/utils/authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // changeOrigin: 'true',
  // credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use(async (url, options) => {
  // 此处为拦截器，每次发送请求之前判断能否取到token
  // if (localStorage.getItem('userToken')) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     // 'Cache-Control': 'no-cache',
  //     // 'Pragma': 'no-cache',
  //     'front-proxy': 'http://172.16.3.111:8000',
  //     // 'token': `${localStorage.getItem('userToken')}`,
  //   };
  //   return {
  //     url,
  //     options: { ...options, headers },
  //   };
  // }
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return {
    url,
    options: { ...options, headers },
  };
});

request.interceptors.response.use(async (response, options) => {
  // 此处为拦截器，对返回的请求进行拦截
  let result;
  const data = await response.clone().json(); // 真正返回前台的数据
  //执纪审查系统接口返回
  if (data.code === 200) {
    return data
  }
  if (data.code.indexOf('E') === 0) {
    message.error(data.msg);
  }
  if (data.code === '01') {
    // notification.error({
    //   message: '回话超时',
    //   description: '自动跳转登录页面',
    // });
    // clearUserInfo(); // 清除storage中session，并跳转到登录页面

    // setTimeout(() => {
    //   clearUserInfo();//清除storage中session，并跳转到登录页面
    // }, 3000);
    return data;
  }
  if (data.code === '510') {
    // 后台服务异常报错
    notification.error({
      message: '处理异常',
      // description: data.code +",错误码："+ data.txId +","+ data.msg,
      description: data.msg,
    });
    return data;
  } else if (data.code === '10') {
    // 后台服务轻量级错误
    let { msg } = data;
    if (msg?.length > 50) {
      msg = `${msg.substring(0, 50)}...`;
    }
    message.error({content: msg, duration: 2});
    return data;
  } else if (data.code === '20') {
    // 后台服务轻量级错误 改为modal弹窗
    let {msg} = data;
    Modal.error({
      title: '错误!',
      content: (<div>{msg}</div>),
    });
    return data;
  }else if (data.code === '02') {
    // message.info('回话超时,发送建立回话请求');
    // loginSWX(); // 进入页面，报错后跳转到随沃行验证界面
    return data;
  } else if (data.code === '88') {
    message.error({ content: data.msg, duration: 2 });
    return data;
  } else {
    result = response;
  }
  console.log(('result:',result));
  return result;
});
export default request;

'use strict';
const openapi = require('mp-cloud-openapi')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
    const template_id = "ESv0jHRX1lySdRR2RK5UOtxs2rx1lvWR2spvJh2k488"
    const openapiWeixin = openapi.initWeixin({
      appId: 'wx1f1890e1654805ca',
      secret: 'e9a5a329b1cafbb588f88e3085afb94f'
    })
    const {
      accessToken,
      expiresIn
    } = await openapiWeixin.auth.getAccessToken()
	const resp = await openapiWeixin.subscribeMessage.send({
        accessToken,
        touser: event.openid,
        template_id,
        page: `pages/msg/detail?_id=${event.docId}`,
        miniprogram_state: "formal",
        data: {
            "thing2": {
                "value": event.title
            },
            "time3": {
                "value": event.time
            },
            "phrase8": {
                "value": "系统通知"
            }
        }
    })
	//返回数据给客户端
	return resp
};

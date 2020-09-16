'use strict';

const Controller = require('egg').Controller;

class LogController extends Controller {

    // 获得自定义事件打点
    async getLogList() {
        const { ctx } = this;
        const query = ctx.request.query;
        const { appId, beginTime, endTime, logType} = query;
        let pageNo = query.pageNo || 1;
        let pageSize = query.pageSize || this.app.config.pageSize;

        if (!appId) throw new Error('页面性能列表：appId不能为空');

        const result = await ctx.service.web.log.getLogList(logType, appId, beginTime, endTime, pageNo, pageSize);

        ctx.body = this.app.result({
            data: result,
        });
    }
}

module.exports = LogController;

 9  - 0
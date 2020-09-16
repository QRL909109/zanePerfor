"use strict";

const Service = require("egg").Service;

class LogService extends Service {
  // 获得自定义事件打点
  async getLogList(
    logType,
    appId,
    beginTime,
    endTime,
    pageNo,
    pageSize
  ) {
    pageNo = pageNo * 1;
    pageSize = pageSize * 1;

    // 查询参数拼接
    const queryjson = {
      $match: {
        create_time: { $gte: new Date(beginTime), $lte: new Date(endTime) },
      },
    };

    if (logType) queryjson.$match.log_type = logType;

    const count = Promise.resolve(
      this.app.models.WebLogs(appId).count(queryjson.$match).read("sp").exec()
    );
    const datas = Promise.resolve(
      this.app.models
        .WebLogs(appId)
        .aggregate([
          queryjson,
          { $sort: { create_time: -1 } },
          { $skip: (pageNo - 1) * pageSize },
          { $limit: pageSize },
        ])
        .read("sp")
        .exec()
    );
    const all = await Promise.all([count, datas]);
    const [totalNum, datalist] = all;

    return {
      datalist,
      totalNum,
      pageNo,
    };
  }
}

module.exports = LogService;
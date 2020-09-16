'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const Mixed = Schema.Types.Mixed;
    const conn = app.mongooseDB.get('db3');

    const WebLogSchema = new Schema({
      app_id: { type: String }, // 所属系统
      url: { type: String }, // url域名
      create_time: { type: Date, default: Date.now }, // 用户访问时间
      user_id: { type: String, default: '' }, // 用户标志用户id
      log_type: { type: String }, // 打点类型 click event
      log_data: { type: Mixed }, // 埋点信息对象
    });

    WebLogSchema.index({ log_type: 1, app_id: 1, create_time: 1 });
    WebLogSchema.index({ user_id: 1, log_type: 1, app_id: 1, create_time: 1 });

    app.models.WebLogs = function(appId) {
      return conn.model(`web_logs_${appId}`, WebLogSchema);
  };
};
const ActivityLog = require("../models/ActivityLog");

const logActivity = async (
  userId,
  userType,
  action,
  details,
  req,
  metadata = {}
) => {
  try {
    const logEntry = new ActivityLog({
      userId,
      userType,
      action,
      details,
      ipAddress: req ? req.ip : null,
      userAgent: req ? req.get("User-Agent") : null,
      metadata,
    });

    await logEntry.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

const activityLogger = (action, detailsGenerator) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    const originalJson = res.json;

    // Override response methods to log after response
    res.send = function (data) {
      logAfterResponse(data);
      return originalSend.call(this, data);
    };

    res.json = function (data) {
      logAfterResponse(data);
      return originalJson.call(this, data);
    };

    const logAfterResponse = async (responseData) => {
      try {
        const userId = req.user ? req.user._id : null;
        const userType = req.user ? "user" : req.admin ? "admin" : "system";

        const details =
          typeof detailsGenerator === "function"
            ? detailsGenerator(req, res, responseData)
            : detailsGenerator;

        await logActivity(userId, userType, action, details, req, {
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
        });
      } catch (error) {
        console.error("Error in activity logger:", error);
      }
    };

    next();
  };
};

module.exports = { logActivity, activityLogger };

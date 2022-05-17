//Custom succesful response a client
function sendResponse(data = "") {
  let res = {
    success: true,
  };

  if (data) res.data = data;

  return res;
}

//Custom error response a client
function sendError(errorMsg = "") {
  let res = {
    success: false,
  };

  if (errorMsg.length > 0) res.msg = errorMsg;
  else
    res.msg =
      "something wrong in back stage, contact a specialized technician, thank you";

  return res;
}

module.exports = {
  sendResponse,
  sendError,
};

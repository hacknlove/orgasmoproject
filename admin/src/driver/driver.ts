import _oadminーplayーroundーdeleteーileーPOST from "./_oadmin/playGround/deleteFile/POST.export";
import _oadminーplayーroundーexpandーPOST from "./_oadmin/playGround/expand/POST.export";
import _oadminーplayーroundーgetーileーPOST from "./_oadmin/playGround/getFile/POST.export";
import _oadminーplayーroundーsaveーileーPOST from "./_oadmin/playGround/saveFile/POST.export";

const driver = {
  ["_oadmin.playGround.deleteFile.POST"]:
    _oadminーplayーroundーdeleteーileーPOST,
  ["_oadmin.playGround.expand.POST"]: _oadminーplayーroundーexpandーPOST,
  ["_oadmin.playGround.getFile.POST"]: _oadminーplayーroundーgetーileーPOST,
  ["_oadmin.playGround.saveFile.POST"]: _oadminーplayーroundーsaveーileーPOST,
};

driver["_oadmin"] = {};
driver["_oadmin"]["playGround"] = {};
driver["_oadmin"]["playGround"]["deleteFile"] = {};
driver["_oadmin"]["playGround"]["deleteFile"]["POST"] =
  _oadminーplayーroundーdeleteーileーPOST;
driver["_oadmin"]["playGround"]["expand"] = {};
driver["_oadmin"]["playGround"]["expand"]["POST"] =
  _oadminーplayーroundーexpandーPOST;
driver["_oadmin"]["playGround"]["getFile"] = {};
driver["_oadmin"]["playGround"]["getFile"]["POST"] =
  _oadminーplayーroundーgetーileーPOST;
driver["_oadmin"]["playGround"]["saveFile"] = {};
driver["_oadmin"]["playGround"]["saveFile"]["POST"] =
  _oadminーplayーroundーsaveーileーPOST;

export default driver;

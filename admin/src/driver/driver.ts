
import _oadminーpageーDELETE from "./_oadmin/page/DELETE.export";
import _oadminーpageーexpandーPOST from "./_oadmin/page/expand/POST.export";
import _oadminーpageーPOST from "./_oadmin/page/POST.export";
import _oadminーstoryーDELETE from "./_oadmin/story/DELETE.export";
import _oadminーstoryーPOST from "./_oadmin/story/POST.export";



const driver = {
  ["_oadmin.page.DELETE"]: _oadminーpageーDELETE,
  ["_oadmin.page.expand.POST"]: _oadminーpageーexpandーPOST,
  ["_oadmin.page.POST"]: _oadminーpageーPOST,
  ["_oadmin.story.DELETE"]: _oadminーstoryーDELETE,
  ["_oadmin.story.POST"]: _oadminーstoryーPOST,
}

driver["_oadmin"] = {};
driver["_oadmin"]["page"] = {};
driver["_oadmin"]["page"]["DELETE"] = _oadminーpageーDELETE;
driver["_oadmin"]["page"]["expand"] = {};
driver["_oadmin"]["page"]["expand"]["POST"] = _oadminーpageーexpandーPOST;
driver["_oadmin"]["page"]["POST"] = _oadminーpageーPOST;
driver["_oadmin"]["story"] = {};
driver["_oadmin"]["story"]["DELETE"] = _oadminーstoryーDELETE;
driver["_oadmin"]["story"]["POST"] = _oadminーstoryーPOST;

export default driver;

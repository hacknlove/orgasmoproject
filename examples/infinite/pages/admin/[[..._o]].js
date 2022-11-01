import Components from "../../Components";
import driver from "../../driver";
import PageFactory from "@orgasmo/orgasmo/PageFactory";

import AdminFactory from "@orgasmo/admin/AdminFactory";
import adminSSPsFactory from "@orgasmo/admin/adminSSPsFactory";

const Page = PageFactory({ Components });

export default AdminFactory({ Components, Page });

export const getServerSideProps = adminSSPsFactory({ driver });

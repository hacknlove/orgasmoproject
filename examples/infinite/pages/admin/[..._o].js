import DComponent, { Components } from "../../DComponent";
import driver from "../../driver";
import PageFactory from "@orgasmo/orgasmo/PageFactory";

import AdminFactory from "@orgasmo/admin/AdminFactory";
import adminSSPsFactory from "@orgasmo/admin/adminSSPsFactory";

const Page = PageFactory({ DComponent });

export default AdminFactory({ Components, DComponent, Page });

export const getServerSideProps = adminSSPsFactory({ driver });

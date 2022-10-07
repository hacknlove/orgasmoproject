import DComponent, { Components } from "../../DComponent";
import driver from "../../driver";
import PageFactory from "@orgasmo/orgasmo/PageFactory";

import AdminFactory from "@orgasmo/admin/AdminFactory";
import adminServerSidePropsFactory from "@orgasmo/admin/adminServerSidePropsFactory";

const Page = PageFactory({ DComponent });

export default AdminFactory({ Components, DComponent, Page });

export const getServerSideProps = adminServerSidePropsFactory({ driver });

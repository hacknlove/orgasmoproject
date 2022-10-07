import DComponent from "../DComponent";
import driver from "../driver";

import PageFactory from "@orgasmo/orgasmo/PageFactory";
import getServerSidePropsFactory from "@orgasmo/orgasmo/getServerSidePropsFactory";

export default PageFactory({ DComponent });

export const getServerSideProps = getServerSidePropsFactory({ driver });

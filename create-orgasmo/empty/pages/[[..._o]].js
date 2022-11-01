import Components from "../Components";
import driver from "../driver";

import PageFactory from "@orgasmo/orgasmo/PageFactory";
import getServerSidePropsFactory from "@orgasmo/orgasmo/getServerSidePropsFactory";

export default PageFactory({ Components });

export const getServerSideProps = getServerSidePropsFactory({
  driver,
  Components,
});

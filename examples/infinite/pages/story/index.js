import DComponent, { Components } from "../../DComponent";
import driver from "../../driver";
import PageFactory from "@orgasmo/orgasmo/PageFactory";

import storySSPsFactory from "@orgasmo/admin/storySSPsFactory";

export default PageFactory({ DComponent });

export const getServerSideProps = storySSPsFactory({ driver, Components });

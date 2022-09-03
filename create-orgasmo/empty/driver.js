/* This file is created automatically at build time, there is no need to commit it */
// @ts-nocheck

import events from 'orgasmo/events';
import pageーgetMoreRows from './drivers/mocked/page/getMoreRows.export.js';
import pageーgetPage from './drivers/mocked/page/getPage.export.js';
import pageーgetPageFromId from './drivers/mocked/page/getPageFromId.export.js';


const all = {
  ['page.getMoreRows']: pageーgetMoreRows,
  ['page.getPage']: pageーgetPage,
  ['page.getPageFromId']: pageーgetPageFromId,
}

all.page = {};
all.page.getMoreRows = pageーgetMoreRows;
all.page.getPage = pageーgetPage;
all.page.getPageFromId = pageーgetPageFromId;


export default all;

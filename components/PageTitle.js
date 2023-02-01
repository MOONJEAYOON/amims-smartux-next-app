import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';

const PageTitle = () => {
    const router = useRouter();
    let pageTitle;
    console.log(router);
    if (router.pathname == "/") {
        pageTitle = "홈"
    } else if (router.pathname.indexOf('/Banner') != -1) {
        pageTitle = "배너 리스트"
    } else {
        pageTitle = router.pathname
    }

    return (
        <>
            {pageTitle}
        </>
    );
}

export default PageTitle;
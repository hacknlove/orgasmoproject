import Link from "next/link";
import MaterialSymbolsSettingsRounded from "../../icons/MaterialSymbolsSettingsRounded";
import { useRouter } from "next/router";

export default function GlobalSettingsItem () {
    const router = useRouter()

    const selected = !router.query.component && !router.query.path 

    return (
        <Link href="/playground">
            <a id="MainLayout_nav_home_o" className={selected ? 'MainLayout_nav_active_o' : ''}>
            <MaterialSymbolsSettingsRounded className="MainLayout_nav_svg"/> <span>Global settings</span>
            </a>
        </Link>
    )
}
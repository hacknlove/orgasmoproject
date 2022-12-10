import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export default function middlewareFactory({ middlewares }: {
    middlewares: any;
}): ((req: NextRequest) => Promise<NextResponse>) | undefined;
export declare const config: {
    matcher: string[];
};

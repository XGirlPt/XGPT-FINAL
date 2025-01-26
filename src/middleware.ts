import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
	// Middleware simplificado para permitir acesso a todas as rotas
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/escort/:path*"],
};

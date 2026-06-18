import { NextResponse } from "next/server"

export const GET = () => NextResponse.json({ min: 1, max: 100 })

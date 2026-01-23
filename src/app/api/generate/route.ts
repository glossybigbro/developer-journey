import { NextRequest, NextResponse } from 'next/server'
import { getUserProductiveTime } from '@/entities/profile/api/profile-api'
import { generateMarkdown } from '@/entities/profile/lib/markdown/generator'
import { createDefaultConfig } from '@/entities/profile/config/defaults'

/**
 * API Route: Generate Profile README
 * 
 * @description
 * Generates a fresh README.md with the latest data for a given username.
 * Used by GitHub Actions for automatic updates.
 * 
 * @route GET /api/generate?username={username}
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const username = searchParams.get('username')

        if (!username) {
            return NextResponse.json(
                { error: 'Username parameter is required' },
                { status: 400 }
            )
        }

        // Fetch latest productive time data
        const productiveTimeStats = await getUserProductiveTime(username)

        // TODO: Get user's saved configuration from database/storage
        // For now, using default configuration via Factory pattern (SSOT)
        const config = createDefaultConfig(username)

        // Hydrate with real data
        if (config.productiveTime) {
            config.productiveTime.stats = productiveTimeStats
            config.productiveTime.isAnalyzed = true
        }

        // Generate markdown
        const markdown = generateMarkdown(config)

        // Return as plain text
        return new NextResponse(markdown, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        })

    } catch (error) {
        console.error('Error generating README:', error)
        return NextResponse.json(
            { error: 'Failed to generate README' },
            { status: 500 }
        )
    }
}

import { prisma } from '../../src/lib/prisma'

async function main() {
    const profiles = await prisma.profile.findMany()
    for (const profile of profiles) {
        await prisma.resume.create({
            data: {
                userId: profile.userId,
                resumeText: profile.resumeText,
                resumeUrl: profile.resumeUrl
            }
        })
    }
}

main()
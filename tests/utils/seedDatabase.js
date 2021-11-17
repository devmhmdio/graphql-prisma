import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: "Khadija",
        email: 'khadija@test.com',
        password: bcrypt.hashSync('Mhmd@66426633')
    },
    user: undefined,
    jwt: undefined
}

const seedDatabase = async () => {
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)
    await prisma.mutation.createPost({
        data: {
            title: 'Published post from jest',
            body: '...................',
            published: true,
            author: {
                connect: {
                    id: testUser.id
                }
            }
        }
    })

    await prisma.mutation.createPost({
        data: {
            title: 'My draft post from jest',
            body: '...................',
            published: false,
            author: {
                connect: {
                    id: testUser.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne }
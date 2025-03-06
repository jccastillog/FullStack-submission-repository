const { test, describe, expect, beforeEach } = require('@playwright/test')

const { loginWith,createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()

        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) =>{
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
        
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        
        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
    
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright', true)
            await expect(page.getByText('a blog created by playwright')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            const lastBlog = page.getByText('a blog created by playwright').last()  
            await expect(lastBlog).toBeVisible()  

            const viewButton = page.getByRole('button', { name: 'View' }).last()
            await viewButton.click()

            const likeButton = page.getByRole('button', { name: 'Like' })
            await likeButton.click()
        
            await expect(page.getByText('Likes: 1')).toBeVisible()  
        })

        test('a blog can be deleted by his creator', async ({ page }) => {
            const lastBlog = page.getByText('a blog created by playwright').last()  
            await expect(lastBlog).toBeVisible()  

            const viewButton = page.getByRole('button', { name: 'View' }).last()
            await viewButton.click()

            const deleteButton = page.getByRole('button', { name: 'Delete' })

            page.on('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')  
                expect(dialog.message()).toBe('¿Estás seguro de que quieres eliminar este blog?')  
                await dialog.accept()  
            })

            await deleteButton.click()       

            await expect(page.getByText('a blog created by playwright')).not.toBeVisible()
        }) 

        test('a blog can not be deleted by another creator', async ({ page }) => {
            const lastBlog = page.getByText('Prueba de Título 2').last()  
            await expect(lastBlog).toBeVisible()  

            const viewButton = page.getByRole('button', { name: 'View' }).first()
            await viewButton.click()

            const deleteButton = page.getByRole('button', { name: 'Delete' })
            await expect(deleteButton).not.toBeVisible()
        }) 

        test('blogs are shown in order by likes descendent', async ({ page }) => {
            const lastBlog = page.getByText('Prueba de Título 2').last()  
            await expect(lastBlog).toBeVisible() 

            const blogs = await page.locator('.blog').all()
        
            let likesArray = []
        
            for (const blog of blogs) {
                const viewButton = blog.locator('button', { hasText: 'View' })  
                await viewButton.click()  
                
                const likeText = await blog.locator('[data-testid="blog-likes"]').textContent()
                const match = likeText.match(/\d+/)  
                const likes = match ? parseInt(match[0], 10) : 0
        
                likesArray.push(likes)
            }
        
            const sortedLikes = [...likesArray].sort((a, b) => b - a)
            expect(likesArray).toEqual(sortedLikes)
        })


    })

})
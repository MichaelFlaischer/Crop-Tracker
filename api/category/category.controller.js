import { categoryService } from './category.service.js'

export async function getCategories(req, res) {
  try {
    const categories = await categoryService.query()
    res.json(categories)
  } catch (err) {
    console.error('Cannot get categories', err)
    res.status(500).send('Failed to get categories')
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await categoryService.getById(req.params.id)
    res.json(category)
  } catch (err) {
    console.error('Cannot get category', err)
    res.status(500).send('Failed to get category')
  }
}

export async function addCategory(req, res) {
  try {
    const category = req.body
    const savedCategory = await categoryService.add(category)
    res.json(savedCategory)
  } catch (err) {
    console.error('Cannot add category', err)
    res.status(500).send('Failed to add category')
  }
}

export async function updateCategory(req, res) {
  try {
    const category = req.body
    const updatedCategory = await categoryService.update(req.params.id, category)
    res.json(updatedCategory)
  } catch (err) {
    console.error('Cannot update category', err)
    res.status(500).send('Failed to update category')
  }
}

export async function deleteCategory(req, res) {
  try {
    await categoryService.remove(req.params.id)
    res.send({ msg: 'Category deleted' })
  } catch (err) {
    console.error('Cannot delete category', err)
    res.status(500).send('Failed to delete category')
  }
}

import Category from 'src/models/Category';
import CategoryDTO from 'src/api/v1/dto/CategoryDTO';
import {Router, Request, Response} from 'express';

const router: Router = Router();

function loadCategories() {
  return Category.all()
    .then(categories => {
      const legacyCategories = categories.map((category: Category) => {
        const legacyCategory = new CategoryDTO(category.id, category.name);
        legacyCategory.color = category.color;
        return legacyCategory;
      });
      return legacyCategories;
    })
    .then(categories => {
      return categories.sort((category: CategoryDTO, anotherCategory: CategoryDTO) =>
        category.name.localeCompare(anotherCategory.name),
      );
    });
}

router.get('/', (request: Request, response: Response) => {
  loadCategories().then((categories: CategoryDTO[]) => {
    return response.json(categories);
  });
});

export const CategoryController: Router = router;

import Bluebird = require('bluebird');
import Category from 'src/models/Category';
import CategoryDTO from 'src/legacy/dto/CategoryDTO';

export function getLegacyCategories(): Bluebird<CategoryDTO[]> {
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

export function getCategories(): Bluebird<any> {
  return Category.all()
    .then((categories: Category[]) => {
      return categories.sort((category, anotherCategory) =>
        category.name.localeCompare(anotherCategory.name),
      );
    });
}

import Category from './Category';

export default interface Board {
    id: number;
    title: string;
    categories: Array<Category>;
}

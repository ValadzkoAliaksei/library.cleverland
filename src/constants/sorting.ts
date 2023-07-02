export type Sorting = {
    title: string;
    direction: string;
    description: string;
    value: string;
};

export const SORTING: Sorting[] = [
    {
        title: 'По рейтингу',
        direction: 'asc',
        description: 'По возрастанию рейтинга',
        value: 'rating',
    },
    {
        title: 'По рейтингу',
        direction: 'desc',
        description: 'По снижению рейтинга',
        value: 'rating',
    },
    {
        title: 'По имени',
        direction: 'asc',
        description: 'По имени от "А" до "Я"',
        value: 'title',
    },
    {
        title: 'По имени',
        direction: 'desc',
        description: 'По имени от "Я" до "А"',
        value: 'title',
    },
    {
        title: 'По автору',
        direction: 'asc',
        description: 'По автору от "А" до "Я"',
        value: 'authors',
    },
    {
        title: 'По автору',
        direction: 'desc',
        description: 'По автору от "Я" до "А"',
        value: 'authors',
    },
];

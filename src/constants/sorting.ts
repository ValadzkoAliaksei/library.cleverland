export type Sorting = {
    title: string;
    direction: string;
    description: string;
};

export const SORTING: Sorting[] = [
    {
        title: 'По рейтингу',
        direction: 'asc',
        description: 'По возрастанию рейтинга',
    },
    {
        title: 'По рейтингу',
        direction: 'desc',
        description: 'По снижению рейтинга',
    },
    {
        title: 'По имени',
        direction: 'asc',
        description: 'По имени от "А" до "Я"',
    },
    {
        title: 'По имени',
        direction: 'desc',
        description: 'По имени от "Я" до "А"',
    },
    {
        title: 'По автору',
        direction: 'asc',
        description: 'По автору от "А" до "Я"',
    },
    {
        title: 'По автору',
        direction: 'desc',
        description: 'По автору от "Я" до "А"',
    },
];

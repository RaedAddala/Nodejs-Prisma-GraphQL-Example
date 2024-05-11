export type Cv = {
    id: string;
    name: string;
    age: number;
    job: string;
    userId: string;
};

export type AddCvInput = Omit<Cv, 'id' | 'userId'> & {
    user: string;
    skills: string[];
};

export type UpdateCvInput = Partial<AddCvInput> & {
    id: string;
};

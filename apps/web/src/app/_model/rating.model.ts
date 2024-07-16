import { TMovie } from "./movie.model";
import { IUser } from "./user.model";

export type TComment = {
    id: number;
    userId:number;
    movieId:number;
    comment: string;
    rate: number;
    movie?: TMovie;
    user?: IUser
};
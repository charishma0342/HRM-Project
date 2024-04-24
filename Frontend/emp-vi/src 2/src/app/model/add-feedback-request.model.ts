export class AddFeedbackRequest{
    userId : number;
    option : string;
    comments : string;

    constructor(userId, option, comments){
        this.userId = userId;
        this.option = option;
        this.comments = comments;
    }
}
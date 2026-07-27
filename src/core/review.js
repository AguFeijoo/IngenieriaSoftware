function addReview(name, rating, comment){

    if(name == "" || rating == "0"){
        return null;
    }

    let review = {
        name: name,
        rating: rating,
        comment: comment
    };

    return review;
}